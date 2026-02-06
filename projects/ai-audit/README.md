# ai-audit 🔍

Scan your codebase for sensitive data before sharing with AI tools like ChatGPT, Claude, or Copilot.

## Why?

When you paste code into AI assistants or use AI-powered tools, you might accidentally expose:
- API keys and secrets
- Private keys
- Passwords in config files
- Personal information (emails, phone numbers, SSNs)
- Credit card numbers
- JWT tokens and auth headers

`ai-audit` scans your code and warns you before you share something you shouldn't.

## Installation

```bash
npm install -g ai-audit
```

Or run directly with npx:

```bash
npx ai-audit .
```

## Usage

```bash
# Scan current directory
ai-audit

# Scan specific path
ai-audit ./src

# Show verbose output with context
ai-audit -v

# Output as JSON
ai-audit --json > report.json

# Only show high severity issues
ai-audit --severity high

# List all detection patterns
ai-audit --list-patterns
```

## What It Detects

### 🚨 High Severity
- OpenAI, Anthropic, AWS, Google API keys
- GitHub, Slack, Discord tokens
- Stripe, Twilio, SendGrid keys
- Private keys (RSA, SSH, PGP)
- Database connection strings with passwords
- JWT tokens
- Credit card numbers
- Social Security Numbers

### ⚠️ Medium Severity
- Stripe test keys
- Bearer tokens
- Firebase URLs

### ℹ️ Low Severity
- Email addresses
- Phone numbers
- IP addresses

## Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Show all findings including context |
| `-j, --json` | Output as JSON |
| `-q, --quiet` | Only output summary |
| `--severity <level>` | Minimum severity: low, medium, high |
| `--ignore <patterns>` | Additional glob patterns to ignore |
| `--list-patterns` | List all detection patterns |
| `--no-color` | Disable colors |

## Exit Codes

- `0` - No high severity issues found
- `1` - High severity issues found
- `2` - Scan error

## Configuration

By default, `ai-audit` ignores:
- `node_modules/`
- `.git/`
- `dist/`, `build/`
- Lock files
- Binary files (images, fonts, etc.)

## Example Output

```
🔍 ai-audit v1.0.0
   Scanning: /Users/you/myproject

📋 Findings

  src/config.js
    🚨 OpenAI API Key (line 5)
    🚨 Password Assignment (line 12)

  .env
    🚨 AWS Access Key (line 2)
    ⚠️ Stripe Test Key (line 8)

──────────────────────────────────────────────────

📊 Summary

   Files scanned: 47
   Total issues:  4

   🚨 High:   3
   ⚠️ Medium: 1

❌ FAIL: High severity issues found!

   ⚠️  Do NOT share this code with AI tools until resolved.
```

## Use Cases

1. **Before pasting code to ChatGPT/Claude** - Quick sanity check
2. **CI/CD pipeline** - Prevent committing secrets
3. **Code review** - Automated security check
4. **Onboarding** - Audit existing codebases

## Examples

### Example 1: Quick Scan Before AI Chat

**Scenario:** You want to paste your auth code to ChatGPT for help, but want to verify it's safe first.

```bash
$ ai-audit src/auth/

🔍 ai-audit v1.0.0
   Scanning: src/auth/

📋 Findings

  src/auth/config.ts
    🚨 JWT Secret (line 8)
       const JWT_SECRET = "super-secret-key-12345";

──────────────────────────────────────────────────

📊 Summary

   Files scanned: 3
   Total issues:  1

   🚨 High:   1

❌ FAIL: High severity issues found!

   ⚠️  Do NOT share this code with AI tools until resolved.
```

**Action:** Replace the hardcoded secret with an env var, then scan again:

```typescript
// Before
const JWT_SECRET = "super-secret-key-12345";

// After
const JWT_SECRET = process.env.JWT_SECRET || '';
```

```bash
$ ai-audit src/auth/

✅ PASS: No high severity issues found.
   Safe to share with AI tools.
```

---

### Example 2: Scanning a New Project

**Scenario:** You cloned a repo and want to audit it before working with AI assistants.

```bash
$ git clone https://github.com/example/project
$ cd project
$ ai-audit

🔍 ai-audit v1.0.0
   Scanning: /Users/you/project

📋 Findings

  .env.example
    ⚠️ Stripe Test Key (line 5)
       STRIPE_KEY=sk_test_51Hxxx...xxxQ (masked for security)

  src/db/connection.js
    🚨 Database Password (line 3)
       const dbUrl = "mongodb://admin:password123@localhost:27017";

  config/api-keys.json
    🚨 OpenAI API Key (line 2)
       "openai": "sk-proj-abc...xyz" (masked)

──────────────────────────────────────────────────

📊 Summary

   Files scanned: 124
   Total issues:  3

   🚨 High:   2
   ⚠️ Medium: 1

❌ FAIL: High severity issues found!
```

**What to do:**
1. `.env.example` with test key is probably okay (it's an example file)
2. `connection.js` - Move password to environment variable
3. `api-keys.json` - Should be in `.gitignore`, use env vars instead

---

### Example 3: CI/CD Pre-commit Hook

**Scenario:** Prevent developers from committing secrets to the repo.

**Setup `.git/hooks/pre-commit`:**

```bash
#!/bin/bash

echo "🔍 Running ai-audit on staged files..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

# Create temp directory with staged files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

for file in $STAGED_FILES; do
  mkdir -p "$TEMP_DIR/$(dirname $file)"
  git show ":$file" > "$TEMP_DIR/$file"
done

# Run ai-audit
if ! npx ai-audit "$TEMP_DIR" --quiet; then
  echo ""
  echo "❌ Commit blocked: Secrets detected!"
  echo "   Please remove sensitive data before committing."
  exit 1
fi

echo "✅ No secrets detected."
exit 0
```

**Usage:**

```bash
# Make hook executable
chmod +x .git/hooks/pre-commit

# Try to commit with a secret
echo 'const key = "sk-proj-xxxxxx";' > src/config.js
git add src/config.js
git commit -m "Add config"

🔍 Running ai-audit on staged files...

📋 Findings
  src/config.js
    🚨 OpenAI API Key (line 1)

❌ Commit blocked: Secrets detected!
   Please remove sensitive data before committing.
```

---

### Example 4: JSON Output for Automation

**Scenario:** Integrate ai-audit results into your custom security dashboard.

```bash
$ ai-audit --json > audit-report.json
```

**Output (`audit-report.json`):**

```json
{
  "version": "1.0.0",
  "scannedAt": "2026-02-06T12:30:00Z",
  "scannedPath": "/Users/you/myproject",
  "summary": {
    "filesScanned": 47,
    "totalIssues": 3,
    "high": 2,
    "medium": 1,
    "low": 0
  },
  "findings": [
    {
      "file": "src/config.js",
      "line": 5,
      "severity": "high",
      "type": "OpenAI API Key",
      "match": "sk-proj-abc...xyz",
      "context": "const OPENAI_KEY = \"sk-proj-abc...xyz\";"
    },
    {
      "file": ".env",
      "line": 2,
      "severity": "high",
      "type": "AWS Access Key",
      "match": "AKIA...EXAMPLE",
      "context": "AWS_ACCESS_KEY_ID=AKIA...EXAMPLE"
    },
    {
      "file": ".env",
      "line": 8,
      "severity": "medium",
      "type": "Stripe Test Key",
      "match": "sk_test_51H...xxx",
      "context": "STRIPE_KEY=sk_test_51H...xxx"
    }
  ],
  "exitCode": 1,
  "status": "FAIL"
}
```

**Use in a script:**

```bash
#!/bin/bash

# Run audit and parse results
REPORT=$(ai-audit --json)
HIGH_COUNT=$(echo "$REPORT" | jq '.summary.high')

if [ "$HIGH_COUNT" -gt 0 ]; then
  echo "🚨 $HIGH_COUNT high severity issues found!"
  
  # Send to Slack
  curl -X POST $SLACK_WEBHOOK \
    -H 'Content-Type: application/json' \
    -d "{\"text\": \"Security Alert: $HIGH_COUNT secrets detected in codebase!\"}"
  
  exit 1
fi

echo "✅ Security scan passed."
```

---

### Example 5: Scanning Only High Severity

**Scenario:** You're doing a quick review and only care about critical issues like API keys.

```bash
$ ai-audit --severity high

🔍 ai-audit v1.0.0
   Scanning: /Users/you/myproject
   Severity filter: high

📋 Findings

  src/services/openai.ts
    🚨 OpenAI API Key (line 12)

  .env.local
    🚨 Stripe Live Key (line 5)
    🚨 AWS Secret Access Key (line 7)

──────────────────────────────────────────────────

📊 Summary

   Files scanned: 47
   Total issues:  3 (filtered: high only)

   🚨 High:   3

❌ FAIL: High severity issues found!
```

**Why filter?**
- Emails and phone numbers (low severity) are often okay to share
- Focus on critical secrets first
- Faster scans when you just need the dangerous stuff

---

### Example 6: Verbose Mode for Context

**Scenario:** You found an issue but need to see surrounding code to understand it.

```bash
$ ai-audit -v src/payment.js

🔍 ai-audit v1.0.0
   Scanning: src/payment.js

📋 Findings

  src/payment.js (line 15-20)
    🚨 Stripe Secret Key

    12 | function processPayment(amount) {
    13 |   // TODO: Move to env var
    14 |   const stripe = require('stripe')(
    15 |     'sk_live_51H...xxxxx'  // (example, masked)
    16 |   );
    17 |
    18 |   return stripe.charges.create({
    19 |     amount: amount,
    20 |     currency: 'usd'

──────────────────────────────────────────────────

📊 Summary

   Files scanned: 1
   Total issues:  1

   🚨 High:   1

❌ FAIL: High severity issues found!
```

**Fix:**

```javascript
// Bad
const stripe = require('stripe')('sk_live_51H...xxxxx');  // hardcoded!

// Good
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

---

### Example 7: Ignoring False Positives

**Scenario:** Your test fixtures contain fake API keys that trigger warnings.

```bash
$ ai-audit --ignore "**/__tests__/**" --ignore "**/*.test.js"

🔍 ai-audit v1.0.0
   Scanning: /Users/you/myproject
   Ignoring: **/__tests__/**, **/*.test.js

✅ PASS: No high severity issues found.
   Safe to share with AI tools.
```

**Or use a config file (`.ai-audit.json`):**

```json
{
  "ignore": [
    "**/__tests__/**",
    "**/*.test.js",
    "**/__mocks__/**",
    "fixtures/**"
  ],
  "severity": "high"
}
```

Then just run:

```bash
$ ai-audit
```

---

### Example 8: List Detection Patterns

**Scenario:** You want to see what patterns ai-audit checks for.

```bash
$ ai-audit --list-patterns

🔍 ai-audit Detection Patterns

🚨 High Severity:
  - OpenAI API Keys (sk-proj-...)
  - Anthropic API Keys (sk-ant-...)
  - AWS Access Keys (AKIA...)
  - AWS Secret Keys (pattern match)
  - GitHub Personal Access Tokens (ghp_...)
  - Stripe Live Keys (sk_live_...)
  - Private Keys (-----BEGIN RSA PRIVATE KEY-----)
  - SSH Private Keys
  - Database Connection Strings with Passwords
  - JWT Tokens (eyJ...)
  - Credit Card Numbers (Luhn algorithm)
  - Social Security Numbers (XXX-XX-XXXX)

⚠️ Medium Severity:
  - Stripe Test Keys (sk_test_...)
  - Bearer Tokens (Authorization: Bearer ...)
  - Firebase URLs

ℹ️ Low Severity:
  - Email Addresses
  - Phone Numbers (various formats)
  - IPv4 Addresses

Total: 23 patterns
```

---

## Tips

- **Run before every AI chat**: Make it a habit
- **Integrate with git hooks**: Automatic protection
- **Use `--json` for CI/CD**: Parse results programmatically
- **Create `.ai-audit.json`**: Project-specific ignore rules
- **Educate your team**: Share this tool with teammates

## License

MIT
