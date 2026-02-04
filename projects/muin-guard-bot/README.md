# 🛡️ MUIN Guard Bot

A Telegram bot that instantly detects sensitive data in any text you paste.

**Bot:** [@MUINGuardBot](https://t.me/MUINGuardBot)

## Features

- **Instant Analysis** - Just paste text, get results
- **Comprehensive Detection** - API keys, passwords, PII, and more
- **Risk Levels** - CRITICAL / HIGH / MEDIUM / LOW
- **Actionable Recommendations** - Know exactly what to do

### What It Detects

| Category | Examples | Risk |
|----------|----------|------|
| **API Keys** | AWS, OpenAI, Anthropic, GitHub, Stripe, Google, Slack, Discord, Telegram | 🔴 CRITICAL |
| **Secrets** | Passwords in config, private keys, JWT tokens | 🔴 CRITICAL |
| **PII** | SSN, Credit cards | 🔴 CRITICAL |
| **Tokens** | NPM, SendGrid, Twilio | 🟠 HIGH |
| **Contact Info** | Phone numbers | 🟡 MEDIUM |
| **Identifiers** | Emails, IP addresses | 🟢 LOW |

## Quick Start

### 1. Get a Bot Token

1. Open Telegram and find [@BotFather](https://t.me/BotFather)
2. Send `/newbot`
3. Follow the prompts to name your bot
4. Copy the token BotFather gives you

### 2. Setup

```bash
# Clone or navigate to the project
cd muin-guard-bot

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your bot token
nano .env
```

### 3. Run

```bash
# Start the bot
npm start

# Or for development (auto-reload)
npm run dev
```

## Usage

### Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message and instructions |
| `/check <text>` | Check specific text for sensitive data |
| `/help` | Show help and supported detections |

### Direct Message

Just paste any text directly to the bot - no command needed!

## Example

**Input:**
```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
password: SuperSecret123!
Contact: john@example.com
```

**Output:**
```
🔴 Risk Level: CRITICAL

📊 Found 3 potential issue(s)
━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL (1)
• AWS Access Key
  `AKIA****MPLE`
  💡 Rotate this AWS key immediately via IAM console

🟠 HIGH (1)
• Password/Secret in Config
  `Supe****123!`
  💡 Use environment variables instead of hardcoded secrets

🟢 LOW (1)
• Email Address
  `john****e.com`
  💡 Consider if this email needs to be shared
```

## Deployment

### PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start bot.js --name muin-guard-bot

# Auto-start on reboot
pm2 startup
pm2 save
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "bot.js"]
```

```bash
docker build -t muin-guard-bot .
docker run -d --env-file .env muin-guard-bot
```

### Systemd

```ini
[Unit]
Description=MUIN Guard Bot
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/muin-guard-bot
ExecStart=/usr/bin/node bot.js
Restart=on-failure
EnvironmentFile=/path/to/muin-guard-bot/.env

[Install]
WantedBy=multi-user.target
```

## Privacy

- **No data storage** - Text is analyzed in real-time and immediately discarded
- **No logging** - We don't log the content you send
- **Local processing** - All detection happens on the server running the bot

## Development

### Add New Patterns

Edit `lib/detector.js` and add to the `PATTERNS` object:

```javascript
your_pattern: {
  pattern: /your-regex-here/g,
  name: 'Human Readable Name',
  risk: 'CRITICAL', // CRITICAL, HIGH, MEDIUM, or LOW
  recommendation: 'What the user should do'
}
```

### Test

```bash
# Run the bot in dev mode
npm run dev

# Send test messages to your bot
```

## License

MIT

---

🚀 **Powered by [MUIN](https://muin.ai)**
