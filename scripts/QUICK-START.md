# ⚡ Quick Start Guide - Day 8 Launch

**TL;DR:** Run 3 commands, post to Twitter, celebrate 🎉

---

## 🌅 Morning Launch (09:00 KST)

```bash
cd ~/muin/scripts

# 1. Publish blog post (automatic)
./day-8-launch.sh morning

# 2. Prepare Twitter thread
./day-8-twitter-helper.sh morning
cat ~/.twitter-output/morning-clipboard.txt

# 3. Post to Twitter (manual copy-paste)
# Copy each tweet, post sequentially, wait 30-60s between tweets

# 4. Monitor (optional)
./day-8-monitor.sh morning
```

**Time required:** ~10 minutes

---

## 🌙 Evening Launch (21:00 KST)

```bash
cd ~/muin/scripts

# 1. Publish blog post (automatic)
./day-8-launch.sh evening

# 2. Prepare Twitter thread
./day-8-twitter-helper.sh evening
cat ~/.twitter-output/evening-clipboard.txt

# 3. Post to Twitter (manual copy-paste)
# Don't forget to PIN THIS THREAD to profile!

# 4. Monitor (optional)
./day-8-monitor.sh evening
```

**Time required:** ~15 minutes + engagement

---

## 🚨 If Something Goes Wrong

```bash
# Check status
./day-8-rollback.sh status

# Rollback if needed
./day-8-rollback.sh morning   # or evening

# Emergency abort
./day-8-rollback.sh abort
```

---

## 📚 Need More Info?

Read: `README.md` in this directory

---

**That's it! You're ready to launch. 🚀**
