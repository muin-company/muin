/**
 * MUIN Guard - Detector Unit Tests
 * Node.js에서 실행 가능한 테스트
 */

// 패턴 정의 (detector.js와 동일)
const PATTERNS = {
  personalInfo: {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /(\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})|(\+\d{1,3}[-.\s]?\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
  },
  sensitive: {
    apiKey: /(?:api[_-]?key|apikey|api[_-]?secret)["\s:=]+["']?([a-zA-Z0-9_-]{20,})["']?/gi,
    password: /(?:password|passwd|pwd)["\s:=]+["']?([^\s"']{4,})["']?/gi,
  },
  dangerous: {
    deleteAll: /rm\s+-rf\s+[\/~]/gi,
    drop: /DROP\s+(?:TABLE|DATABASE)/gi,
  }
};

// 테스트 케이스
const testCases = [
  // 이메일 탐지
  {
    name: '이메일 탐지',
    input: '내 이메일은 test@example.com 입니다',
    expected: { category: 'personalInfo', type: 'email', count: 1 }
  },
  {
    name: '다중 이메일 탐지',
    input: 'john@test.com과 jane@example.org로 보내주세요',
    expected: { category: 'personalInfo', type: 'email', count: 2 }
  },
  
  // 전화번호 탐지
  {
    name: '한국 전화번호 탐지',
    input: '연락처: 010-1234-5678',
    expected: { category: 'personalInfo', type: 'phone', count: 1 }
  },
  {
    name: '전화번호 (공백 구분)',
    input: '전화: 02 1234 5678',
    expected: { category: 'personalInfo', type: 'phone', count: 1 }
  },

  // 신용카드 탐지
  {
    name: '신용카드 번호 탐지',
    input: '카드번호: 1234-5678-9012-3456',
    expected: { category: 'personalInfo', type: 'creditCard', count: 1 }
  },
  {
    name: '신용카드 번호 (공백)',
    input: '결제: 1234 5678 9012 3456',
    expected: { category: 'personalInfo', type: 'creditCard', count: 1 }
  },

  // API 키 탐지
  {
    name: 'API 키 탐지',
    input: 'api_key = "sk-abc123def456ghi789jkl012mno345"',
    expected: { category: 'sensitive', type: 'apiKey', count: 1 }
  },
  {
    name: 'API 키 (다른 형식)',
    input: 'apiKey: AKIAIOSFODNN7EXAMPLE',
    expected: { category: 'sensitive', type: 'apiKey', count: 1 }
  },

  // 비밀번호 탐지
  {
    name: '비밀번호 탐지',
    input: 'password = "mysecretpassword123"',
    expected: { category: 'sensitive', type: 'password', count: 1 }
  },

  // 위험 명령어 탐지
  {
    name: 'rm -rf 탐지',
    input: '이 명령어 실행해: rm -rf /',
    expected: { category: 'dangerous', type: 'deleteAll', count: 1 }
  },
  {
    name: 'DROP TABLE 탐지',
    input: 'DROP TABLE users;',
    expected: { category: 'dangerous', type: 'drop', count: 1 }
  },

  // 안전한 텍스트
  {
    name: '안전한 텍스트',
    input: '안녕하세요, 오늘 날씨가 좋네요.',
    expected: null
  },
  {
    name: '코드 (안전)',
    input: 'const x = 10; console.log(x);',
    expected: null
  }
];

// 탐지 함수
function detectRisks(text) {
  const risks = [];

  for (const [type, pattern] of Object.entries(PATTERNS.personalInfo)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({ category: 'personalInfo', type, count: matches.length });
    }
  }

  for (const [type, pattern] of Object.entries(PATTERNS.sensitive)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({ category: 'sensitive', type, count: matches.length });
    }
  }

  for (const [type, pattern] of Object.entries(PATTERNS.dangerous)) {
    const matches = text.match(pattern);
    if (matches) {
      risks.push({ category: 'dangerous', type, count: matches.length });
    }
  }

  return risks;
}

// 테스트 실행
function runTests() {
  console.log('🧪 MUIN Guard Detector Tests\n');
  
  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const risks = detectRisks(tc.input);
    
    let success = false;
    
    if (tc.expected === null) {
      success = risks.length === 0;
    } else {
      const found = risks.find(r => 
        r.category === tc.expected.category && 
        r.type === tc.expected.type &&
        r.count === tc.expected.count
      );
      success = !!found;
    }

    if (success) {
      console.log(`✅ ${tc.name}`);
      passed++;
    } else {
      console.log(`❌ ${tc.name}`);
      console.log(`   Input: "${tc.input}"`);
      console.log(`   Expected:`, tc.expected);
      console.log(`   Got:`, risks);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  return failed === 0;
}

// 실행
const success = runTests();
process.exit(success ? 0 : 1);
