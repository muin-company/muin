/**
 * MUIN Guard - Offscreen Document for WebGPU LLM
 * 
 * Offscreen Document는 WebGPU를 사용할 수 있는 숨겨진 페이지입니다.
 * Background Service Worker와 메시지로 통신합니다.
 */

// WebLLM은 CDN에서 동적 로드 (확장 패키지 크기 최소화)
let engine = null;
let isInitializing = false;
let isReady = false;

// 모델 설정
const MODEL_CONFIG = {
  // Llama Guard 3 1B - Safety 특화 모델
  safety: "Llama-Guard-3-1B-q4f16_1-MLC",
  // 대안: 더 작은 범용 모델
  fallback: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"
};

// Safety 분류 시스템 프롬프트
const SAFETY_SYSTEM_PROMPT = `You are a safety classifier for AI conversations.
Analyze the following text and classify potential risks.

Categories:
- SAFE: No issues detected
- PII: Personal Identifiable Information (email, phone, address, ID numbers)
- SECRETS: API keys, passwords, tokens, private keys
- DANGEROUS: Harmful commands, malware, exploitation
- INAPPROPRIATE: Offensive content, hate speech

Respond with JSON only:
{"category": "SAFE|PII|SECRETS|DANGEROUS|INAPPROPRIATE", "confidence": 0.0-1.0, "details": "brief explanation"}`;

/**
 * WebLLM 엔진 초기화
 */
async function initializeEngine() {
  if (isInitializing || isReady) return;
  isInitializing = true;

  try {
    // WebGPU 지원 확인
    if (!navigator.gpu) {
      throw new Error('WebGPU not supported');
    }

    console.log('[MUIN Guard LLM] WebLLM 로딩 중...');
    
    // WebLLM 동적 임포트 (CDN)
    const { CreateMLCEngine } = await import(
      'https://esm.run/@mlc-ai/web-llm'
    );

    // 진행률 콜백
    const initProgressCallback = (progress) => {
      console.log(`[MUIN Guard LLM] ${progress.text}`);
      chrome.runtime.sendMessage({
        type: 'LLM_PROGRESS',
        data: {
          progress: progress.progress,
          text: progress.text
        }
      });
    };

    // 엔진 생성 (Safety 모델 시도, 실패시 fallback)
    try {
      engine = await CreateMLCEngine(MODEL_CONFIG.safety, {
        initProgressCallback,
        logLevel: 'SILENT'
      });
      console.log('[MUIN Guard LLM] Llama Guard 3 로드 완료');
    } catch (e) {
      console.log('[MUIN Guard LLM] Safety 모델 실패, fallback 사용');
      engine = await CreateMLCEngine(MODEL_CONFIG.fallback, {
        initProgressCallback,
        logLevel: 'SILENT'
      });
    }

    isReady = true;
    isInitializing = false;

    // 준비 완료 알림
    chrome.runtime.sendMessage({
      type: 'LLM_READY',
      data: { ready: true }
    });

  } catch (error) {
    console.error('[MUIN Guard LLM] 초기화 실패:', error);
    isInitializing = false;
    
    chrome.runtime.sendMessage({
      type: 'LLM_ERROR',
      data: { error: error.message }
    });
  }
}

/**
 * 텍스트 안전성 분석
 */
async function analyzeText(text) {
  if (!isReady || !engine) {
    return {
      success: false,
      error: 'LLM not ready',
      fallback: true
    };
  }

  try {
    const response = await engine.chat.completions.create({
      messages: [
        { role: 'system', content: SAFETY_SYSTEM_PROMPT },
        { role: 'user', content: `Analyze this text:\n\n${text.substring(0, 1000)}` }
      ],
      max_tokens: 150,
      temperature: 0.1
    });

    const content = response.choices[0]?.message?.content || '';
    
    // JSON 파싱 시도
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          success: true,
          ...result
        };
      }
    } catch (e) {
      // JSON 파싱 실패 시 텍스트 분석
    }

    return {
      success: true,
      category: content.includes('SAFE') ? 'SAFE' : 'UNKNOWN',
      confidence: 0.5,
      details: content
    };

  } catch (error) {
    console.error('[MUIN Guard LLM] 분석 실패:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 메시지 리스너
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, data } = message;

  switch (type) {
    case 'INIT_LLM':
      initializeEngine().then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'ANALYZE_TEXT':
      analyzeText(data.text).then(result => {
        sendResponse(result);
      });
      return true;

    case 'GET_LLM_STATUS':
      sendResponse({
        ready: isReady,
        initializing: isInitializing
      });
      return true;

    default:
      return false;
  }
});

// WebGPU 가용 시 자동 초기화 옵션 (설정에 따라)
// initializeEngine();

console.log('[MUIN Guard LLM] Offscreen document loaded');
