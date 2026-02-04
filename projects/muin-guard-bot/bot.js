/**
 * MUIN Guard Bot - Telegram Bot for Sensitive Data Detection
 * 
 * Paste any text and get instant analysis for:
 * - API keys & tokens
 * - Passwords & secrets
 * - PII (emails, phone numbers, SSN, credit cards)
 * - Database connection strings
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { analyze, formatForTelegram } = require('./lib/detector');

// Validate environment
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN is required!');
  console.error('   Get one from @BotFather on Telegram');
  process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

console.log('🛡️  MUIN Guard Bot starting...');

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
🛡️ **Welcome to MUIN Guard Bot!**

I help you detect sensitive data in text before you accidentally share it.

**What I detect:**
• 🔑 API Keys (AWS, OpenAI, GitHub, Stripe, etc.)
• 🔐 Passwords & secrets in config files
• 👤 PII (emails, phone numbers, SSN, credit cards)
• 🗄️ Database connection strings
• 🎫 JWT tokens & private keys

**How to use:**
1️⃣ Just paste any text directly
2️⃣ Or use \`/check <text>\` command

**Example:**
Paste your code, config files, or any text and I'll analyze it instantly!

_Your data is not stored. Analysis happens in real-time._

━━━━━━━━━━━━━━━━━━━━
🚀 Powered by MUIN | muin.ai
`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// /check command
bot.onText(/\/check(.+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1]?.trim();
  
  if (!text) {
    bot.sendMessage(chatId, '⚠️ Please provide text to check.\n\nUsage: `/check <your text here>`', { 
      parse_mode: 'Markdown' 
    });
    return;
  }
  
  processText(chatId, text, msg.message_id);
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
🛡️ **MUIN Guard Bot - Help**

**Commands:**
• \`/start\` - Welcome message
• \`/check <text>\` - Check text for sensitive data
• \`/help\` - This help message

**Direct Message:**
Just paste any text directly (no command needed) and I'll analyze it!

**What I look for:**
━━━━━━━━━━━━━━━━━━━━
🔴 **CRITICAL**
• AWS keys, OpenAI/Anthropic keys
• Private keys, SSN, credit cards
• Database connection strings

🟠 **HIGH**
• GitHub tokens, Slack tokens
• Google API keys, JWTs
• Passwords in config files

🟡 **MEDIUM**
• Stripe test keys, webhooks
• Phone numbers

🟢 **LOW**
• Email addresses, IP addresses
━━━━━━━━━━━━━━━━━━━━

_Your data is analyzed in real-time and not stored._
`;

  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// Handle direct messages (any text without command)
bot.on('message', (msg) => {
  // Skip commands
  if (msg.text?.startsWith('/')) return;
  
  // Skip non-text messages
  if (!msg.text) return;
  
  const chatId = msg.chat.id;
  processText(chatId, msg.text, msg.message_id);
});

// Process and analyze text
function processText(chatId, text, replyToId) {
  // Minimum text length check
  if (text.length < 5) {
    bot.sendMessage(chatId, '⚠️ Text too short to analyze. Please provide more content.', {
      reply_to_message_id: replyToId
    });
    return;
  }
  
  // Show typing indicator for longer texts
  bot.sendChatAction(chatId, 'typing');
  
  try {
    const analysis = analyze(text);
    const response = formatForTelegram(analysis);
    
    bot.sendMessage(chatId, response, {
      parse_mode: 'Markdown',
      reply_to_message_id: replyToId
    });
  } catch (error) {
    console.error('Analysis error:', error);
    bot.sendMessage(chatId, '❌ Error analyzing text. Please try again.', {
      reply_to_message_id: replyToId
    });
  }
}

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down MUIN Guard Bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down MUIN Guard Bot...');
  bot.stopPolling();
  process.exit(0);
});

console.log('✅ MUIN Guard Bot is running!');
console.log('   Send /start to the bot to begin.');
