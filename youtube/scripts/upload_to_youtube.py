#!/usr/bin/env python3
"""
YouTube Video Upload Script
Uploads videos to YouTube with metadata from JSON files

Prerequisites:
1. Install dependencies:
   pip3 install --upgrade google-api-python-client google-auth-oauthlib google-auth-httplib2

2. Set up OAuth credentials:
   - Create project in Google Cloud Console
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials (Desktop app)
   - Download and save as ~/muin/youtube/client_secret.json

3. Run:
   python3 upload_to_youtube.py json-to-types-v1
   python3 upload_to_youtube.py curl-to-code-v1
"""

import os
import sys
import json
import argparse
from pathlib import Path

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload
except ImportError:
    print("ERROR: Required packages not installed")
    print("Run: pip3 install --upgrade google-api-python-client google-auth-oauthlib google-auth-httplib2")
    sys.exit(1)

# OAuth 2.0 scopes
SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

# Base directory
BASE_DIR = Path.home() / 'muin' / 'youtube'
VIDEOS_DIR = BASE_DIR / 'videos'
METADATA_DIR = BASE_DIR / 'metadata'
CLIENT_SECRET_FILE = BASE_DIR / 'client_secret.json'
TOKEN_FILE = BASE_DIR / 'token.json'


def get_authenticated_service():
    """Authenticate and return YouTube API service"""
    creds = None
    
    # Check if token file exists
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    
    # If no valid credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CLIENT_SECRET_FILE.exists():
                print(f"ERROR: Client secret file not found: {CLIENT_SECRET_FILE}")
                print("Please download OAuth credentials from Google Cloud Console")
                sys.exit(1)
            
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CLIENT_SECRET_FILE), SCOPES
            )
            creds = flow.run_local_server(port=0)
        
        # Save credentials for next run
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
    
    return build('youtube', 'v3', credentials=creds)


def load_metadata(video_id):
    """Load metadata from JSON file"""
    metadata_file = METADATA_DIR / f'{video_id}-metadata.json'
    
    if not metadata_file.exists():
        print(f"ERROR: Metadata file not found: {metadata_file}")
        sys.exit(1)
    
    with open(metadata_file, 'r', encoding='utf-8') as f:
        return json.load(f)


def upload_video(youtube, video_id, metadata):
    """Upload video to YouTube"""
    
    # Video file path
    video_file = VIDEOS_DIR / f'{video_id}.mp4'
    if not video_file.exists():
        print(f"ERROR: Video file not found: {video_file}")
        sys.exit(1)
    
    # Prepare request body
    # Use Korean description (primary language)
    description = metadata['description'].get('korean', metadata['description'].get('english', ''))
    
    body = {
        'snippet': {
            'title': metadata['title']['primary'],
            'description': description,
            'tags': metadata['tags'][:15],  # YouTube allows max 15 tags
            'categoryId': metadata['category'],
            'defaultLanguage': metadata['language'],
            'defaultAudioLanguage': metadata['language']
        },
        'status': {
            'privacyStatus': metadata['visibility'],
            'embeddable': metadata['embeddable'],
            'publicStatsViewable': metadata['publicStatsViewable'],
            'madeForKids': metadata['madeForKids'],
            'selfDeclaredMadeForKids': metadata['madeForKids']
        }
    }
    
    # Media file upload
    media = MediaFileUpload(
        str(video_file),
        chunksize=-1,  # Upload in single request
        resumable=True,
        mimetype='video/mp4'
    )
    
    print(f"\nUploading: {video_file.name}")
    print(f"Title: {metadata['title']['primary']}")
    print(f"Size: {video_file.stat().st_size / 1024:.1f} KB")
    
    try:
        # Execute upload
        request = youtube.videos().insert(
            part='snippet,status',
            body=body,
            media_body=media
        )
        
        response = None
        while response is None:
            status, response = request.next_chunk()
            if status:
                progress = int(status.progress() * 100)
                print(f"Upload progress: {progress}%")
        
        video_url = f"https://youtube.com/watch?v={response['id']}"
        print(f"\n✅ Upload successful!")
        print(f"Video ID: {response['id']}")
        print(f"URL: {video_url}")
        
        # Upload thumbnail if exists
        thumbnail_file = VIDEOS_DIR / metadata.get('thumbnail', f'{video_id}-thumbnail.png')
        if thumbnail_file.exists():
            upload_thumbnail(youtube, response['id'], thumbnail_file)
        
        return response
    
    except HttpError as e:
        print(f"ERROR: Upload failed - {e}")
        sys.exit(1)


def upload_thumbnail(youtube, video_id, thumbnail_file):
    """Upload custom thumbnail"""
    print(f"\nUploading thumbnail: {thumbnail_file.name}")
    
    try:
        youtube.thumbnails().set(
            videoId=video_id,
            media_body=MediaFileUpload(str(thumbnail_file))
        ).execute()
        print("✅ Thumbnail uploaded successfully")
    except HttpError as e:
        print(f"WARNING: Thumbnail upload failed - {e}")


def main():
    parser = argparse.ArgumentParser(description='Upload video to YouTube')
    parser.add_argument('video_id', help='Video ID (e.g., json-to-types-v1)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be uploaded without uploading')
    
    args = parser.parse_args()
    
    # Load metadata
    metadata = load_metadata(args.video_id)
    
    if args.dry_run:
        print("\n=== DRY RUN MODE ===")
        print(f"Video ID: {args.video_id}")
        print(f"Title: {metadata['title']['primary']}")
        print(f"Tags: {', '.join(metadata['tags'][:15])}")
        print(f"Category: {metadata['category_name']}")
        print(f"Visibility: {metadata['visibility']}")
        video_file = VIDEOS_DIR / f'{args.video_id}.mp4'
        print(f"File: {video_file} ({video_file.stat().st_size / 1024:.1f} KB)")
        return
    
    # Authenticate
    print("Authenticating with YouTube...")
    youtube = get_authenticated_service()
    
    # Upload video
    response = upload_video(youtube, args.video_id, metadata)
    
    # Save video URL to metadata
    video_url = f"https://youtube.com/watch?v={response['id']}"
    metadata['youtube_url'] = video_url
    metadata['youtube_id'] = response['id']
    
    metadata_file = METADATA_DIR / f'{args.video_id}-metadata.json'
    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ All done! Video URL: {video_url}")
    print("\nNext steps:")
    print("1. Add cards and end screens in YouTube Studio")
    print("2. Pin comment")
    print("3. Add to playlist")


if __name__ == '__main__':
    main()
