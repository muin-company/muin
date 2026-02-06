# AI Paste Checker 🛡️

**Check for secrets before pasting into ChatGPT, Claude, or any AI assistant.**

A single-file web tool that scans text for API keys, passwords, personal info, and dangerous patterns before you share with AI.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://paste-checker.muin.company)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## What is this?

Paste text, see warnings. That's it.

Before you copy-paste code or logs into ChatGPT/Claude, this tool scans for:
- API keys (OpenAI, AWS, GitHub, Stripe, etc.)
- Passwords and secrets
- Credit card numbers
- Email addresses and phone numbers
- Private keys
- SQL injection patterns
- Dangerous shell commands

**All processing happens in your browser. Nothing is sent to any server.**

## Why use this?

**The problem:**
```
Developer: *pastes code into ChatGPT*

Code contains:
  const stripe = Stripe('sk_live_51H...');  // ← LIVE KEY!
  db.connect('mongodb://admin:password123@...');  // ← PASSWORD!
  
*Sends to AI*
❌ Secrets now in training data
❌ Potential security breach
❌ Compliance violation
```

**The solution:**
```
1. Paste code into AI Paste Checker first
2. See warnings before sharing
3. Remove secrets
4. Then paste to AI

✅ No leaks
✅ Safe sharing
✅ Peace of mind
```

## Installation

### Option 1: Use Online (Recommended)

Visit: [paste-checker.muin.company](https://paste-checker.muin.company) (or your deployed URL)

### Option 2: Run Locally

```bash
# Clone or download
git clone https://github.com/muin-company/paste-checker.git
cd paste-checker

# Open in browser
open index.html

# Or serve with any static server
python -m http.server 8000
# Visit http://localhost:8000
```

No build process, no dependencies. Just open the HTML file.

## Features

- **30+ Detection Patterns** - API keys, secrets, personal info, injection attacks
- **Real-time Scanning** - Results update as you type
- **Severity Levels** - 🔴 High, 🟡 Medium, 🟢 Low
- **Privacy-First** - 100% client-side, no server calls
- **One-Click Clear** - Erase text and results instantly
- **Copy-Paste Friendly** - Works with keyboard shortcuts
- **Mobile Responsive** - Use on phone/tablet
- **Dark Mode** - Easy on the eyes

## How to Use

### Basic Workflow

1. **Paste your text** into the left panel
2. **Review warnings** in the right panel
3. **Remove sensitive data** from the left panel
4. **Copy cleaned text** when warnings clear

### Example Session

**Input (before):**
```javascript
const openai = new OpenAI({
  apiKey: 'sk-proj-abc123xyz...'
});

const user = {
  email: 'john.doe@company.com',
  phone: '555-1234-5678',
  ssn: '123-45-6789'
};
```

**Warnings shown:**
```
🔴 High Severity (1)
  🔑 OpenAI API Key (line 2)
     → sk-proj-abc123xyz...

🟡 Medium Severity (3)
  📧 Email Address (line 6)
     → john.doe@company.com
  
  📞 Phone Number (line 7)
     → 555-1234-5678
  
  🆔 Social Security Number (line 8)
     → 123-45-6789
```

**Output (after fixing):**
```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // ✅ Fixed!
});

const user = {
  email: 'user@example.com',         // ✅ Dummy data
  phone: '000-000-0000',              // ✅ Dummy data
  ssn: '***-**-****'                  // ✅ Masked
};
```

**Result:**
```
✅ All clear! No issues found.

Safe to paste into AI.
```

## Real-World Examples

### Example 1: Code Review Request

**Scenario:** Asking ChatGPT to review your authentication code.

**Before checking:**
```typescript
// auth.ts
const JWT_SECRET = "super-secret-key-12345";
const STRIPE_KEY = "sk_live_51Hxxxxxxxxxxxxxxxxx";

export async function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
```

**After pasting into checker:**
```
🔴 High Severity (2)
  🔑 Hardcoded Secret (line 2)
  💳 Stripe Live API Key (line 3)

⚠️ DO NOT share this with AI!
```

**Fixed version:**
```typescript
// auth.ts
const JWT_SECRET = process.env.JWT_SECRET;
const STRIPE_KEY = process.env.STRIPE_KEY;

export async function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
```

**Now safe to ask AI for review.**

---

### Example 2: Debugging Database Errors

**Scenario:** Getting help with a database connection error.

**Error log (raw):**
```
MongoServerError: Authentication failed
  at Connection.connect (mongodb://admin:mypassword123@10.0.0.50:27017/prod)
  at async connectToDatabase (/app/db.js:12:5)

User: john.doe@company.com
Session ID: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Paste checker detects:**
```
🔴 High Severity (2)
  🔐 Database Password (mypassword123)
  🎫 JWT Token (eyJhbGciOiJI...)

🟡 Medium Severity (2)
  📧 Email (john.doe@company.com)
  🌐 Internal IP (10.0.0.50)
```

**Sanitized version for AI:**
```
MongoServerError: Authentication failed
  at Connection.connect (mongodb://[USER]:[PASSWORD]@[IP]:27017/prod)
  at async connectToDatabase (/app/db.js:12:5)

User: user@example.com
Session ID: [REDACTED]
```

**Now you can safely ask for help.**

---

### Example 3: Sharing Config Files

**Scenario:** Need help with Docker Compose configuration.

**Original `docker-compose.yml`:**
```yaml
version: '3'
services:
  api:
    environment:
      - DATABASE_URL=postgresql://user:pass123@db:5432/myapp
      - OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxx
      - STRIPE_SECRET=sk_live_51Hxxxxxxxxxxxxxxx
      - AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
```

**Warnings:**
```
🔴 High Severity (4)
  🔐 Database Password
  🔑 OpenAI API Key
  💳 Stripe Secret Key
  ☁️ AWS Access Key

⚠️ These are LIVE credentials!
```

**Safe version:**
```yaml
version: '3'
services:
  api:
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - STRIPE_SECRET=${STRIPE_SECRET}
      - AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
```

**With `.env.example`:**
```bash
DATABASE_URL=postgresql://user:password@db:5432/myapp
OPENAI_API_KEY=sk-proj-your-key-here
STRIPE_SECRET=sk_live_your-key-here
AWS_ACCESS_KEY=AKIA...
```

---

### Example 4: GitHub Issue / Bug Report

**Scenario:** Filing a bug report with full logs.

**Original log:**
```
[ERROR] Payment failed for user alice@company.com
  Card: 4532-1234-5678-9012 (Visa)
  IP: 203.0.113.45
  Session: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  
Stack trace:
  at processPayment (/app/payments.js:89)
  
Stripe Error: card_declined
```

**Detected issues:**
```
🔴 High Severity (2)
  💳 Credit Card Number (4532-1234-5678-9012)
  🎫 Bearer Token (eyJhbGci...)

🟡 Medium Severity (2)
  📧 Email (alice@company.com)
  🌐 IP Address (203.0.113.45)
```

**Sanitized for GitHub:**
```
[ERROR] Payment failed for user user@example.com
  Card: XXXX-XXXX-XXXX-9012 (Visa)
  IP: XXX.XXX.XXX.XXX
  Session: [REDACTED]
  
Stack trace:
  at processPayment (/app/payments.js:89)
  
Stripe Error: card_declined
```

---

### Example 5: Slack/Email Copy-Paste

**Scenario:** Copying a Slack thread about a production incident into ChatGPT for summarization.

**Slack conversation:**
```
@john: Production database is down!
Connection string: mongodb://root:SuperSecret123@prod-db-1.company.internal:27017

@sarah: I see the issue. The API key expired.
New key: sk-proj-abc123def456ghi789...

@mike: Also, our AWS credentials need rotation:
Access Key: AKIAIOSFODNN7EXAMPLE
Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Paste checker warns:**
```
🔴 High Severity (4)
  🔐 MongoDB Password (SuperSecret123)
  🔑 OpenAI API Key
  ☁️ AWS Access Key
  ☁️ AWS Secret Key

⚠️ DO NOT paste this into AI!
```

**Safe summary for AI:**
```
Team discussed production incident:
- Database connection issues (credentials expired)
- API key rotation needed
- AWS credential rotation planned

No sensitive data included.
```

---

### Example 6: SQL Query Optimization

**Scenario:** Need help optimizing a slow query.

**Original query:**
```sql
SELECT users.*, orders.*
FROM users
WHERE email = 'admin@company.com' OR 1=1--
  AND password = MD5('admin123')
  AND ssn = '123-45-6789';
```

**Detected:**
```
🔴 High Severity (2)
  🚨 SQL Injection Pattern (OR 1=1--)
  🆔 Social Security Number (123-45-6789)

🟡 Medium Severity (1)
  📧 Email (admin@company.com)

⚠️ This query has security vulnerabilities!
```

**Fixed for AI review:**
```sql
SELECT users.*, orders.*
FROM users
WHERE email = ? 
  AND password = MD5(?)
  AND ssn = ?;

-- Using prepared statements
```

---

### Example 7: Incident Response Documentation

**Scenario:** Documenting a security incident for team wiki.

**Draft notes:**
```
## Incident Report - 2026-02-06

Unauthorized access detected from IP: 192.168.1.100

Compromised accounts:
- admin@company.com (password: temp123)
- developer@company.com (SSH key: ssh-rsa AAAAB3Nza...)

Affected API keys:
- Stripe: sk_live_51Hxxxxxxxxxxxxxxxxx
- OpenAI: sk-proj-xxxxxxxxxxxxxxx

Recovery steps taken:
- Rotated all credentials
- Forced password resets
```

**Warnings:**
```
🔴 High Severity (4)
  🔑 Stripe Live Key
  🔑 OpenAI API Key
  🔐 Plaintext Password
  🔑 SSH Private Key

🟡 Medium Severity (2)
  📧 Email addresses
  🌐 Internal IP
```

**Safe version for wiki:**
```
## Incident Report - 2026-02-06

Unauthorized access detected from internal network.

Compromised accounts:
- 2 admin accounts (credentials rotated)

Affected API keys:
- Payment processor (rotated)
- AI service (rotated)

Recovery steps taken:
- Rotated all credentials
- Forced password resets
- Implemented 2FA requirement
```

---

### Example 8: Mobile App Debug Logs

**Scenario:** Debugging a mobile app crash, need to share logs with AI.

**Crash log:**
```
Fatal Exception: java.lang.NullPointerException
  at com.company.app.Payment.process(Payment.java:42)

User data:
  userId: 12345
  email: user@example.com
  phone: +1-555-123-4567
  deviceId: iPhone 13, iOS 16.5
  location: 37.7749° N, 122.4194° W (San Francisco)
  
API Config:
  baseUrl: https://api.company.com
  apiKey: pk_live_51Hxxxxxxxxxxxxxxxxx
  firebase: AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Detected issues:**
```
🔴 High Severity (2)
  💳 Stripe Publishable Key
  🔑 Firebase API Key

🟡 Medium Severity (2)
  📧 Email
  📞 Phone Number
  📍 GPS Coordinates
```

**Cleaned log:**
```
Fatal Exception: java.lang.NullPointerException
  at com.company.app.Payment.process(Payment.java:42)

User data:
  userId: [REDACTED]
  email: [REDACTED]
  phone: [REDACTED]
  deviceId: iPhone 13, iOS 16.5
  location: [REDACTED]
  
API Config:
  baseUrl: https://api.company.com
  apiKey: [API_KEY]
  firebase: [FIREBASE_KEY]

Stack trace shows null pointer at Payment.java:42
```

---

## What It Detects

### 🔴 High Severity

**API Keys & Tokens:**
- OpenAI (`sk-proj-...`, `sk-...`)
- Anthropic (`sk-ant-...`)
- AWS (`AKIA...`, secret keys)
- Google API (`AIza...`)
- Stripe (`sk_live_...`, `pk_live_...`)
- GitHub (`ghp_...`, `gho_...`, `ghs_...`)
- Slack (`xox...`)
- Discord bot tokens
- JWT tokens (`eyJ...`)

**Credentials:**
- Passwords in code (`password = "..."`)
- Database connection strings with passwords
- Private keys (RSA, SSH, PGP)
- Bearer tokens

**Financial Data:**
- Credit card numbers (Luhn algorithm validation)
- CVV codes

**Dangerous Patterns:**
- `rm -rf /`, `DROP TABLE`, `DROP DATABASE`
- `chmod 777`, `sudo rm -rf`
- SQL injection (`OR 1=1`, `UNION SELECT`)
- XSS (`<script>`, `javascript:`)

### 🟡 Medium Severity

**Personal Information:**
- Email addresses
- Phone numbers (US, international)
- Social Security Numbers (US)
- IP addresses (public)

**Test Keys:**
- Stripe test keys (`sk_test_...`)
- Sandbox credentials

### 🟢 Low Severity

**Internal Data:**
- Private IP addresses (`192.168.x.x`, `10.x.x.x`)
- Localhost references
- Internal domain names

## Tech Stack

- **Single HTML file** (~800 lines)
- **Vanilla JavaScript** (no frameworks)
- **Zero dependencies** (no CDN, no npm packages)
- **Regex-based detection** (30+ patterns)
- **Client-side only** (no backend)

Why? Because security tools should be simple, auditable, and trustworthy.

## Privacy & Security

**Your data never leaves your browser.**

- ✅ No server calls
- ✅ No analytics
- ✅ No tracking
- ✅ No external dependencies
- ✅ Works offline
- ✅ Open source (you can audit the code)

The entire tool is one HTML file. Open it, read it, trust it.

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires JavaScript enabled.

## Development

Want to modify or extend?

```bash
# The entire tool is in index.html
# Just open it in a text editor

# To add a new detection pattern:
1. Find the `patterns` array in the <script> section
2. Add your pattern:
   {
     name: 'My Pattern',
     regex: /your-regex-here/g,
     severity: 'high',  // or 'medium', 'low'
     icon: '🔍',
     description: 'What this detects'
   }
3. Save and reload
```

### Adding Custom Patterns

Example: Detect your company's internal API key format

```javascript
{
  name: 'Company API Key',
  regex: /COMPANY_[A-Z0-9]{32}/g,
  severity: 'high',
  icon: '🏢',
  description: 'Company internal API key detected'
}
```

## Deployment

### GitHub Pages

```bash
# 1. Create a new repo
git init
git add index.html
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/paste-checker.git
git push -u origin main

# 2. Enable GitHub Pages
# Settings → Pages → Source: main branch, root directory

# 3. Your tool is live at:
# https://yourusername.github.io/paste-checker/
```

### Netlify / Vercel

Just drag and drop the `paste-checker` folder to their dashboard. Done.

### Self-Hosted

```bash
# Any static file server works
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

## Keyboard Shortcuts

- `Ctrl/Cmd + V` - Paste into text area
- `Ctrl/Cmd + A` - Select all text
- `Esc` - Clear text and warnings

## Tips

1. **Bookmark it** - Keep it handy before every AI chat
2. **Make it a habit** - Check before pasting, every time
3. **Share with team** - Prevent accidental leaks across your org
4. **Add to onboarding** - Train new developers to use it
5. **CI/CD integration** - Use `ai-audit` CLI for automated checks

## Related Tools

Part of the MUIN Guard family:

- **[MUIN Guard Extension](https://github.com/muin-company/muin-guard)** - Browser extension with AI analysis
- **[ai-audit CLI](https://github.com/muin-company/ai-audit)** - Command-line scanner for projects

## Contributing

Contributions welcome!

**Ideas:**
- Add more detection patterns
- Improve regex accuracy
- Add export/import feature for custom patterns
- Add bulk text scanning
- Create browser extension version

**How:**
1. Fork the repo
2. Make changes to `index.html`
3. Test in multiple browsers
4. Submit a pull request

Keep it simple - one file, no dependencies.

## Known Limitations

- **Regex-based** - May have false positives/negatives
- **English-focused** - Some international formats not detected
- **No context awareness** - Can't tell if a key is fake/example
- **No AI analysis** - Unlike MUIN Guard extension (which has local LLM)

For more sophisticated analysis, use [MUIN Guard extension](https://github.com/muin-company/muin-guard).

## License

MIT License - use it however you want.

## Credits

Built by [MUIN Company](https://muin.company) - AI-first security tools.

Part of our mission: **일하는 AI, 누리는 인간** (AI works, humans enjoy)

---

**Remember:** The best leak is the one that never happens. Check before you paste. 🛡️
