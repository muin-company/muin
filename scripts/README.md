# 🚀 Day 8 Launch Automation Scripts

Complete automation suite for Day 8 morning launch workflow.

**Created:** 2026-02-08  
**Purpose:** Reduce manual work and error potential for tomorrow's launch  
**Status:** ✅ Ready for production

---

## 📦 What's Included

| Script | Purpose | Usage |
|--------|---------|-------|
| `day-8-launch.sh` | Main blog publishing automation | Blog deployment workflow |
| `day-8-monitor.sh` | Deployment monitoring & verification | Post-publish checks |
| `day-8-rollback.sh` | Emergency rollback & backup restore | Error recovery |
| `day-8-twitter-helper.sh` | Twitter thread preparation | Social media posting |

---

## 🎯 Quick Start

### Before You Start

Make all scripts executable:
```bash
cd ~/muin/scripts
chmod +x *.sh
```

### Morning Launch Workflow (09:00 KST)

**Step 1: Publish Blog Post**
```bash
./day-8-launch.sh morning
```

This will:
- ✅ Fix dates in Trust vs Control posts
- ✅ Move posts from drafts to published
- ✅ Commit and push to GitHub
- ✅ Wait for deployment to complete
- ✅ Verify URLs are accessible
- ✅ Generate deployment report

**Step 2: Prepare Twitter Thread**
```bash
./day-8-twitter-helper.sh morning
```

This will:
- ✅ Extract Thread 1 (Trust vs Control)
- ✅ Verify character counts
- ✅ Create clipboard-ready format
- ✅ Save to `~/.twitter-output/morning-clipboard.txt`

**Step 3: Post Twitter Thread**
```bash
# View thread
cat ~/.twitter-output/morning-clipboard.txt

# Copy-paste each tweet to Twitter
# Wait 30-60s between tweets
```

**Step 4: Monitor Deployment**
```bash
./day-8-monitor.sh morning
```

---

### Evening Launch Workflow (21:00 KST)

**Step 1: Publish Blog Post**
```bash
./day-8-launch.sh evening
```

**Step 2: Prepare Twitter Thread**
```bash
./day-8-twitter-helper.sh evening
cat ~/.twitter-output/evening-clipboard.txt
```

**Step 3: Monitor Deployment**
```bash
./day-8-monitor.sh evening
```

**Step 4: Pin Thread to Profile** 🌟  
Don't forget to pin Thread 2 (Preparations Complete) to @muin_company profile!

---

## 📖 Detailed Script Documentation

### 1. day-8-launch.sh

**Main blog publishing automation script**

```bash
# Usage
./day-8-launch.sh [morning|evening|both|fix-dates]

# Examples
./day-8-launch.sh morning       # Publish morning post
./day-8-launch.sh evening       # Publish evening post
./day-8-launch.sh fix-dates     # Only fix dates
```

**What it does:**
1. Checks prerequisites (Hugo, GitHub CLI, clean git state)
2. Fixes dates in Trust vs Control posts (if needed)
3. Tests Hugo build
4. Moves posts from `content/drafts/` to `content/posts/`
5. Commits and pushes to GitHub
6. Waits for GitHub Actions deployment (max 3 minutes)
7. Verifies blog URLs are accessible
8. Generates deployment report

**Output:**
- Console output with color-coded status
- Deployment report saved to `deploy-report-{phase}.txt`
- Next steps and URLs displayed

**Safety features:**
- Checks for uncommitted changes before starting
- Confirms deployment success before proceeding
- Creates automatic backups via git history

---

### 2. day-8-monitor.sh

**Deployment monitoring and verification script**

```bash
# Usage
./day-8-monitor.sh [morning|evening|all]

# Examples
./day-8-monitor.sh morning      # Monitor morning post only
./day-8-monitor.sh evening      # Monitor evening post only
./day-8-monitor.sh all          # Full system check
```

**What it does:**
1. Checks blog post accessibility (Korean + English)
2. Verifies expected content is present
3. Checks all product links (GumsAI, TodoBot, etc.)
4. Tests responsive design indicators
5. Monitors GitHub Actions deployment status
6. Generates detailed monitoring report

**Checks performed:**
- ✅ HTTP status codes (200 = success)
- ✅ Content verification (keywords present)
- ✅ Viewport meta tags
- ✅ Media query detection
- ✅ Page size analysis
- ✅ GitHub Actions success/failure

**Output:**
- Console output with status for each check
- Monitoring report saved to `monitor-report-{phase}-{timestamp}.txt`
- Recommendations for any issues found

---

### 3. day-8-rollback.sh

**Emergency rollback and backup restore script**

```bash
# Usage
./day-8-rollback.sh [morning|evening|both|status|revert|restore|abort]

# Examples
./day-8-rollback.sh status      # Show current status
./day-8-rollback.sh morning     # Rollback morning post
./day-8-rollback.sh revert 1    # Git revert last commit
./day-8-rollback.sh restore     # Restore from backup
./day-8-rollback.sh abort       # Emergency abort (reset to HEAD)
```

**What it does:**

**Status mode:**
- Shows all Day 8 posts (drafts + published)
- Lists recent commits
- Shows available backups

**Rollback mode:**
- Creates automatic backup before rollback
- Moves posts back to drafts
- Commits changes (but doesn't push yet)
- Allows review before pushing

**Revert mode:**
- Uses `git revert` to undo commits
- Safer than `reset` (preserves history)
- Creates backup before reverting

**Restore mode:**
- Lists available backups
- Allows selection from backup list
- Restores files from selected backup
- Creates backup of current state before restore

**Abort mode:**
- Emergency reset to last commit
- Discards all uncommitted changes
- Creates backup before aborting

**Safety features:**
- ✅ Automatic backups before all operations
- ✅ Confirmation prompts for destructive actions
- ✅ Changes committed but not pushed (allows review)
- ✅ Backups stored in `.launch-backups/` with timestamps

---

### 4. day-8-twitter-helper.sh

**Twitter thread preparation and verification script**

```bash
# Usage
./day-8-twitter-helper.sh [morning|evening|both|verify|guide]

# Examples
./day-8-twitter-helper.sh morning   # Prepare morning thread
./day-8-twitter-helper.sh evening   # Prepare evening thread
./day-8-twitter-helper.sh verify    # Verify all threads
./day-8-twitter-helper.sh guide     # Show posting guide
```

**What it does:**

**Prepare mode:**
1. Extracts thread from `marketing/twitter-day-8-threads.md`
2. Counts characters for each tweet
3. Verifies all tweets are under 280 chars
4. Creates two output files:
   - Full thread with character counts
   - Clipboard-ready version for copy-paste

**Verify mode:**
- Checks if Twitter threads file exists
- Verifies required sections are present
- Checks for all required links
- Counts tweets (7 for Thread 1, 8 for Thread 2)

**Guide mode:**
- Shows step-by-step posting instructions
- Provides tips for engagement
- Lists important reminders

**Output:**
- Full thread: `~/.twitter-output/{phase}-thread.txt`
- Clipboard version: `~/.twitter-output/{phase}-clipboard.txt`
- Console output with character counts and verification

---

## 🔄 Complete Morning Workflow Example

```bash
# T-minus 30 minutes (08:30 KST)
cd ~/muin/scripts
./day-8-monitor.sh all           # Pre-launch system check

# 09:00 KST - Launch time!
./day-8-launch.sh morning        # Publish blog post
# Wait ~3 minutes for deployment

# Verify deployment
./day-8-monitor.sh morning       # Check everything is live

# Prepare Twitter thread
./day-8-twitter-helper.sh morning
cat ~/.twitter-output/morning-clipboard.txt

# Post to Twitter (manually, one tweet at a time)
# Monitor engagement for 30 minutes
```

---

## 🌙 Complete Evening Workflow Example

```bash
# T-minus 30 minutes (20:30 KST)
cd ~/muin/scripts
./day-8-monitor.sh all           # Check system status

# 21:00 KST - Launch time!
./day-8-launch.sh evening        # Publish blog post
# Wait ~3 minutes for deployment

# Verify deployment
./day-8-monitor.sh evening       # Check everything is live

# Prepare Twitter thread
./day-8-twitter-helper.sh evening
cat ~/.twitter-output/evening-clipboard.txt

# Post to Twitter (manually)
# PIN THREAD TO PROFILE!
# Engage with every comment in first hour
```

---

## ⚠️ Emergency Procedures

### If Blog Deployment Fails

**Symptom:** GitHub Actions shows red X, blog not updating

**Solution 1: Check logs and retry**
```bash
cd ~/muin
gh run list --workflow=hugo.yml --limit 1
gh run view <run-id>  # Check error details

# If temporary issue, wait 5 minutes and retry
git commit --amend --no-edit
git push --force
```

**Solution 2: Rollback**
```bash
./day-8-rollback.sh morning   # or evening
# Review changes
cd ~/muin
git push origin main          # Push rollback
```

---

### If Links Are Broken

**Symptom:** Product links returning 404 or connection errors

**Quick fix for tools.muin.company:**
```bash
cd ~/muin/content/posts

# Replace tools.muin.company with GitHub link
sed -i '' 's|tools.muin.company|github.com/muin-company/cli-tools|g' \
  day-8-preparations-complete.*.md

git add day-8-preparations-complete.*.md
git commit -m "Fix: Replace tools.muin.company with GitHub link"
git push origin main
```

**Alternative:** Add "launching soon" disclaimer
```bash
# Edit post manually to add disclaimer
vim content/posts/day-8-preparations-complete.ko.md
# Add: (launching soon) after tools.muin.company link
```

---

### If Everything Goes Wrong (Nuclear Option)

**Use this only if multiple critical issues occur**

**Step 1: Emergency abort**
```bash
./day-8-rollback.sh abort
```

**Step 2: Delay announcement**
Post to Twitter:
```
We're launching MUIN tomorrow instead! 

Spent 8 days building, taking one more day to make sure 
everything's perfect for you.

See you at 09:00 KST 2026-02-10! 🚀

#BuildInPublic
```

**Step 3: Fix issues calmly with 24-hour buffer**

**Step 4: Relaunch next day**

**Probability of needing this:** <5%  
**Why we have it:** Peace of mind

---

## 📊 Success Metrics

### Immediate (First 24 Hours)

**Blog:**
- [ ] Both posts live and accessible
- [ ] 100+ combined views
- [ ] No broken links
- [ ] Mobile rendering good

**Twitter:**
- [ ] Both threads posted successfully
- [ ] 1,000+ impressions combined
- [ ] 50+ engagements
- [ ] +25 new followers

**Products:**
- [ ] GumsAI accessible
- [ ] TodoBot repo +5 stars
- [ ] At least 1 positive comment

---

## 🛠️ Troubleshooting

### Scripts won't run

**Error:** `Permission denied`
```bash
chmod +x ~/muin/scripts/*.sh
```

**Error:** `command not found: gh`
```bash
brew install gh
gh auth login
```

**Error:** `command not found: hugo`
```bash
brew install hugo
```

---

### Deployment timeout

**Issue:** Script waits 3+ minutes with no completion

**Check GitHub Actions:**
```bash
cd ~/muin
gh run list --workflow=hugo.yml --limit 1
gh run watch  # Watch in real-time
```

**Common causes:**
- GitHub Pages delayed (wait 5-10 minutes)
- Build error (check logs)
- Network issue (retry push)

---

### Character count issues

**Issue:** Tweet shows as >280 characters

**Note:** Twitter counts URLs as 23 chars regardless of length, and some emoji as 2 chars.

**Fix:**
1. Edit `~/muin/marketing/twitter-day-8-threads.md`
2. Shorten tweet text
3. Re-run helper script

---

## 📝 Files Generated

All scripts create output files for tracking and review:

```
~/muin/
├── deploy-report-morning.txt           # Morning deployment report
├── deploy-report-evening.txt           # Evening deployment report
├── monitor-report-{phase}-{time}.txt   # Monitoring reports
├── .launch-backups/                    # Automatic backups
│   ├── rollback-morning_{time}/
│   ├── rollback-evening_{time}/
│   └── emergency-abort_{time}/
└── .twitter-output/                    # Twitter thread files
    ├── morning-thread.txt
    ├── morning-clipboard.txt
    ├── evening-thread.txt
    └── evening-clipboard.txt
```

---

## 🎓 Learning Resources

**If this is your first launch:**
1. Read: `~/muin/DAY-8-LAUNCH-FINAL-CHECKLIST.md`
2. Run: `./day-8-twitter-helper.sh guide`
3. Test: `./day-8-launch.sh fix-dates` (safe dry-run)
4. Monitor: `./day-8-monitor.sh status`

**Best practices:**
- ✅ Always run monitoring after publishing
- ✅ Create manual backup before major changes
- ✅ Test scripts on non-critical files first
- ✅ Keep Twitter thread file open for reference
- ✅ Respond to engagement within 15 minutes

---

## 🚀 Launch Checklist

Use this as a final pre-flight check:

### Pre-Launch (T-minus 1 hour)

- [ ] All scripts executable (`chmod +x *.sh`)
- [ ] GitHub CLI authenticated (`gh auth status`)
- [ ] Hugo installed and working (`hugo version`)
- [ ] Twitter threads file exists and verified
- [ ] @muin_company account ready
- [ ] Coffee ready ☕

### Morning Launch (09:00 KST)

- [ ] Run `./day-8-launch.sh morning`
- [ ] Run `./day-8-monitor.sh morning`
- [ ] Run `./day-8-twitter-helper.sh morning`
- [ ] Post Twitter thread manually
- [ ] Monitor engagement for 30 minutes

### Evening Launch (21:00 KST)

- [ ] Run `./day-8-launch.sh evening`
- [ ] Run `./day-8-monitor.sh evening`
- [ ] Run `./day-8-twitter-helper.sh evening`
- [ ] Post Twitter thread manually
- [ ] Pin thread to profile
- [ ] Engage with all comments (1 hour)

### Post-Launch

- [ ] Screenshot best tweets
- [ ] Log metrics to memory files
- [ ] Update `~/clawd/memory/2026-02-09.md`
- [ ] Celebrate! 🎉

---

## 💡 Tips & Tricks

**Time-saving shortcuts:**
```bash
# Morning launch one-liner
./day-8-launch.sh morning && ./day-8-monitor.sh morning && ./day-8-twitter-helper.sh morning

# Quick status check
./day-8-rollback.sh status && ./day-8-monitor.sh all

# Prepare both threads at once
./day-8-twitter-helper.sh both
```

**Monitoring during deployment:**
```bash
# Watch GitHub Actions in real-time
cd ~/muin
gh run watch

# Continuous monitoring
watch -n 10 './day-8-monitor.sh all'
```

**Copy thread to clipboard (macOS):**
```bash
cat ~/.twitter-output/morning-clipboard.txt | pbcopy
# Now paste directly into Twitter
```

---

## 🤝 Support

If something goes wrong:

1. **Check the logs:** All scripts produce detailed console output
2. **Run status check:** `./day-8-rollback.sh status`
3. **Use rollback:** `./day-8-rollback.sh [morning|evening]`
4. **Contact:** Share error output with ONE via Telegram

**Remember:** These scripts have automatic backups. You can always rollback!

---

## 📜 Version History

**v1.0.0** (2026-02-08)
- Initial release
- 4 complete automation scripts
- Full documentation
- Ready for Day 8 launch

---

## 🎉 Final Words

You've spent 8 days building MUIN. These scripts are here to make Day 8 launch smooth, safe, and stress-free.

**Key philosophy:**
- Automation > Manual work
- Safety > Speed
- Rollback > Panic
- Launch > Perfection

**Version 0.1 is enough.**

Now go launch this thing! 🚀

---

**Created by:** MJ (COO)  
**Date:** 2026-02-08  
**For:** Day 8 Launch (2026-02-09)  
**Status:** ✅ Ready to ship

Good luck tomorrow! 💪
