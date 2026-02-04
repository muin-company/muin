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

## License

MIT
