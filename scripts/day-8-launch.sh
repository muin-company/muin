#!/usr/bin/env bash
#
# 🚀 Day 8 Launch Automation Script
# 
# Purpose: Automate blog publishing workflow for Day 8 launch
# Usage:   ./day-8-launch.sh [morning|evening|both]
# Author:  MJ (COO)
# Date:    2026-02-08

set -euo pipefail

# Configuration
REPO_DIR="$HOME/muin"
DRAFTS_DIR="content/drafts"
POSTS_DIR="content/posts"
DEPLOY_TIMEOUT=180  # 3 minutes max wait for deployment
CHECK_INTERVAL=10   # Check every 10 seconds

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $*"
}

success() {
    echo -e "${GREEN}[✓]${NC} $*"
}

error() {
    echo -e "${RED}[✗]${NC} $*" >&2
}

warning() {
    echo -e "${YELLOW}[!]${NC} $*"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if [[ ! -d "$REPO_DIR" ]]; then
        error "Repository not found at $REPO_DIR"
        exit 1
    fi
    
    cd "$REPO_DIR" || exit 1
    
    if ! command -v gh &> /dev/null; then
        error "GitHub CLI (gh) not installed. Install: brew install gh"
        exit 1
    fi
    
    if ! command -v hugo &> /dev/null; then
        error "Hugo not installed. Install: brew install hugo"
        exit 1
    fi
    
    # Check git status
    if [[ -n $(git status --porcelain) ]]; then
        warning "Working directory has uncommitted changes"
        git status --short
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    success "Prerequisites OK"
}

# Fix dates in Trust vs Control posts
fix_dates() {
    log "Fixing dates in Trust vs Control posts..."
    
    local ko_file="$DRAFTS_DIR/day-8-trust-vs-control.ko.md"
    local en_file="$DRAFTS_DIR/day-8-trust-vs-control.en.md"
    
    if [[ -f "$ko_file" ]]; then
        sed -i '' 's/date: 2026-02-08T09:00:00+09:00/date: 2026-02-09T09:00:00+09:00/' "$ko_file"
        success "Fixed Korean version date"
    fi
    
    if [[ -f "$en_file" ]]; then
        sed -i '' 's/date: 2026-02-08T09:00:00+09:00/date: 2026-02-09T09:00:00+09:00/' "$en_file"
        success "Fixed English version date"
    fi
    
    # Verify fix
    log "Verifying dates..."
    grep "^date:" "$DRAFTS_DIR"/day-8-trust-vs-control.*.md || true
    
    # Commit fix
    git add "$DRAFTS_DIR"/day-8-trust-vs-control.*.md
    git commit -m "🔧 Fix date: Trust vs Control posts (2026-02-09)" || true
    git push origin main
    
    success "Date fix complete"
}

# Test Hugo build
test_build() {
    log "Testing Hugo build..."
    
    if hugo --gc --minify --quiet 2>&1 | grep -q "ERROR"; then
        error "Hugo build failed"
        hugo --gc --minify
        exit 1
    fi
    
    success "Hugo build OK"
}

# Publish morning post (Trust vs Control)
publish_morning() {
    log "Publishing morning post: Trust vs Control"
    
    local ko_draft="$DRAFTS_DIR/day-8-trust-vs-control.ko.md"
    local en_draft="$DRAFTS_DIR/day-8-trust-vs-control.en.md"
    
    if [[ ! -f "$ko_draft" ]] || [[ ! -f "$en_draft" ]]; then
        error "Morning post drafts not found"
        exit 1
    fi
    
    # Move from drafts to posts
    mv "$ko_draft" "$POSTS_DIR/"
    mv "$en_draft" "$POSTS_DIR/"
    
    success "Moved posts from drafts to posts"
    
    # Commit and push
    git add "$POSTS_DIR"/ "$DRAFTS_DIR"/
    git commit -m "🚀 Day 8 Morning: Trust vs Control (Philosophy Post)"
    git push origin main
    
    success "Pushed to GitHub"
}

# Publish evening post (Preparations Complete)
publish_evening() {
    log "Publishing evening post: Preparations Complete"
    
    local ko_draft="$DRAFTS_DIR/day-8-preparations-complete.ko.md"
    local en_draft="$DRAFTS_DIR/day-8-preparations-complete.en.md"
    
    if [[ ! -f "$ko_draft" ]] || [[ ! -f "$en_draft" ]]; then
        error "Evening post drafts not found"
        exit 1
    fi
    
    # Move from drafts to posts
    mv "$ko_draft" "$POSTS_DIR/"
    mv "$en_draft" "$POSTS_DIR/"
    
    success "Moved posts from drafts to posts"
    
    # Commit and push
    git add "$POSTS_DIR"/ "$DRAFTS_DIR"/
    git commit -m "🚀 Day 8 Evening: Preparations Complete (Launch Announcement!)"
    git push origin main
    
    success "Pushed to GitHub"
}

# Wait for GitHub Actions deployment
wait_for_deployment() {
    log "Waiting for GitHub Actions deployment..."
    
    local elapsed=0
    local run_id=""
    
    # Wait a moment for the run to start
    sleep 5
    
    while [[ $elapsed -lt $DEPLOY_TIMEOUT ]]; do
        # Get latest workflow run
        run_id=$(gh run list --workflow=hugo.yml --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null || echo "")
        
        if [[ -n "$run_id" ]]; then
            status=$(gh run view "$run_id" --json status --jq '.status')
            conclusion=$(gh run view "$run_id" --json conclusion --jq '.conclusion' 2>/dev/null || echo "")
            
            if [[ "$status" == "completed" ]]; then
                if [[ "$conclusion" == "success" ]]; then
                    success "Deployment successful!"
                    return 0
                else
                    error "Deployment failed with conclusion: $conclusion"
                    gh run view "$run_id"
                    return 1
                fi
            fi
            
            log "Deployment in progress... ($elapsed/${DEPLOY_TIMEOUT}s)"
        fi
        
        sleep $CHECK_INTERVAL
        elapsed=$((elapsed + CHECK_INTERVAL))
    done
    
    error "Deployment timeout after ${DEPLOY_TIMEOUT}s"
    return 1
}

# Verify URLs are accessible
verify_urls() {
    local post_slug="$1"
    
    log "Verifying blog URLs..."
    
    local ko_url="https://muin.company/ko/posts/${post_slug}/"
    local en_url="https://muin.company/en/posts/${post_slug}/"
    
    # Wait a moment for CDN to update
    sleep 10
    
    # Check Korean version
    if curl -s -f -o /dev/null -w "%{http_code}" "$ko_url" | grep -q "200"; then
        success "Korean post accessible: $ko_url"
    else
        warning "Korean post may not be accessible yet: $ko_url"
    fi
    
    # Check English version
    if curl -s -f -o /dev/null -w "%{http_code}" "$en_url" | grep -q "200"; then
        success "English post accessible: $en_url"
    else
        warning "English post may not be accessible yet: $en_url"
    fi
}

# Generate deployment report
generate_report() {
    local phase="$1"
    local post_slug="$2"
    
    log "Generating deployment report..."
    
    cat > "$REPO_DIR/deploy-report-${phase}.txt" <<EOF
🚀 Day 8 Launch Report - ${phase^}
Generated: $(date)

Phase: ${phase^} Post
Slug: ${post_slug}

URLs:
- KO: https://muin.company/ko/posts/${post_slug}/
- EN: https://muin.company/en/posts/${post_slug}/

Git Status:
$(git log -1 --oneline)

Deployment Status:
$(gh run list --workflow=hugo.yml --limit 1)

Next Steps:
$(if [[ "$phase" == "morning" ]]; then
    echo "1. Post Twitter Thread 1 (Trust vs Control)"
    echo "2. Monitor engagement"
    echo "3. Prepare for evening launch at 21:00 KST"
else
    echo "1. Post Twitter Thread 2 (Preparations Complete)"
    echo "2. Pin thread to profile"
    echo "3. Engage with all comments"
    echo "4. Celebrate! 🎉"
fi)

EOF
    
    cat "$REPO_DIR/deploy-report-${phase}.txt"
    success "Report saved to deploy-report-${phase}.txt"
}

# Main execution
main() {
    local action="${1:-}"
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🚀 Day 8 Launch Automation"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if [[ -z "$action" ]]; then
        echo "Usage: $0 [morning|evening|both|fix-dates]"
        echo ""
        echo "Commands:"
        echo "  morning     - Publish morning post (Trust vs Control)"
        echo "  evening     - Publish evening post (Preparations Complete)"
        echo "  both        - Publish both (for testing only!)"
        echo "  fix-dates   - Fix dates in Trust vs Control posts"
        echo ""
        exit 1
    fi
    
    check_prerequisites
    
    case "$action" in
        fix-dates)
            fix_dates
            ;;
        morning)
            test_build
            fix_dates
            publish_morning
            wait_for_deployment
            verify_urls "trust-vs-control"
            generate_report "morning" "trust-vs-control"
            
            echo ""
            success "🎉 Morning launch complete!"
            echo ""
            echo "Next steps:"
            echo "1. Verify blog posts at:"
            echo "   - https://muin.company/ko/posts/trust-vs-control/"
            echo "   - https://muin.company/en/posts/trust-vs-control/"
            echo "2. Post Twitter Thread 1 from ~/muin/marketing/twitter-day-8-threads.md"
            echo "3. Monitor engagement"
            echo ""
            ;;
        evening)
            test_build
            publish_evening
            wait_for_deployment
            verify_urls "day-8-preparations-complete"
            generate_report "evening" "day-8-preparations-complete"
            
            echo ""
            success "🎉 Evening launch complete!"
            echo ""
            echo "Next steps:"
            echo "1. Verify blog posts at:"
            echo "   - https://muin.company/ko/posts/day-8-preparations-complete/"
            echo "   - https://muin.company/en/posts/day-8-preparations-complete/"
            echo "2. Post Twitter Thread 2 from ~/muin/marketing/twitter-day-8-threads.md"
            echo "3. Pin thread to profile"
            echo "4. Celebrate! 🎉"
            echo ""
            ;;
        both)
            warning "Publishing both posts - only use for testing!"
            read -p "Are you sure? (y/N) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
            
            test_build
            fix_dates
            publish_morning
            publish_evening
            wait_for_deployment
            verify_urls "trust-vs-control"
            verify_urls "day-8-preparations-complete"
            
            success "Both posts published"
            ;;
        *)
            error "Unknown action: $action"
            exit 1
            ;;
    esac
}

main "$@"
