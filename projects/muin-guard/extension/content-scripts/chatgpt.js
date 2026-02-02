/**
 * MUIN Guard - ChatGPT Content Script
 * ChatGPT 대화를 감지하고 위험을 분석합니다
 */

(function() {
  'use strict';

  const PLATFORM = 'chatgpt';
  let isEnabled = true;
  let processedMessages = new Set();

  // 위험 패턴 (detector.js와 동일)
  const PATTERNS = {
    personalInfo: {
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phone: /(\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})|(\+\d{1,3}[-.\s]?\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4})/g,
      creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    },
    sensitive: {
      apiKey: /(?:api[_-]?key|apikey)["\s:=]+["']?([a-zA-Z0-9_-]{20,})["']?/gi,
      password: /(?:password|passwd|pwd)["\s:=]+["']?([^\s"']{4,})["']?/gi,
    },
    dangerous: {
      deleteAll: /rm\s+-rf\s+[\/~]/gi,
      drop: /DROP\s+(?:TABLE|DATABASE)/gi,
    }
  };

  const RISK_LEVELS = {
    LOW: { level: 'low', score: 1 },
    MEDIUM: { level: 'medium', score: 2 },
    HIGH: { level: 'high', score: 3 },
    CRITICAL: { level: 'critical', score: 4 }
  };

  // 초기화
  async function init() {
    console.log('[MUIN Guard] ChatGPT 모니터링 시작');

    // 설정 확인
    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    if (response?.platforms?.chatgpt === false) {
      console.log('[MUIN Guard] ChatGPT 모니터링 비활성화됨');
      isEnabled = false;
      return;
    }

    // 기존 메시지 스캔
    scanExistingMessages();

    // DOM 변화 감지
    observeNewMessages();
  }

  // 기존 메시지 스캔
  function scanExistingMessages() {
    const messages = document.querySelectorAll('[data-message-author-role]');
    messages.forEach(processMessage);
  }

  // 새 메시지 감지
  function observeNewMessages() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 메시지 요소 찾기
            const messages = node.querySelectorAll?.('[data-message-author-role]') || [];
            messages.forEach(processMessage);
            
            // 자체가 메시지인 경우
            if (node.getAttribute?.('data-message-author-role')) {
              processMessage(node);
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 메시지 처리
  async function processMessage(element) {
    if (!isEnabled) return;

    const messageId = element.getAttribute('data-message-id');
    if (!messageId || processedMessages.has(messageId)) return;
    
    processedMessages.add(messageId);

    const role = element.getAttribute('data-message-author-role');
    const contentElement = element.querySelector('.markdown, .whitespace-pre-wrap');
    const content = contentElement?.textContent || '';

    if (!content.trim()) return;

    // 위험 분석
    const risks = detectRisks(content);
    const totalScore = risks.reduce((sum, r) => sum + r.risk.score * r.count, 0);

    // 대화 로깅
    await chrome.runtime.sendMessage({
      type: 'LOG_CONVERSATION',
      data: {
        platform: PLATFORM,
        role: role,
        content: content.substring(0, 500), // 처음 500자만
        risks: risks.length > 0 ? risks : undefined
      }
    });

    // 위험 탐지 시 알림
    if (risks.length > 0) {
      await chrome.runtime.sendMessage({
        type: 'RISK_DETECTED',
        data: {
          platform: PLATFORM,
          risks,
          totalScore
        }
      });

      // 시각적 표시
      highlightRiskyMessage(element, totalScore);
    }
  }

  // 위험 패턴 탐지
  function detectRisks(text) {
    const risks = [];

    for (const [type, pattern] of Object.entries(PATTERNS.personalInfo)) {
      const matches = text.match(pattern);
      if (matches) {
        risks.push({
          category: 'personalInfo',
          type,
          count: matches.length,
          risk: RISK_LEVELS.MEDIUM,
          message: `개인정보(${type}) ${matches.length}건 탐지`
        });
      }
    }

    for (const [type, pattern] of Object.entries(PATTERNS.sensitive)) {
      const matches = text.match(pattern);
      if (matches) {
        risks.push({
          category: 'sensitive',
          type,
          count: matches.length,
          risk: RISK_LEVELS.HIGH,
          message: `민감정보(${type}) ${matches.length}건 탐지`
        });
      }
    }

    for (const [type, pattern] of Object.entries(PATTERNS.dangerous)) {
      const matches = text.match(pattern);
      if (matches) {
        risks.push({
          category: 'dangerous',
          type,
          count: matches.length,
          risk: RISK_LEVELS.CRITICAL,
          message: `위험 명령어(${type}) 탐지`
        });
      }
    }

    return risks;
  }

  // 위험 메시지 하이라이트
  function highlightRiskyMessage(element, score) {
    const borderColor = score >= 4 ? '#ef4444' : 
                        score >= 2 ? '#f97316' : '#eab308';
    
    element.style.borderLeft = `4px solid ${borderColor}`;
    element.style.paddingLeft = '8px';
    element.style.marginLeft = '-12px';

    // 배지 추가
    const badge = document.createElement('div');
    badge.textContent = '🛡️ MUIN Guard 위험 탐지';
    badge.style.cssText = `
      font-size: 11px;
      color: ${borderColor};
      margin-top: 4px;
      font-weight: 500;
    `;
    
    const existing = element.querySelector('.muin-guard-badge');
    if (!existing) {
      badge.className = 'muin-guard-badge';
      element.appendChild(badge);
    }
  }

  // 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
