#!/usr/bin/env bash
#
# ⏮️  Day 8 Launch Rollback Script
# 
# Purpose: Quick rollback and backup restore for Day 8 launch
# Usage:   ./day-8-rollback.sh [morning|evening|both|status]
# Author:  MJ (COO)
# Date:    2026-02-08

set -euo pipefail

# Configuration
REPO_DIR="$HOME/muin"
BACKUP_DIR="$REPO_DIR/.launch-backups"
DRAFTS_DIR="content/drafts"
POSTS_DIR="content/posts"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Create backup before any operation
create_backup() {
    local backup_name="$1"
    
    log "Creating backup: $backup_name"
    
    mkdir -p "$BACKUP_DIR"
    
    local timestamp
    timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_path="$BACKUP_DIR/${backup_name}_${timestamp}"
    
    mkdir -p "$backup_path"
    
    cd "$REPO_DIR" || exit 1
    
    # Backup current state
    cp -r "$DRAFTS_DIR" "$backup_path/" 2>/dev/null || true
    cp -r "$POSTS_DIR" "$backup_path/" 2>/dev/null || true
    
    # Save git info
    git log -1 --oneline > "$backup_path/git-commit.txt"
    git status > "$backup_path/git-status.txt"
    git diff > "$backup_path/git-diff.txt" || true
    
    success "Backup created at $backup_path"
    echo "$backup_path"
}

# Show current status
show_status() {
    log "Current status of Day 8 posts..."
    
    cd "$REPO_DIR" || exit 1
    
    echo ""
    echo "=== Drafts ==="
    ls -lh "$DRAFTS_DIR"/day-8-* 2>/dev/null || echo "No Day 8 drafts found"
    
    echo ""
    echo "=== Published Posts ==="
    ls -lh "$POSTS_DIR"/day-8-* 2>/dev/null || echo "No Day 8 posts found"
    
    echo ""
    echo "=== Recent Commits ==="
    git log --oneline --grep="Day 8" --grep="day-8" --all-match -5 || git log --oneline -5
    
    echo ""
    echo "=== Backups Available ==="
    if [[ -d "$BACKUP_DIR" ]]; then
        ls -lht "$BACKUP_DIR" | head -10
    else
        echo "No backups found"
    fi
}

# Rollback morning post
rollback_morning() {
    warning "Rolling back morning post: Trust vs Control"
    
    cd "$REPO_DIR" || exit 1
    
    # Create backup before rollback
    create_backup "rollback-morning" >/dev/null
    
    # Move posts back to drafts
    if [[ -f "$POSTS_DIR/day-8-trust-vs-control.ko.md" ]]; then
        mv "$POSTS_DIR/day-8-trust-vs-control.ko.md" "$DRAFTS_DIR/"
        success "Moved Korean post back to drafts"
    fi
    
    if [[ -f "$POSTS_DIR/day-8-trust-vs-control.en.md" ]]; then
        mv "$POSTS_DIR/day-8-trust-vs-control.en.md" "$DRAFTS_DIR/"
        success "Moved English post back to drafts"
    fi
    
    # Commit rollback
    git add "$POSTS_DIR"/ "$DRAFTS_DIR"/
    git commit -m "⏮️  Rollback: Move Trust vs Control back to drafts"
    
    warning "Changes committed but NOT pushed yet"
    echo ""
    echo "Review changes with: git show"
    echo "Push rollback with: git push origin main"
    echo "Abort rollback with: git reset --hard HEAD~1"
}

# Rollback evening post
rollback_evening() {
    warning "Rolling back evening post: Preparations Complete"
    
    cd "$REPO_DIR" || exit 1
    
    # Create backup before rollback
    create_backup "rollback-evening" >/dev/null
    
    # Move posts back to drafts
    if [[ -f "$POSTS_DIR/day-8-preparations-complete.ko.md" ]]; then
        mv "$POSTS_DIR/day-8-preparations-complete.ko.md" "$DRAFTS_DIR/"
        success "Moved Korean post back to drafts"
    fi
    
    if [[ -f "$POSTS_DIR/day-8-preparations-complete.en.md" ]]; then
        mv "$POSTS_DIR/day-8-preparations-complete.en.md" "$DRAFTS_DIR/"
        success "Moved English post back to drafts"
    fi
    
    # Commit rollback
    git add "$POSTS_DIR"/ "$DRAFTS_DIR"/
    git commit -m "⏮️  Rollback: Move Preparations Complete back to drafts"
    
    warning "Changes committed but NOT pushed yet"
    echo ""
    echo "Review changes with: git show"
    echo "Push rollback with: git push origin main"
    echo "Abort rollback with: git reset --hard HEAD~1"
}

# Rollback both posts
rollback_both() {
    warning "Rolling back BOTH posts"
    
    read -p "Are you sure you want to rollback both posts? (yes/NO) " -r
    if [[ ! $REPLY == "yes" ]]; then
        log "Rollback cancelled"
        exit 0
    fi
    
    create_backup "rollback-both" >/dev/null
    
    cd "$REPO_DIR" || exit 1
    
    # Move all Day 8 posts back to drafts
    for post in "$POSTS_DIR"/day-8-*.md; do
        if [[ -f "$post" ]]; then
            local filename
            filename=$(basename "$post")
            mv "$post" "$DRAFTS_DIR/"
            success "Moved $filename back to drafts"
        fi
    done
    
    # Commit rollback
    git add "$POSTS_DIR"/ "$DRAFTS_DIR"/
    git commit -m "⏮️  Rollback: Move all Day 8 posts back to drafts"
    
    warning "Changes committed but NOT pushed yet"
    echo ""
    echo "Review changes with: git show"
    echo "Push rollback with: git push origin main"
    echo "Abort rollback with: git reset --hard HEAD~1"
}

# Git revert (safer than moving files)
git_revert() {
    local commits="${1:-1}"
    
    warning "Reverting last $commits commit(s)"
    
    cd "$REPO_DIR" || exit 1
    
    # Show what will be reverted
    echo ""
    log "Commits to revert:"
    git log --oneline -"$commits"
    
    echo ""
    read -p "Proceed with revert? (y/N) " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "Revert cancelled"
        exit 0
    fi
    
    # Create backup
    create_backup "git-revert" >/dev/null
    
    # Revert commits
    for ((i=1; i<=commits; i++)); do
        git revert --no-edit HEAD~$((i-1))
    done
    
    success "Reverted $commits commit(s)"
    warning "Changes committed but NOT pushed yet"
    echo ""
    echo "Push revert with: git push origin main"
    echo "Abort revert with: git reset --hard HEAD~$commits"
}

# Restore from backup
restore_backup() {
    log "Available backups:"
    
    if [[ ! -d "$BACKUP_DIR" ]] || [[ -z "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]]; then
        error "No backups found"
        exit 1
    fi
    
    echo ""
    local backups=()
    local i=1
    
    for backup in "$BACKUP_DIR"/*; do
        if [[ -d "$backup" ]]; then
            echo "$i) $(basename "$backup")"
            backups+=("$backup")
            ((i++))
        fi
    done
    
    echo ""
    read -p "Select backup to restore (1-$((i-1))): " choice
    
    if [[ ! "$choice" =~ ^[0-9]+$ ]] || [[ "$choice" -lt 1 ]] || [[ "$choice" -ge "$i" ]]; then
        error "Invalid choice"
        exit 1
    fi
    
    local selected_backup="${backups[$((choice-1))]}"
    
    warning "Restoring from: $(basename "$selected_backup")"
    
    # Show backup contents
    echo ""
    log "Backup contains:"
    ls -lh "$selected_backup"
    
    echo ""
    read -p "Proceed with restore? (y/N) " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "Restore cancelled"
        exit 0
    fi
    
    # Create backup of current state before restore
    create_backup "pre-restore" >/dev/null
    
    cd "$REPO_DIR" || exit 1
    
    # Restore files
    if [[ -d "$selected_backup/$DRAFTS_DIR" ]]; then
        rm -rf "$DRAFTS_DIR"/day-8-* || true
        cp -r "$selected_backup/$DRAFTS_DIR"/* "$DRAFTS_DIR/"
        success "Restored drafts"
    fi
    
    if [[ -d "$selected_backup/$POSTS_DIR" ]]; then
        rm -rf "$POSTS_DIR"/day-8-* || true
        cp -r "$selected_backup/$POSTS_DIR"/* "$POSTS_DIR/" 2>/dev/null || true
        success "Restored posts"
    fi
    
    # Show git info from backup
    if [[ -f "$selected_backup/git-commit.txt" ]]; then
        echo ""
        log "Backup was created from commit:"
        cat "$selected_backup/git-commit.txt"
    fi
    
    warning "Files restored but not committed yet"
    echo ""
    echo "Review changes with: git status"
    echo "Commit restore with: git add -A && git commit -m 'Restore from backup'"
}

# Emergency abort (reset to last good state)
emergency_abort() {
    error "EMERGENCY ABORT"
    
    cd "$REPO_DIR" || exit 1
    
    echo ""
    warning "This will reset to HEAD and discard all uncommitted changes"
    echo "Committed changes will remain (use git revert to undo commits)"
    echo ""
    
    read -p "Proceed with emergency abort? (type YES to confirm) " -r
    
    if [[ ! $REPLY == "YES" ]]; then
        log "Abort cancelled"
        exit 0
    fi
    
    # Create emergency backup
    create_backup "emergency-abort" >/dev/null
    
    # Reset to HEAD
    git reset --hard HEAD
    git clean -fd
    
    success "Reset to last commit"
    
    echo ""
    git status
}

# Main execution
main() {
    local action="${1:-}"
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "⏮️  Day 8 Launch Rollback"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if [[ -z "$action" ]]; then
        echo "Usage: $0 [morning|evening|both|status|revert|restore|abort]"
        echo ""
        echo "Commands:"
        echo "  morning     - Rollback morning post (move back to drafts)"
        echo "  evening     - Rollback evening post (move back to drafts)"
        echo "  both        - Rollback both posts"
        echo "  status      - Show current status"
        echo "  revert      - Git revert last commit(s)"
        echo "  restore     - Restore from backup"
        echo "  abort       - Emergency abort (reset to HEAD)"
        echo ""
        echo "All operations create automatic backups before proceeding."
        echo ""
        exit 1
    fi
    
    case "$action" in
        status)
            show_status
            ;;
        morning)
            rollback_morning
            ;;
        evening)
            rollback_evening
            ;;
        both)
            rollback_both
            ;;
        revert)
            local count="${2:-1}"
            git_revert "$count"
            ;;
        restore)
            restore_backup
            ;;
        abort)
            emergency_abort
            ;;
        *)
            error "Unknown action: $action"
            exit 1
            ;;
    esac
    
    echo ""
    success "Rollback operation complete"
}

main "$@"
