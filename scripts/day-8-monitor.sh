#!/usr/bin/env bash
#
# 📊 Day 8 Launch Monitoring Script
# 
# Purpose: Monitor deployment status, verify links, check responsive design
# Usage:   ./day-8-monitor.sh [morning|evening|all]
# Author:  MJ (COO)
# Date:    2026-02-08

set -euo pipefail

# Configuration
REPO_DIR="$HOME/muin"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Logging
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $*"
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

# Check if URL is accessible
check_url() {
    local url="$1"
    local name="$2"
    
    local http_code
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    
    if [[ "$http_code" == "200" ]]; then
        success "$name: $url (HTTP $http_code)"
        return 0
    elif [[ "$http_code" == "000" ]]; then
        error "$name: $url (Connection failed)"
        return 1
    else
        warning "$name: $url (HTTP $http_code)"
        return 1
    fi
}

# Check if URL contains expected content
check_content() {
    local url="$1"
    local expected="$2"
    local name="$3"
    
    if curl -s "$url" | grep -q "$expected"; then
        success "$name: Content verified"
        return 0
    else
        error "$name: Expected content not found"
        return 1
    fi
}

# Check GitHub Actions status
check_github_actions() {
    log "Checking GitHub Actions status..."
    
    cd "$REPO_DIR" || exit 1
    
    # Get latest 3 workflow runs
    echo ""
    info "Latest workflow runs:"
    gh run list --workflow=hugo.yml --limit 3
    
    # Get latest run details
    local latest_run
    latest_run=$(gh run list --workflow=hugo.yml --limit 1 --json status,conclusion,databaseId --jq '.[0]')
    
    local status
    local conclusion
    status=$(echo "$latest_run" | jq -r '.status')
    conclusion=$(echo "$latest_run" | jq -r '.conclusion')
    
    echo ""
    if [[ "$status" == "completed" ]]; then
        if [[ "$conclusion" == "success" ]]; then
            success "Latest deployment: SUCCESS"
            return 0
        else
            error "Latest deployment: FAILED ($conclusion)"
            return 1
        fi
    else
        warning "Latest deployment: IN PROGRESS"
        return 2
    fi
}

# Check responsive design (using viewport meta tags and media queries)
check_responsive() {
    local url="$1"
    local name="$2"
    
    log "Checking responsive design for $name..."
    
    # Check for viewport meta tag
    if curl -s "$url" | grep -q 'meta name="viewport"'; then
        success "Viewport meta tag present"
    else
        warning "Viewport meta tag missing"
    fi
    
    # Check for common responsive indicators
    local content
    content=$(curl -s "$url")
    
    if echo "$content" | grep -q "@media"; then
        success "Media queries detected"
    else
        info "No media queries detected (may be using responsive framework)"
    fi
    
    # Check page size
    local size
    size=$(echo "$content" | wc -c)
    info "Page size: $(numfmt --to=iec-i --suffix=B $size 2>/dev/null || echo "${size} bytes")"
}

# Monitor morning post
monitor_morning() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 Monitoring Morning Post: Trust vs Control"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    local ko_url="https://muin.company/ko/posts/trust-vs-control/"
    local en_url="https://muin.company/en/posts/trust-vs-control/"
    local todobot_url="https://github.com/muin-company/todobot"
    
    log "Checking blog URLs..."
    check_url "$ko_url" "Korean version"
    check_url "$en_url" "English version"
    
    echo ""
    log "Checking content..."
    check_content "$ko_url" "통제 모델" "Korean content"
    check_content "$en_url" "Control Model" "English content"
    
    echo ""
    log "Checking linked resources..."
    check_url "$todobot_url" "TodoBot GitHub"
    
    echo ""
    check_responsive "$ko_url" "Korean version"
    
    echo ""
    check_github_actions
}

# Monitor evening post
monitor_evening() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 Monitoring Evening Post: Preparations Complete"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    local ko_url="https://muin.company/ko/posts/day-8-preparations-complete/"
    local en_url="https://muin.company/en/posts/day-8-preparations-complete/"
    local gumsi_url="https://gumsi-ai.vercel.app"
    local tools_url="https://tools.muin.company"
    local github_url="https://github.com/muin-company"
    
    log "Checking blog URLs..."
    check_url "$ko_url" "Korean version"
    check_url "$en_url" "English version"
    
    echo ""
    log "Checking content..."
    check_content "$ko_url" "준비 완료" "Korean content"
    check_content "$en_url" "Preparations Complete" "English content"
    
    echo ""
    log "Checking product links..."
    check_url "$gumsi_url" "GumsAI"
    check_url "$tools_url" "Tools site" || warning "Tools site may be down - update post if needed"
    check_url "$github_url" "GitHub organization"
    
    echo ""
    check_responsive "$ko_url" "Korean version"
    
    echo ""
    check_github_actions
}

# Full system check
monitor_all() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 Full System Monitor - Day 8 Launch"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Check if posts are live
    log "Checking which posts are live..."
    
    local morning_live=false
    local evening_live=false
    
    if curl -s -f "https://muin.company/ko/posts/trust-vs-control/" >/dev/null 2>&1; then
        morning_live=true
        success "Morning post is live"
    else
        info "Morning post not yet published"
    fi
    
    if curl -s -f "https://muin.company/ko/posts/day-8-preparations-complete/" >/dev/null 2>&1; then
        evening_live=true
        success "Evening post is live"
    else
        info "Evening post not yet published"
    fi
    
    echo ""
    
    # Monitor live posts
    if [[ "$morning_live" == true ]]; then
        monitor_morning
        echo ""
    fi
    
    if [[ "$evening_live" == true ]]; then
        monitor_evening
        echo ""
    fi
    
    # System-wide checks
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 System-Wide Checks"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    log "Checking main site..."
    check_url "https://muin.company" "Main site"
    check_url "https://muin.company/ko/" "Korean homepage"
    check_url "https://muin.company/en/" "English homepage"
    
    echo ""
    log "Checking products..."
    check_url "https://gumsi-ai.vercel.app" "GumsAI"
    check_url "https://github.com/muin-company/todobot" "TodoBot"
    check_url "https://github.com/muin-company/cli-tools" "CLI Tools"
    
    echo ""
    check_github_actions
}

# Generate monitoring report
generate_report() {
    local phase="$1"
    local timestamp
    timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
    
    local report_file="$REPO_DIR/monitor-report-${phase}-${timestamp}.txt"
    
    log "Generating monitoring report..."
    
    {
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "📊 Day 8 Launch Monitoring Report"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Phase: ${phase^}"
        echo "Generated: $(date)"
        echo ""
        
        case "$phase" in
            morning)
                echo "=== Morning Post Status ==="
                echo ""
                curl -s -o /dev/null -w "KO: %{http_code}\n" "https://muin.company/ko/posts/trust-vs-control/"
                curl -s -o /dev/null -w "EN: %{http_code}\n" "https://muin.company/en/posts/trust-vs-control/"
                ;;
            evening)
                echo "=== Evening Post Status ==="
                echo ""
                curl -s -o /dev/null -w "KO: %{http_code}\n" "https://muin.company/ko/posts/day-8-preparations-complete/"
                curl -s -o /dev/null -w "EN: %{http_code}\n" "https://muin.company/en/posts/day-8-preparations-complete/"
                ;;
            all)
                echo "=== All Posts Status ==="
                echo ""
                curl -s -o /dev/null -w "Trust vs Control KO: %{http_code}\n" "https://muin.company/ko/posts/trust-vs-control/"
                curl -s -o /dev/null -w "Trust vs Control EN: %{http_code}\n" "https://muin.company/en/posts/trust-vs-control/"
                curl -s -o /dev/null -w "Preparations Complete KO: %{http_code}\n" "https://muin.company/ko/posts/day-8-preparations-complete/"
                curl -s -o /dev/null -w "Preparations Complete EN: %{http_code}\n" "https://muin.company/en/posts/day-8-preparations-complete/"
                ;;
        esac
        
        echo ""
        echo "=== Product Links ==="
        echo ""
        curl -s -o /dev/null -w "GumsAI: %{http_code}\n" "https://gumsi-ai.vercel.app"
        curl -s -o /dev/null -w "TodoBot: %{http_code}\n" "https://github.com/muin-company/todobot"
        curl -s -o /dev/null -w "Tools: %{http_code}\n" "https://tools.muin.company" || echo "Tools: Connection failed"
        
        echo ""
        echo "=== GitHub Actions ==="
        echo ""
        cd "$REPO_DIR" || exit 1
        gh run list --workflow=hugo.yml --limit 3
        
        echo ""
        echo "=== Recommendations ==="
        echo ""
        
        # Check for issues and provide recommendations
        if ! curl -s -f "https://tools.muin.company" >/dev/null 2>&1; then
            echo "⚠️  tools.muin.company is down - consider updating blog references"
        fi
        
        echo "✓  Monitor Twitter engagement after posting threads"
        echo "✓  Respond to comments within 15 minutes"
        echo "✓  Check analytics in 1 hour for traffic stats"
        
    } > "$report_file"
    
    cat "$report_file"
    success "Report saved to $report_file"
}

# Main execution
main() {
    local action="${1:-all}"
    
    case "$action" in
        morning)
            monitor_morning
            generate_report "morning"
            ;;
        evening)
            monitor_evening
            generate_report "evening"
            ;;
        all)
            monitor_all
            generate_report "all"
            ;;
        *)
            error "Unknown action: $action"
            echo "Usage: $0 [morning|evening|all]"
            exit 1
            ;;
    esac
    
    echo ""
    success "Monitoring complete!"
}

main "$@"
