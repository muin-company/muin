/**
 * Regex patterns for detecting sensitive data
 * Each pattern has: name, regex, severity (high/medium/low), description
 */

export const patterns = [
  // API Keys
  {
    name: 'OpenAI API Key',
    regex: /sk-[a-zA-Z0-9]{20,}T3BlbkFJ[a-zA-Z0-9]{20,}/g,
    severity: 'high',
    description: 'OpenAI API key detected'
  },
  {
    name: 'OpenAI Project Key',
    regex: /sk-proj-[a-zA-Z0-9_-]{80,}/g,
    severity: 'high',
    description: 'OpenAI project API key detected'
  },
  {
    name: 'AWS Access Key',
    regex: /AKIA[0-9A-Z]{16}/g,
    severity: 'high',
    description: 'AWS Access Key ID detected'
  },
  {
    name: 'AWS Secret Key',
    regex: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/g,
    severity: 'medium',
    description: 'Possible AWS Secret Access Key (40-char base64)'
  },
  {
    name: 'Google API Key',
    regex: /AIza[0-9A-Za-z_-]{35}/g,
    severity: 'high',
    description: 'Google API key detected'
  },
  {
    name: 'GitHub Token',
    regex: /gh[pousr]_[A-Za-z0-9_]{36,}/g,
    severity: 'high',
    description: 'GitHub personal access token detected'
  },
  {
    name: 'GitHub OAuth',
    regex: /gho_[A-Za-z0-9]{36,}/g,
    severity: 'high',
    description: 'GitHub OAuth token detected'
  },
  {
    name: 'Slack Token',
    regex: /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*/g,
    severity: 'high',
    description: 'Slack API token detected'
  },
  {
    name: 'Stripe API Key',
    regex: /sk_live_[0-9a-zA-Z]{24,}/g,
    severity: 'high',
    description: 'Stripe live API key detected'
  },
  {
    name: 'Stripe Test Key',
    regex: /sk_test_[0-9a-zA-Z]{24,}/g,
    severity: 'medium',
    description: 'Stripe test API key detected'
  },
  {
    name: 'Anthropic API Key',
    regex: /sk-ant-[a-zA-Z0-9_-]{80,}/g,
    severity: 'high',
    description: 'Anthropic API key detected'
  },
  {
    name: 'Discord Token',
    regex: /[MN][A-Za-z\d]{23,}\.[\w-]{6}\.[\w-]{27}/g,
    severity: 'high',
    description: 'Discord bot token detected'
  },
  {
    name: 'Telegram Bot Token',
    regex: /[0-9]{8,10}:[a-zA-Z0-9_-]{35}/g,
    severity: 'high',
    description: 'Telegram bot token detected'
  },
  {
    name: 'Twilio API Key',
    regex: /SK[a-f0-9]{32}/g,
    severity: 'high',
    description: 'Twilio API key detected'
  },
  {
    name: 'SendGrid API Key',
    regex: /SG\.[a-zA-Z0-9_-]{22}\.[a-zA-Z0-9_-]{43}/g,
    severity: 'high',
    description: 'SendGrid API key detected'
  },
  {
    name: 'Mailgun API Key',
    regex: /key-[a-zA-Z0-9]{32}/g,
    severity: 'high',
    description: 'Mailgun API key detected'
  },

  // Private Keys
  {
    name: 'RSA Private Key',
    regex: /-----BEGIN RSA PRIVATE KEY-----/g,
    severity: 'high',
    description: 'RSA private key detected'
  },
  {
    name: 'OpenSSH Private Key',
    regex: /-----BEGIN OPENSSH PRIVATE KEY-----/g,
    severity: 'high',
    description: 'OpenSSH private key detected'
  },
  {
    name: 'PGP Private Key',
    regex: /-----BEGIN PGP PRIVATE KEY BLOCK-----/g,
    severity: 'high',
    description: 'PGP private key detected'
  },
  {
    name: 'EC Private Key',
    regex: /-----BEGIN EC PRIVATE KEY-----/g,
    severity: 'high',
    description: 'EC private key detected'
  },
  {
    name: 'DSA Private Key',
    regex: /-----BEGIN DSA PRIVATE KEY-----/g,
    severity: 'high',
    description: 'DSA private key detected'
  },

  // Passwords & Secrets
  {
    name: 'Password Assignment',
    regex: /(?:password|passwd|pwd|secret|token)\s*[=:]\s*['"][^'"]{8,}['"]/gi,
    severity: 'high',
    description: 'Hardcoded password or secret detected'
  },
  {
    name: 'Database Connection String',
    regex: /(?:mongodb|postgres|mysql|redis|amqp):\/\/[^\s'"]+:[^\s'"]+@[^\s'"]+/gi,
    severity: 'high',
    description: 'Database connection string with credentials'
  },
  {
    name: 'Generic API Key Pattern',
    regex: /(?:api[_-]?key|apikey|api[_-]?secret)\s*[=:]\s*['"][a-zA-Z0-9_-]{20,}['"]/gi,
    severity: 'high',
    description: 'Generic API key assignment detected'
  },
  {
    name: 'Bearer Token',
    regex: /Bearer\s+[a-zA-Z0-9_-]{20,}/g,
    severity: 'medium',
    description: 'Bearer token detected'
  },
  {
    name: 'Basic Auth',
    regex: /Basic\s+[A-Za-z0-9+/=]{20,}/g,
    severity: 'medium',
    description: 'Basic authentication header detected'
  },

  // JWT Tokens
  {
    name: 'JWT Token',
    regex: /eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g,
    severity: 'high',
    description: 'JSON Web Token detected'
  },

  // PII - Personal Identifiable Information
  {
    name: 'Email Address',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    severity: 'low',
    description: 'Email address detected'
  },
  {
    name: 'Credit Card (Visa)',
    regex: /\b4[0-9]{3}[- ]?[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}\b/g,
    severity: 'high',
    description: 'Visa credit card number detected'
  },
  {
    name: 'Credit Card (Mastercard)',
    regex: /\b5[1-5][0-9]{2}[- ]?[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}\b/g,
    severity: 'high',
    description: 'Mastercard credit card number detected'
  },
  {
    name: 'Credit Card (Amex)',
    regex: /\b3[47][0-9]{2}[- ]?[0-9]{6}[- ]?[0-9]{5}\b/g,
    severity: 'high',
    description: 'American Express card number detected'
  },
  {
    name: 'SSN (US)',
    regex: /\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/g,
    severity: 'high',
    description: 'US Social Security Number detected'
  },
  {
    name: 'Phone Number',
    regex: /(?:\+?1[-.]?)?\(?[0-9]{3}\)?[-.]?[0-9]{3}[-.]?[0-9]{4}/g,
    severity: 'low',
    description: 'Phone number detected'
  },
  {
    name: 'IP Address',
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    severity: 'low',
    description: 'IP address detected'
  },

  // Cloud & Infrastructure
  {
    name: 'Heroku API Key',
    regex: /[h|H]eroku.*[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/gi,
    severity: 'high',
    description: 'Heroku API key detected'
  },
  {
    name: 'Azure Storage Key',
    regex: /DefaultEndpointsProtocol=https;AccountName=[^;]+;AccountKey=[^;]+/g,
    severity: 'high',
    description: 'Azure storage connection string detected'
  },
  {
    name: 'Firebase URL',
    regex: /https:\/\/[a-z0-9-]+\.firebaseio\.com/g,
    severity: 'medium',
    description: 'Firebase database URL detected'
  },

  // Crypto
  {
    name: 'Bitcoin Private Key',
    regex: /5[HJK][1-9A-HJ-NP-Za-km-z]{49}/g,
    severity: 'high',
    description: 'Bitcoin private key (WIF) detected'
  },
  {
    name: 'Ethereum Private Key',
    regex: /0x[a-fA-F0-9]{64}/g,
    severity: 'high',
    description: 'Possible Ethereum private key detected'
  }
];

// Files to always skip
export const skipPatterns = [
  '**/node_modules/**',
  '**/.git/**',
  '**/dist/**',
  '**/build/**',
  '**/*.min.js',
  '**/*.min.css',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/*.png',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.gif',
  '**/*.ico',
  '**/*.woff',
  '**/*.woff2',
  '**/*.ttf',
  '**/*.eot',
  '**/*.mp4',
  '**/*.mp3',
  '**/*.zip',
  '**/*.tar',
  '**/*.gz'
];

// Default file extensions to scan
export const defaultExtensions = [
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.json', '.yaml', '.yml', '.toml',
  '.env', '.env.*',
  '.py', '.rb', '.php', '.go', '.rs', '.java', '.kt', '.scala',
  '.sh', '.bash', '.zsh',
  '.sql',
  '.conf', '.config', '.cfg', '.ini',
  '.xml', '.plist',
  '.md', '.txt'
];
