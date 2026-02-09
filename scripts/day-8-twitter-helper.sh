#!/usr/bin/env bash
#
# 🐦 Day 8 Twitter Thread Helper
# 
# Purpose: Prepare, verify, and format Twitter threads for posting
# Usage:   ./day-8-twitter-helper.sh [morning|evening|both|verify]
# Author:  MJ (COO)
# Date:    2026-02-08

set -euo pipefail

# Configuration
REPO_DIR="$HOME/muin"
TWITTER_FILE="$REPO_DIR/marketing/twitter-day-8-threads.md"
OUTPUT_DIR="$REPO_DIR/.twitter-output"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Logging
log() {
    echo -e "${BLUE}[INFO]${NC} $*"
}

success() {
    echo -e "${GREEN}[✓]${NC} $*"
}

error() {
    echo -e "${RED}[✗]${NC} $*"
}

warning() {
    echo -e "${YELLOW}[!]${NC} $*"
}

info() {
    echo -e "${CYAN}[i]${NC} $*"
}

# Extract thread from markdown file
extract_thread() {
    local thread_num="$1"
    local start_marker="$2"
    local end_marker="$3"
    
    awk "/$start_marker/,/$end_marker/" "$TWITTER_FILE" | \
        grep -A 100 '```' | \
        grep -B 100 '```' | \
        grep -v '```' | \
        sed '/^$/d' | \
        sed 's/^[[:space:]]*//'
}

# Count characters in a tweet
count_chars() {
    local text="$1"
    # Twitter counts some characters differently (URLs, etc.)
    # This is a simplified count
    echo -n "$text" | wc -m | tr -d ' '
}

# Verify tweet length
verify_tweet() {
    local tweet="$1"
    local tweet_num="$2"
    local max_length=280
    
    local char_count
    char_count=$(count_chars "$tweet")
    
    if [[ $char_count -le $max_length ]]; then
        success "Tweet $tweet_num: ${char_count}/${max_length} chars"
        return 0
    else
        error "Tweet $tweet_num: ${char_count}/${max_length} chars (OVER LIMIT!)"
        return 1
    fi
}

# Extract and verify morning thread
prepare_morning_thread() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌅 Morning Thread: Trust vs Control"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    mkdir -p "$OUTPUT_DIR"
    
    local thread_file="$OUTPUT_DIR/morning-thread.txt"
    local clipboard_file="$OUTPUT_DIR/morning-clipboard.txt"
    
    log "Extracting morning thread..."
    
    # Extract tweets using section markers
    local tweets=()
    local in_thread=false
    local current_tweet=""
    local tweet_count=0
    
    while IFS= read -r line; do
        # Detect thread start
        if [[ "$line" =~ "Thread 1: \"Trust vs Control\"" ]]; then
            in_thread=true
            continue
        fi
        
        # Detect thread end
        if [[ "$line" =~ "Thread 2:" ]]; then
            in_thread=false
        fi
        
        # Extract tweet content
        if [[ "$in_thread" == true ]]; then
            if [[ "$line" =~ ^###\ Tweet\ [0-9]+/[0-9]+ ]]; then
                # Save previous tweet if exists
                if [[ -n "$current_tweet" ]]; then
                    tweets+=("$current_tweet")
                fi
                current_tweet=""
                ((tweet_count++))
            elif [[ "$line" == '```' ]]; then
                if [[ -n "$current_tweet" ]]; then
                    # End of tweet
                    tweets+=("$current_tweet")
                    current_tweet=""
                fi
                # Skip the marker
                continue
            elif [[ -n "$line" ]] && [[ "$line" != "###"* ]]; then
                if [[ "$current_tweet" == "" ]]; then
                    current_tweet="$line"
                else
                    current_tweet="$current_tweet"$'\n'"$line"
                fi
            fi
        fi
    done < "$TWITTER_FILE"
    
    # Write to file
    {
        echo "🌅 MORNING THREAD: Trust vs Control"
        echo "Publish: 09:00 KST | Total: ${#tweets[@]} tweets"
        echo "Blog: https://muin.company/blog/trust-vs-control"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        for i in "${!tweets[@]}"; do
            local num=$((i + 1))
            echo "━━━ TWEET $num/${#tweets[@]} ━━━"
            echo ""
            echo "${tweets[$i]}"
            echo ""
            
            # Character count
            local chars
            chars=$(count_chars "${tweets[$i]}")
            echo "[Character count: ${chars}/280]"
            echo ""
        done
    } > "$thread_file"
    
    # Create clipboard-ready version (just the tweets)
    {
        for i in "${!tweets[@]}"; do
            local num=$((i + 1))
            echo "=== TWEET $num/${#tweets[@]} ==="
            echo "${tweets[$i]}"
            echo ""
        done
    } > "$clipboard_file"
    
    # Verify all tweets
    echo ""
    log "Verifying character counts..."
    local all_ok=true
    
    for i in "${!tweets[@]}"; do
        local num=$((i + 1))
        if ! verify_tweet "${tweets[$i]}" "$num"; then
            all_ok=false
        fi
    done
    
    echo ""
    if [[ "$all_ok" == true ]]; then
        success "All tweets verified!"
    else
        error "Some tweets exceed character limit!"
    fi
    
    echo ""
    info "Full thread saved to: $thread_file"
    info "Clipboard version: $clipboard_file"
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 READY TO POST"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Open: cat $clipboard_file"
    echo "2. Copy each tweet and post sequentially"
    echo "3. Wait 30-60s between tweets"
    echo "4. Use Twitter's thread feature (reply to previous)"
    echo ""
}

# Extract and verify evening thread
prepare_evening_thread() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌙 Evening Thread: Preparations Complete"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    mkdir -p "$OUTPUT_DIR"
    
    local thread_file="$OUTPUT_DIR/evening-thread.txt"
    local clipboard_file="$OUTPUT_DIR/evening-clipboard.txt"
    
    log "Extracting evening thread..."
    
    # Extract tweets using section markers
    local tweets=()
    local in_thread=false
    local current_tweet=""
    
    while IFS= read -r line; do
        # Detect thread start
        if [[ "$line" =~ "Thread 2: \"Preparations Complete\"" ]]; then
            in_thread=true
            continue
        fi
        
        # Detect thread end (next section)
        if [[ "$line" =~ "^##".*"Pre-Publishing Checklist" ]]; then
            in_thread=false
        fi
        
        # Extract tweet content
        if [[ "$in_thread" == true ]]; then
            if [[ "$line" =~ ^###\ Tweet\ [0-9]+/[0-9]+ ]]; then
                # Save previous tweet if exists
                if [[ -n "$current_tweet" ]]; then
                    tweets+=("$current_tweet")
                fi
                current_tweet=""
            elif [[ "$line" == '```' ]]; then
                if [[ -n "$current_tweet" ]]; then
                    # End of tweet
                    tweets+=("$current_tweet")
                    current_tweet=""
                fi
                continue
            elif [[ -n "$line" ]] && [[ "$line" != "###"* ]]; then
                if [[ "$current_tweet" == "" ]]; then
                    current_tweet="$line"
                else
                    current_tweet="$current_tweet"$'\n'"$line"
                fi
            fi
        fi
    done < "$TWITTER_FILE"
    
    # Write to file
    {
        echo "🌙 EVENING THREAD: Preparations Complete"
        echo "Publish: 21:00 KST | Total: ${#tweets[@]} tweets"
        echo "Blog: https://muin.company/blog/preparations-complete"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        for i in "${!tweets[@]}"; do
            local num=$((i + 1))
            echo "━━━ TWEET $num/${#tweets[@]} ━━━"
            echo ""
            echo "${tweets[$i]}"
            echo ""
            
            # Character count
            local chars
            chars=$(count_chars "${tweets[$i]}")
            echo "[Character count: ${chars}/280]"
            echo ""
        done
    } > "$thread_file"
    
    # Create clipboard-ready version
    {
        for i in "${!tweets[@]}"; do
            local num=$((i + 1))
            echo "=== TWEET $num/${#tweets[@]} ==="
            echo "${tweets[$i]}"
            echo ""
        done
    } > "$clipboard_file"
    
    # Verify all tweets
    echo ""
    log "Verifying character counts..."
    local all_ok=true
    
    for i in "${!tweets[@]}"; do
        local num=$((i + 1))
        if ! verify_tweet "${tweets[$i]}" "$num"; then
            all_ok=false
        fi
    done
    
    echo ""
    if [[ "$all_ok" == true ]]; then
        success "All tweets verified!"
    else
        error "Some tweets exceed character limit!"
    fi
    
    echo ""
    info "Full thread saved to: $thread_file"
    info "Clipboard version: $clipboard_file"
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 READY TO POST"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Open: cat $clipboard_file"
    echo "2. Copy each tweet and post sequentially"
    echo "3. Wait 30-60s between tweets"
    echo "4. Pin this thread to profile after posting!"
    echo ""
}

# Verify all threads
verify_all() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔍 Verifying All Threads"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if [[ ! -f "$TWITTER_FILE" ]]; then
        error "Twitter threads file not found: $TWITTER_FILE"
        exit 1
    fi
    
    log "Checking file: $TWITTER_FILE"
    success "File found"
    
    echo ""
    log "Checking for required sections..."
    
    # Check Thread 1
    if grep -q "Thread 1: \"Trust vs Control\"" "$TWITTER_FILE"; then
        success "Thread 1 section found"
    else
        error "Thread 1 section not found"
    fi
    
    # Check Thread 2
    if grep -q "Thread 2: \"Preparations Complete\"" "$TWITTER_FILE"; then
        success "Thread 2 section found"
    else
        error "Thread 2 section not found"
    fi
    
    echo ""
    log "Checking for required links..."
    
    # Check for blog links
    if grep -q "https://muin.company/blog/trust-vs-control" "$TWITTER_FILE"; then
        success "Trust vs Control blog link found"
    else
        warning "Trust vs Control blog link not found"
    fi
    
    if grep -q "https://muin.company/blog/preparations-complete" "$TWITTER_FILE"; then
        success "Preparations Complete blog link found"
    else
        warning "Preparations Complete blog link not found"
    fi
    
    # Check for product links
    if grep -q "https://gumsi-ai.vercel.app" "$TWITTER_FILE"; then
        success "GumsAI link found"
    else
        warning "GumsAI link not found"
    fi
    
    if grep -q "https://github.com/muin-company/todobot" "$TWITTER_FILE"; then
        success "TodoBot link found"
    else
        warning "TodoBot link not found"
    fi
    
    echo ""
    log "Counting tweets..."
    
    local thread1_count
    local thread2_count
    
    thread1_count=$(grep -c "### Tweet [0-9]/7" "$TWITTER_FILE" || echo "0")
    thread2_count=$(grep -c "### Tweet [0-9]/8" "$TWITTER_FILE" || echo "0")
    
    info "Thread 1: $thread1_count tweets (expected: 7)"
    info "Thread 2: $thread2_count tweets (expected: 8)"
    
    echo ""
    success "Verification complete!"
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Next: Run './day-8-twitter-helper.sh morning' or 'evening' to prepare threads"
}

# Show posting guide
show_guide() {
    cat <<'EOF'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 TWITTER POSTING GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌅 MORNING (09:00 KST)
1. Verify blog post is live: https://muin.company/blog/trust-vs-control
2. Run: ./day-8-twitter-helper.sh morning
3. Open: cat ~/.twitter-output/morning-clipboard.txt
4. Post each tweet sequentially:
   - Copy tweet text
   - Paste into Twitter
   - Click "Post" for first tweet
   - Click "Reply" for subsequent tweets (creates thread)
   - Wait 30-60 seconds between tweets
5. Monitor engagement for first 30 minutes

🌙 EVENING (21:00 KST)
1. Verify blog post is live: https://muin.company/blog/preparations-complete
2. Run: ./day-8-twitter-helper.sh evening
3. Open: cat ~/.twitter-output/evening-clipboard.txt
4. Post each tweet sequentially (same process as morning)
5. After posting: PIN THIS THREAD TO PROFILE
6. Engage with every comment in first hour

💡 TIPS
- Keep Twitter open in separate window
- Have clipboard ready for copy-paste
- Set timer for 60-second intervals
- Prepare responses for common questions
- Have product links ready to share
- Screenshot high-performing tweets

⚠️  IMPORTANT
- Double-check all links work before posting
- Verify @muin_company account is correct
- Use hashtags exactly as written
- Don't skip the CTA in final tweet
- Respond to first comment within 5 minutes

Good luck! 🚀

EOF
}

# Main execution
main() {
    local action="${1:-}"
    
    if [[ -z "$action" ]]; then
        echo "🐦 Day 8 Twitter Thread Helper"
        echo ""
        echo "Usage: $0 [morning|evening|both|verify|guide]"
        echo ""
        echo "Commands:"
        echo "  morning   - Prepare morning thread (Trust vs Control)"
        echo "  evening   - Prepare evening thread (Preparations Complete)"
        echo "  both      - Prepare both threads"
        echo "  verify    - Verify all threads and links"
        echo "  guide     - Show posting guide"
        echo ""
        exit 1
    fi
    
    case "$action" in
        morning)
            prepare_morning_thread
            ;;
        evening)
            prepare_evening_thread
            ;;
        both)
            prepare_morning_thread
            echo ""
            echo ""
            prepare_evening_thread
            ;;
        verify)
            verify_all
            ;;
        guide)
            show_guide
            ;;
        *)
            error "Unknown action: $action"
            exit 1
            ;;
    esac
}

main "$@"
