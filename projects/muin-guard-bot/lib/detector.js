/**
 * MUIN Guard - Sensitive Data Detector
 * Detects API keys, passwords, PII, and other sensitive information
 */

const PATTERNS = {
  // API Keys & Tokens
  aws_access_key: {
    pattern: /\b(AKIA[0-9A-Z]{16})\b/g,
    name: 'AWS Access Key',
    risk: 'CRITICAL',
    recommendation: 'Rotate this AWS key immediately via IAM console'
  },
  aws_secret_key: {
    pattern: /\b([A-Za-z0-9/+=]{40})\b/g,
    name: 'AWS Secret Key (possible)',
    risk: 'CRITICAL',
    recommendation: 'If this is an AWS secret, rotate immediately',
    validator: (match) => /^[A-Za-z0-9/+=]{40}$/.test(match) && !/\s/.test(match)
  },
  github_token: {
    pattern: /\b(gh[pousr]_[A-Za-z0-9_]{36,255})\b/g,
    name: 'GitHub Token',
    risk: 'CRITICAL',
    recommendation: 'Revoke this token at github.com/settings/tokens'
  },
  github_classic: {
    pattern: /\b(ghp_[A-Za-z0-9]{36})\b/g,
    name: 'GitHub Personal Access Token',
    risk: 'CRITICAL',
    recommendation: 'Revoke immediately at github.com/settings/tokens'
  },
  openai_key: {
    pattern: /\b(sk-[A-Za-z0-9]{20,}T3BlbkFJ[A-Za-z0-9]{20,})\b/g,
    name: 'OpenAI API Key',
    risk: 'CRITICAL',
    recommendation: 'Rotate at platform.openai.com/api-keys'
  },
  openai_key_new: {
    pattern: /\b(sk-proj-[A-Za-z0-9_-]{80,})\b/g,
    name: 'OpenAI API Key (new format)',
    risk: 'CRITICAL',
    recommendation: 'Rotate at platform.openai.com/api-keys'
  },
  anthropic_key: {
    pattern: /\b(sk-ant-[A-Za-z0-9_-]{80,})\b/g,
    name: 'Anthropic API Key',
    risk: 'CRITICAL',
    recommendation: 'Rotate at console.anthropic.com'
  },
  stripe_key: {
    pattern: /\b(sk_live_[A-Za-z0-9]{24,})\b/g,
    name: 'Stripe Secret Key',
    risk: 'CRITICAL',
    recommendation: 'Roll this key at dashboard.stripe.com/apikeys'
  },
  stripe_test: {
    pattern: /\b(sk_test_[A-Za-z0-9]{24,})\b/g,
    name: 'Stripe Test Key',
    risk: 'MEDIUM',
    recommendation: 'Test keys are lower risk but should still be protected'
  },
  slack_token: {
    pattern: /\b(xox[baprs]-[0-9]{10,13}-[0-9]{10,13}-[a-zA-Z0-9]{24})\b/g,
    name: 'Slack Token',
    risk: 'HIGH',
    recommendation: 'Revoke at api.slack.com/apps'
  },
  slack_webhook: {
    pattern: /https:\/\/hooks\.slack\.com\/services\/T[A-Z0-9]+\/B[A-Z0-9]+\/[a-zA-Z0-9]+/g,
    name: 'Slack Webhook URL',
    risk: 'MEDIUM',
    recommendation: 'Regenerate webhook if exposed'
  },
  discord_token: {
    pattern: /\b([MN][A-Za-z\d]{23,}\.[\w-]{6}\.[\w-]{27,})\b/g,
    name: 'Discord Bot Token',
    risk: 'CRITICAL',
    recommendation: 'Regenerate at discord.com/developers'
  },
  telegram_token: {
    pattern: /\b(\d{8,10}:[A-Za-z0-9_-]{35})\b/g,
    name: 'Telegram Bot Token',
    risk: 'CRITICAL',
    recommendation: 'Revoke via @BotFather on Telegram'
  },
  google_api: {
    pattern: /\b(AIza[0-9A-Za-z_-]{35})\b/g,
    name: 'Google API Key',
    risk: 'HIGH',
    recommendation: 'Restrict or rotate at console.cloud.google.com'
  },
  firebase: {
    pattern: /\b(AAAA[A-Za-z0-9_-]{7}:[A-Za-z0-9_-]{140})\b/g,
    name: 'Firebase Cloud Messaging Key',
    risk: 'HIGH',
    recommendation: 'Rotate in Firebase Console'
  },
  npm_token: {
    pattern: /\b(npm_[A-Za-z0-9]{36})\b/g,
    name: 'NPM Access Token',
    risk: 'HIGH',
    recommendation: 'Revoke at npmjs.com/settings/tokens'
  },
  heroku_api: {
    pattern: /\b([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\b/g,
    name: 'Heroku API Key (possible UUID)',
    risk: 'MEDIUM',
    recommendation: 'If Heroku key, regenerate at dashboard.heroku.com'
  },
  sendgrid: {
    pattern: /\b(SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43})\b/g,
    name: 'SendGrid API Key',
    risk: 'HIGH',
    recommendation: 'Revoke at app.sendgrid.com/settings/api_keys'
  },
  twilio: {
    pattern: /\b(SK[a-f0-9]{32})\b/g,
    name: 'Twilio API Key',
    risk: 'HIGH',
    recommendation: 'Revoke at twilio.com/console'
  },

  // Passwords & Secrets
  password_field: {
    pattern: /(?:password|passwd|pwd|secret|token|api_key|apikey|auth)[\s]*[:=][\s]*["']?([^\s"']{8,})["']?/gi,
    name: 'Password/Secret in Config',
    risk: 'HIGH',
    recommendation: 'Use environment variables instead of hardcoded secrets'
  },
  jwt_token: {
    pattern: /\b(eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*)\b/g,
    name: 'JWT Token',
    risk: 'HIGH',
    recommendation: 'JWTs may contain sensitive claims. Ensure it\'s not a long-lived token.'
  },
  private_key: {
    pattern: /-----BEGIN (RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g,
    name: 'Private Key',
    risk: 'CRITICAL',
    recommendation: 'NEVER share private keys. Generate new keypair immediately.'
  },
  
  // PII - Personal Identifiable Information
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    name: 'Email Address',
    risk: 'LOW',
    recommendation: 'Consider if this email needs to be shared'
  },
  phone_us: {
    pattern: /\b(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})\b/g,
    name: 'Phone Number (US format)',
    risk: 'MEDIUM',
    recommendation: 'Redact phone numbers before sharing'
  },
  phone_intl: {
    pattern: /\b(\+[1-9]\d{1,14})\b/g,
    name: 'Phone Number (International)',
    risk: 'MEDIUM',
    recommendation: 'Redact phone numbers before sharing'
  },
  ssn: {
    pattern: /\b(\d{3}-\d{2}-\d{4})\b/g,
    name: 'Social Security Number',
    risk: 'CRITICAL',
    recommendation: 'NEVER share SSN. This is extremely sensitive PII.'
  },
  credit_card: {
    pattern: /\b(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})\b/g,
    name: 'Credit Card Number',
    risk: 'CRITICAL',
    recommendation: 'Never share credit card numbers. Report if compromised.',
    validator: luhnCheck
  },
  ip_address: {
    pattern: /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g,
    name: 'IP Address',
    risk: 'LOW',
    recommendation: 'Consider if sharing IP addresses is necessary'
  },
  
  // Database & Connection Strings
  connection_string: {
    pattern: /(?:mongodb|postgres|mysql|redis|amqp):\/\/[^\s"']+/gi,
    name: 'Database Connection String',
    risk: 'CRITICAL',
    recommendation: 'Connection strings often contain credentials. Use env vars.'
  },
  
  // Cloud & Infrastructure
  aws_arn: {
    pattern: /arn:aws:[a-z0-9-]+:[a-z0-9-]*:\d{12}:[^\s"']+/g,
    name: 'AWS ARN',
    risk: 'LOW',
    recommendation: 'ARNs reveal infrastructure details. Share carefully.'
  }
};

// Luhn algorithm for credit card validation
function luhnCheck(num) {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Mask sensitive data for display
function maskSensitive(value) {
  if (value.length <= 8) return '*'.repeat(value.length);
  return value.slice(0, 4) + '*'.repeat(value.length - 8) + value.slice(-4);
}

/**
 * Analyze text for sensitive data
 * @param {string} text - Text to analyze
 * @returns {Object} Analysis results
 */
function analyze(text) {
  const findings = [];
  const riskCounts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  
  for (const [key, config] of Object.entries(PATTERNS)) {
    const matches = text.match(config.pattern) || [];
    
    for (const match of matches) {
      // Skip if validator exists and fails
      if (config.validator && !config.validator(match)) continue;
      
      // Skip common false positives
      if (isFalsePositive(key, match)) continue;
      
      findings.push({
        type: key,
        name: config.name,
        value: maskSensitive(match),
        risk: config.risk,
        recommendation: config.recommendation
      });
      
      riskCounts[config.risk]++;
    }
  }
  
  // Dedupe findings by value
  const uniqueFindings = findings.filter((finding, index, self) =>
    index === self.findIndex(f => f.value === finding.value && f.type === finding.type)
  );
  
  // Calculate overall risk
  let overallRisk = 'SAFE';
  if (riskCounts.CRITICAL > 0) overallRisk = 'CRITICAL';
  else if (riskCounts.HIGH > 0) overallRisk = 'HIGH';
  else if (riskCounts.MEDIUM > 0) overallRisk = 'MEDIUM';
  else if (riskCounts.LOW > 0) overallRisk = 'LOW';
  
  return {
    findings: uniqueFindings,
    summary: {
      total: uniqueFindings.length,
      byRisk: riskCounts,
      overallRisk
    }
  };
}

// Filter out common false positives
function isFalsePositive(type, value) {
  // Common false positives for IP addresses
  if (type === 'ip_address') {
    const octets = value.split('.').map(Number);
    // Filter out version numbers like 1.2.3.4
    if (octets.some(o => o > 255)) return true;
    // Filter out localhost
    if (value === '127.0.0.1' || value === '0.0.0.0') return true;
  }
  
  // UUID false positives for Heroku
  if (type === 'heroku_api') {
    // Only flag if in context of heroku/api
    return true; // Too many false positives, disable by default
  }
  
  return false;
}

/**
 * Format analysis results for Telegram
 * @param {Object} analysis - Analysis results from analyze()
 * @returns {string} Formatted message
 */
function formatForTelegram(analysis) {
  const { findings, summary } = analysis;
  
  const riskEmoji = {
    CRITICAL: '🔴',
    HIGH: '🟠',
    MEDIUM: '🟡',
    LOW: '🟢',
    SAFE: '✅'
  };
  
  let message = `${riskEmoji[summary.overallRisk]} **Risk Level: ${summary.overallRisk}**\n\n`;
  
  if (findings.length === 0) {
    message += '✅ No sensitive data detected!\n\n';
    message += '_Tip: This doesn\'t guarantee safety. Always review manually for context-specific secrets._';
    return message;
  }
  
  message += `📊 **Found ${summary.total} potential issue(s)**\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Group by risk level
  const byRisk = { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] };
  findings.forEach(f => byRisk[f.risk].push(f));
  
  for (const risk of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
    if (byRisk[risk].length === 0) continue;
    
    message += `${riskEmoji[risk]} **${risk}** (${byRisk[risk].length})\n`;
    
    for (const finding of byRisk[risk]) {
      message += `• ${finding.name}\n`;
      message += `  \`${finding.value}\`\n`;
      message += `  💡 ${finding.recommendation}\n\n`;
    }
  }
  
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛡️ _Powered by MUIN Guard_`;
  
  return message;
}

module.exports = {
  analyze,
  formatForTelegram,
  PATTERNS
};
