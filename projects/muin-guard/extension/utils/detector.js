/**
 * MUIN Guard - 위험 패턴 탐지기
 * 모든 분석은 로컬에서 수행됨
 */

const PATTERNS = {
  // 개인정보 패턴
  personalInfo: {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /(\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})|(\+\d{1,3}[-.\s]?\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    ssn: /\b\d{6}[-\s]?\d{7}\b/g, // 주민등록번호
    passport: /[A-Z]{1,2}\d{7,8}/g,
    ipv4Private: /\b(?:192\.168|10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/g,
  },

  // 민감 정보 패턴
  sensitive: {
    apiKey: /(?:api[_-]?key|apikey|api[_-]?secret)["\s:=]+["']?([a-zA-Z0-9_-]{20,})["']?/gi,
    password: /(?:password|passwd|pwd)["\s:=]+["']?([^\s"']{4,})["']?/gi,
    token: /(?:token|bearer|auth)["\s:=]+["']?([a-zA-Z0-9_.-]{20,})["']?/gi,
    privateKey: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/g,
    awsKey: /(?:AKIA|ABIA|ACCA|ASIA)[A-Z0-9]{16}/g,
    githubToken: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,}/g,
    openaiKey: /sk-[A-Za-z0-9]{32,}/g,
    anthropicKey: /sk-ant-[A-Za-z0-9_-]{32,}/g,
    stripeKey: /(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{24,}/g,
    slackToken: /xox[baprs]-[A-Za-z0-9-]{10,}/g,
    jwtToken: /eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*/g,
  },

  // 위험 명령어 패턴
  dangerous: {
    deleteAll: /rm\s+-rf\s+[\/~]/gi,
    format: /format\s+[a-zA-Z]:/gi,
    drop: /DROP\s+(?:TABLE|DATABASE)/gi,
    shutdown: /shutdown\s+(?:\/s|now|-h)/gi,
    curl: /curl\s+.*\|\s*(?:bash|sh)/gi,
    chmod777: /chmod\s+777/gi,
    sudoRm: /sudo\s+rm/gi,
    mkfsFormat: /mkfs\s+/gi,
    ddDisk: /dd\s+if=.*of=\/dev\//gi,
    evalCode: /eval\s*\([^)]+\)/gi,
  },

  // 의심스러운 URL 패턴
  suspiciousUrl: {
    shortener: /(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|shorturl\.at|is\.gd)\/[a-zA-Z0-9]+/gi,
    ipAddress: /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/gi,
    dataExfil: /https?:\/\/[^\/]+\/(?:upload|exfil|steal|grab|collect)/gi,
    base64Url: /https?:\/\/[^\s]*[A-Za-z0-9+\/=]{50,}/gi,
  },

  // 인젝션 패턴
  injection: {
    sqlInjection: /(?:UNION\s+SELECT|OR\s+1\s*=\s*1|'\s*OR\s*'|;\s*DROP|--\s*$)/gi,
    xss: /<script[^>]*>|javascript:|on\w+\s*=/gi,
    commandInjection: /;\s*(?:cat|ls|pwd|whoami|id|uname)\s/gi,
  }
};

const RISK_LEVELS = {
  LOW: { level: 'low', score: 1, label: '주의' },
  MEDIUM: { level: 'medium', score: 2, label: '경고' },
  HIGH: { level: 'high', score: 3, label: '위험' },
  CRITICAL: { level: 'critical', score: 4, label: '심각' }
};

/**
 * 텍스트에서 위험 패턴 탐지
 * @param {string} text - 분석할 텍스트
 * @returns {Array} 탐지된 위험 목록
 */
function detectRisks(text) {
  const risks = [];

  // 개인정보 탐지
  for (const [type, pattern] of Object.entries(PATTERNS.personalInfo)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({
        category: 'personalInfo',
        type,
        matches: matches.map(m => maskSensitive(m)),
        count: matches.length,
        risk: RISK_LEVELS.MEDIUM,
        message: `개인정보(${type}) ${matches.length}건 탐지`
      });
    }
  }

  // 민감 정보 탐지
  for (const [type, pattern] of Object.entries(PATTERNS.sensitive)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({
        category: 'sensitive',
        type,
        matches: ['[마스킹됨]'],
        count: matches.length,
        risk: RISK_LEVELS.HIGH,
        message: `민감정보(${type}) ${matches.length}건 탐지`
      });
    }
  }

  // 위험 명령어 탐지
  for (const [type, pattern] of Object.entries(PATTERNS.dangerous)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({
        category: 'dangerous',
        type,
        matches: matches,
        count: matches.length,
        risk: RISK_LEVELS.CRITICAL,
        message: `위험 명령어(${type}) 탐지`
      });
    }
  }

  // 의심스러운 URL 탐지
  for (const [type, pattern] of Object.entries(PATTERNS.suspiciousUrl)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({
        category: 'suspiciousUrl',
        type,
        matches: matches,
        count: matches.length,
        risk: RISK_LEVELS.LOW,
        message: `의심스러운 URL(${type}) ${matches.length}건 탐지`
      });
    }
  }

  return risks;
}

/**
 * 민감 정보 마스킹
 */
function maskSensitive(text) {
  if (text.length <= 4) return '****';
  return text.substring(0, 2) + '*'.repeat(text.length - 4) + text.substring(text.length - 2);
}

/**
 * 전체 위험 점수 계산
 */
function calculateRiskScore(risks) {
  return risks.reduce((sum, r) => sum + r.risk.score * r.count, 0);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { detectRisks, calculateRiskScore, RISK_LEVELS };
}
