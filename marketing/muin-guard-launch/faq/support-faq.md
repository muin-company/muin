# MUIN Guard - Frequently Asked Questions (FAQ)

**Support & User Guide**

Last Updated: February 8, 2026

---

## 📚 Table of Contents

1. [General](#general)
2. [Installation & Setup](#installation--setup)
3. [Features & Functionality](#features--functionality)
4. [Privacy & Security](#privacy--security)
5. [AI Analysis](#ai-analysis)
6. [Troubleshooting](#troubleshooting)
7. [Pricing & Plans](#pricing--plans)
8. [Technical](#technical)

---

## General

### What is MUIN Guard?

MUIN Guard is a Chrome extension that protects you from accidentally exposing sensitive information while chatting with AI assistants like ChatGPT and Claude. It detects risks in real-time and alerts you before you hit send.

### Why do I need this?

Have you ever:
- Pasted code with an API key still in it?
- Shared debug logs containing real user emails?
- Asked about a dangerous command that could harm your system?

MUIN Guard prevents these mistakes before they happen.

### Which platforms does it support?

Currently supported:
- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude (claude.ai)

Coming soon:
- 🔜 Gemini (gemini.google.com)
- 🔜 More platforms based on user requests

### Is it really free?

**Yes, completely free for individual users.** No trials, no premium tiers for basic features, no credit card required.

We plan to offer an enterprise version with team management features in the future, but the core protection will always be free.

### Is it open source?

Yes! MUIN Guard is open source under the MIT License. You can view the code, audit it, contribute to it, or even fork it.

GitHub: https://github.com/muin-company/muin

---

## Installation & Setup

### How do I install MUIN Guard?

1. Visit the [Chrome Web Store](link_pending)
2. Click "Add to Chrome"
3. Click "Add extension" in the popup
4. Done! Visit ChatGPT or Claude to see it in action

### Do I need to configure anything?

No! MUIN Guard works out of the box. Just install and start using ChatGPT or Claude as normal.

You can customize settings later if you want (popup → Settings).

### How do I know it's working?

1. Click the MUIN Guard icon in your browser toolbar
2. You'll see "Monitoring: Active" for supported platforms
3. Visit ChatGPT or Claude - you should see a small MUIN Guard indicator
4. Try typing something like "My API key is sk-test123" - you should get an alert

### Can I use it on multiple computers?

Yes! Install it on each device you use. Settings don't sync across devices (by design - for privacy), but the extension works independently on each machine.

### How do I uninstall it?

1. Right-click the MUIN Guard icon in Chrome toolbar
2. Select "Remove from Chrome"
3. Confirm removal

All local data will be automatically deleted.

---

## Features & Functionality

### What does MUIN Guard detect?

**30+ risk patterns including:**

**Personal Information:**
- Email addresses
- Phone numbers
- Credit card numbers
- Social Security Numbers
- Passport numbers
- Internal IP addresses

**API Keys & Secrets:**
- OpenAI (`sk-...`, `sk-proj-...`)
- Anthropic (`sk-ant-...`)
- AWS (`AKIA...`, `ASIA...`)
- GitHub (`ghp_...`, `gho_...`, `github_pat_...`)
- Stripe (`sk_live_...`, `pk_live_...`)
- Slack (`xox...`)
- JWT tokens
- Generic secrets patterns

**Dangerous Commands:**
- System destruction (`rm -rf /`)
- Database deletion (`DROP TABLE`, `DROP DATABASE`)
- Permission vulnerabilities (`chmod 777`)
- Disk operations (`dd if=...`)

**Security Attacks:**
- SQL injection (`UNION SELECT`, `OR 1=1--`)
- XSS (`<script>`, `javascript:`)
- Command injection

### Can I customize what it detects?

Currently, all detections are enabled by default. We're planning to add:
- Custom sensitivity levels
- Per-pattern toggles
- Whitelist/blacklist functionality

Request this feature on [GitHub](https://github.com/muin-company/muin/issues)!

### What happens when a risk is detected?

1. **Alert appears** - Red warning banner with details
2. **Input is NOT sent** - You can review and edit
3. **Options shown** - Send anyway, edit, or cancel
4. **Logged** - Alert saved to dashboard (optional)

### Can I see my detection history?

Yes! Click the MUIN Guard icon → "Dashboard" to see:
- All conversations monitored
- Alerts triggered
- Risk statistics
- Platform breakdown

### How do I delete my data?

**From Dashboard:**
1. Click MUIN Guard icon
2. Open Dashboard
3. Go to Settings
4. Click "Delete All Data"
5. Confirm

**Or uninstall the extension** - all data is removed automatically.

---

## Privacy & Security

### Where is my data stored?

**100% locally in your browser.** MUIN Guard uses Chrome's local storage (IndexedDB). Your data never leaves your device.

### Does MUIN Guard send data to servers?

**No.** The only network request is downloading the AI model (if you enable AI analysis). No conversation data, no analytics, no telemetry.

### Can MUIN see my conversations?

**No.** Even we (the developers) cannot see your data. It's architecturally impossible because there's no server infrastructure to receive it.

### What data is collected?

**Nothing is collected.** We don't track:
- Usage statistics
- Conversation content
- Detected risks
- User behavior
- Analytics

The extension is completely private by design.

### How can I verify this?

1. **Check the code** - We're open source: https://github.com/muin-company/muin
2. **Monitor network traffic** - Use Chrome DevTools Network tab
3. **Read our privacy policy** - Full details at [muin.company/privacy](https://muin.company/privacy)

### What permissions does MUIN Guard need?

- `storage` - Save settings and history locally
- `notifications` - Show risk alerts
- `offscreen` - Run WebGPU AI analysis
- `host_permissions` - Access ChatGPT/Claude pages

We only request necessary permissions. No broad permissions like "read all websites."

### Is my data encrypted?

Local storage in Chrome is encrypted at the OS level (when your device is encrypted). We don't add additional encryption because:
1. Data never leaves your device
2. OS-level encryption is sufficient
3. You can delete data anytime

---

## AI Analysis

### What is AI Analysis?

An optional feature that uses a local AI model (Llama Guard 3) to provide more sophisticated risk detection beyond pattern matching.

### How does it work?

1. **Enable** - Click "Enable AI Analysis" in popup
2. **Download** - ~700MB model downloads (one-time)
3. **Run** - AI analyzes messages in your browser via WebGPU
4. **Private** - Everything runs locally, no cloud involved

### Do I need it?

**No.** The pattern-based detection is very effective. AI analysis provides:
- More nuanced risk assessment
- Context-aware detection
- Fewer false positives
- Detection of subtle risks

Try the basic version first, enable AI if you want deeper protection.

### How big is the AI model?

~700MB. Downloaded once and cached in your browser.

### Does it slow down my browser?

Initial load takes 10-30 seconds (one-time). After that:
- Minimal CPU usage
- Runs in background (offscreen document)
- Async processing (doesn't block typing)
- Auto-managed by browser

### What if I don't have WebGPU?

The extension will fall back to WASM (slower but works everywhere). If your browser doesn't support either, AI analysis won't be available, but pattern detection still works.

### Can I disable AI analysis?

Yes, anytime:
1. Click MUIN Guard icon
2. Toggle "AI Analysis" off
3. Model stays cached (no re-download needed if you re-enable)

### Can I delete the AI model?

Yes, it's stored in browser cache. Clear browser cache or uninstall the extension.

---

## Troubleshooting

### MUIN Guard isn't showing alerts

**Check these:**
1. Is the icon showing "Monitoring: Active"?
2. Are you on a supported platform (ChatGPT/Claude)?
3. Try typing a test: "My API key is sk-test123"
4. Refresh the page and try again
5. Check if extension is enabled in `chrome://extensions`

### The popup won't open

1. Click the MUIN Guard icon again
2. Right-click icon → "Inspect popup" (check for errors)
3. Reload the extension: `chrome://extensions` → reload button
4. Restart Chrome

### AI Analysis won't load

1. **Check browser support** - Visit `chrome://gpu` - look for WebGPU
2. **Check storage** - Do you have 1GB free space?
3. **Check network** - Model downloads from CDN
4. **Wait** - Initial load can take 30 seconds
5. **Try WASM fallback** - Should auto-detect

### Dashboard shows no data

1. Have you had any conversations on ChatGPT/Claude since installing?
2. Check Settings → is "Save History" enabled?
3. Try triggering a test alert (type API key pattern)
4. Data is per-device (doesn't sync across computers)

### Extension is slowing down my browser

1. **Disable AI Analysis** if enabled (biggest resource user)
2. **Clear old history** - Dashboard → Settings → Clear history
3. **Restart Chrome** - Free up memory
4. **Check other extensions** - Disable others to isolate issue

Still slow? Report on [GitHub Issues](https://github.com/muin-company/muin/issues).

### Alerts are false positives

Some patterns can trigger on legitimate content (e.g., example API keys in documentation). We're working on:
- Better pattern matching
- Context awareness
- User-adjustable sensitivity

For now, you can:
- Dismiss specific alerts
- Send feedback via GitHub
- Wait for AI analysis improvements

### Extension conflicts with another tool

Known conflicts: None currently reported.

If you find one:
1. Identify the conflicting extension
2. Report on [GitHub](https://github.com/muin-company/muin/issues)
3. We'll investigate and fix

---

## Pricing & Plans

### Is it really free forever?

**Yes, for individual users.** Core privacy protection will always be free.

### What about enterprise?

We're building an enterprise version with:
- Team dashboard
- Centralized management
- Compliance reports
- Custom policies
- SSO integration

This will be paid (pricing TBD). Launch planned for Q2 2026.

### Will free users lose features?

**No.** When we launch enterprise, individual users will keep:
- All current detections
- AI analysis
- Dashboard
- All core features

Enterprise features will be **additive** (team management, not better detection).

### Can I use it for my team now?

Yes, but each person installs individually. No central management yet.

Enterprise version will add team-wide visibility and controls.

### Are there usage limits?

No. Unlimited conversations, unlimited alerts, unlimited AI analysis.

---

## Technical

### What's the tech stack?

- **Language:** Vanilla JavaScript (ES6+)
- **Runtime:** Chrome Extension Manifest V3
- **AI:** WebGPU/WASM with Llama Guard 3
- **Storage:** IndexedDB
- **Testing:** Custom test suite

### How does detection work?

**Pattern Matching:**
1. MutationObserver watches for input changes
2. Text scanned against 30+ regex patterns
3. Matches scored by severity
4. Alert shown if threshold exceeded

**AI Analysis (optional):**
1. Text sent to offscreen document
2. Llama Guard 3 analyzes via WebGPU
3. Returns risk assessment
4. Combined with pattern detection

### What's the performance impact?

- Detection: <1ms latency
- Memory: ~50MB base, ~850MB with AI loaded
- CPU: Minimal (async processing)
- Network: None (except AI model download)

### Can I self-host?

The extension runs locally, so there's nothing to host. You can:
1. Clone the GitHub repo
2. Load unpacked extension in Chrome
3. Use your own fork/modifications

### Can I contribute?

Yes! We welcome:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements
- Translations

See [CONTRIBUTING.md](https://github.com/muin-company/muin/blob/main/CONTRIBUTING.md)

### How do I report bugs?

1. Check [existing issues](https://github.com/muin-company/muin/issues)
2. Create new issue with:
   - Chrome version
   - MUIN Guard version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if possible

### Is there an API?

Not currently. The extension is self-contained. Enterprise version may include API for integrations.

### Will there be mobile versions?

Chrome extensions don't work on mobile. We're exploring:
- Firefox Mobile (if they support extensions)
- Native iOS app
- Native Android app

No timeline yet - depends on demand.

### What about Firefox/Edge/Safari?

**Firefox:** Planned for Q1 2026 (WebExtensions are similar)  
**Edge:** Works now (Edge uses Chrome extensions)  
**Safari:** Possible but not prioritized (different extension API)

Request support on [GitHub](https://github.com/muin-company/muin/issues)!

---

## 🆘 Still Need Help?

### Community Support

- **GitHub Discussions:** https://github.com/muin-company/muin/discussions
- **GitHub Issues:** https://github.com/muin-company/muin/issues
- **Discord:** [Link TBD]

### Email Support

- **General:** support@muin.company
- **Bug Reports:** bugs@muin.company
- **Feature Requests:** features@muin.company

### Documentation

- **User Guide:** https://docs.muin.company/guard
- **Developer Docs:** https://github.com/muin-company/muin
- **Blog:** https://blog.muin.company

### Social Media

- **Twitter:** @muin_company
- **Website:** https://muin.company

---

## 📝 Feedback

Help us improve! We'd love to hear:
- What's working well
- What's confusing
- What features you want
- What bugs you've found

Submit feedback:
- GitHub: https://github.com/muin-company/muin/issues
- Email: feedback@muin.company
- Twitter: @muin_company

---

**Last Updated:** February 8, 2026  
**Version:** 0.3.0  
**Support:** support@muin.company
