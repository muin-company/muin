#!/bin/bash
# YouTube Batch Upload Script
# Uses metadata JSON files to upload videos with full metadata

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VIDEO_DIR="/Users/mj/muin/youtube/videos"
METADATA_DIR="/Users/mj/muin/youtube/metadata"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is not installed${NC}"
    echo "Install with: brew install jq"
    exit 1
fi

# Function to print metadata summary
print_metadata() {
    local metadata_file=$1
    
    echo -e "${GREEN}=== Metadata Summary ===${NC}"
    echo "Title: $(jq -r '.title.primary' "$metadata_file")"
    echo "Category: $(jq -r '.category_name' "$metadata_file")"
    echo "Tags: $(jq -r '.tags | length' "$metadata_file") tags"
    echo "Language: $(jq -r '.language' "$metadata_file")"
    echo "Playlists: $(jq -r '.playlist_suggestions | join(", ")' "$metadata_file")"
    echo ""
}

# Function to generate YouTube Studio upload checklist
generate_checklist() {
    local video_id=$1
    local metadata_file=$2
    
    cat > "${METADATA_DIR}/${video_id}-upload-checklist.md" <<EOF
# Upload Checklist: ${video_id}

## Video File
- [ ] Video: ${VIDEO_DIR}/${video_id}.mp4
- [ ] Thumbnail: ${VIDEO_DIR}/${video_id}-thumbnail.png

## Basic Info
- [ ] Title: \`$(jq -r '.title.primary' "$metadata_file")\`
- [ ] Description: (Copy from metadata JSON - Korean version)
- [ ] Thumbnail: Upload custom thumbnail

## Details
- [ ] Category: Science & Technology
- [ ] Language: Korean
- [ ] Tags: (Copy all $(jq -r '.tags | length' "$metadata_file") tags from JSON)

## Playlists
$(jq -r '.playlist_suggestions[] | "- [ ] Add to: \(.)"' "$metadata_file")

## End Screen (Last 5-20 seconds)
$(jq -r '.endScreen.recommendations[] | "- [ ] \(.position): \(.type)"' "$metadata_file")

## Cards
$(jq -r '.cards[] | "- [ ] \(.teaser_start_ms / 1000)s: \(.message) → \(.url)"' "$metadata_file")

## Post-Upload
- [ ] Set visibility to Public
- [ ] Pin comment: (Copy from metadata JSON)
- [ ] Share on social media
- [ ] Add to "Developer Productivity Tools" playlist
- [ ] Cross-check end screen links

## Description Template

\`\`\`
$(jq -r '.description.korean' "$metadata_file")
\`\`\`

## Tags (comma-separated)

\`\`\`
$(jq -r '.tags | join(", ")' "$metadata_file")
\`\`\`

## Pinned Comment

\`\`\`
$(jq -r '.pinned_comment.korean' "$metadata_file")
\`\`\`

---
Generated: $(date)
EOF
    
    echo -e "${GREEN}✓ Checklist generated: ${video_id}-upload-checklist.md${NC}"
}

# Main upload function
upload_video() {
    local video_id=$1
    local metadata_file="${METADATA_DIR}/${video_id}-metadata.json"
    local video_file="${VIDEO_DIR}/${video_id}.mp4"
    
    if [ ! -f "$metadata_file" ]; then
        echo -e "${RED}Error: Metadata file not found: ${metadata_file}${NC}"
        return 1
    fi
    
    if [ ! -f "$video_file" ]; then
        echo -e "${RED}Error: Video file not found: ${video_file}${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Processing: ${video_id}${NC}"
    print_metadata "$metadata_file"
    generate_checklist "$video_id" "$metadata_file"
    
    # Check if youtube-upload is available
    if command -v youtube-upload &> /dev/null; then
        echo -e "${YELLOW}youtube-upload detected. Upload? (y/n)${NC}"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            youtube-upload \
                --title="$(jq -r '.title.primary' "$metadata_file")" \
                --description="$(jq -r '.description.korean' "$metadata_file")" \
                --category="$(jq -r '.category' "$metadata_file")" \
                --tags="$(jq -r '.tags | join(",")' "$metadata_file")" \
                --default-language="$(jq -r '.language' "$metadata_file")" \
                --privacy="$(jq -r '.visibility' "$metadata_file")" \
                "$video_file"
            
            echo -e "${GREEN}✓ Upload complete!${NC}"
            echo -e "${YELLOW}Don't forget to:${NC}"
            echo "  - Add end screens"
            echo "  - Add cards"
            echo "  - Pin comment"
            echo "  - Add to playlists"
        fi
    else
        echo -e "${YELLOW}youtube-upload not installed. Manual upload required.${NC}"
        echo "Use the generated checklist: ${video_id}-upload-checklist.md"
    fi
    
    echo ""
}

# Main script
echo -e "${GREEN}YouTube Batch Upload Tool${NC}"
echo ""

if [ $# -eq 0 ]; then
    echo "Usage: $0 [video-id] [video-id] ..."
    echo ""
    echo "Available videos:"
    for metadata in "$METADATA_DIR"/*-metadata.json; do
        if [ -f "$metadata" ]; then
            video_id=$(basename "$metadata" -metadata.json)
            echo "  - $video_id"
        fi
    done
    echo ""
    echo "Examples:"
    echo "  $0 curl-to-code-v1"
    echo "  $0 json-to-types-v1"
    echo "  $0 curl-to-code-v1 json-to-types-v1"
    exit 0
fi

# Process each video
for video_id in "$@"; do
    upload_video "$video_id"
done

echo -e "${GREEN}All done!${NC}"
