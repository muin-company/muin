/**
 * MUIN Guard - Claude Content Script
 * Claude 대화를 감지하고 위험을 분석합니다
 */

(function() {
  'use strict';

  const PLATFORM = 'claude';
  let isEnabled = true;
  let processedMessages = new Set();

  // 위험 패턴 (chatgpt.js와 동일)
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

  async function init() {
    console.log('[MUIN Guard] Claude 모니터링 시작');

    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    if (response?.platforms?.claude === false) {
      console.log('[MUIN Guard] Claude 모니터링 비활성화됨');
      isEnabled = false;
      return;
    }

    scanExistingMessages();
    observeNewMessages();
  }

  function scanExistingMessages() {
    // Claude의 메시지 컨테이너 선택자 (변경될 수 있음)
    const humanMessages = document.querySelectorAll('[data-testid="user-message"]');
    const assistantMessages = document.querySelectorAll('[data-testid="assistant-message"]');
    
    humanMessages.forEach(el => processMessage(el, 'user'));
    assistantMessages.forEach(el => processMessage(el, 'assistant'));
  }

  function observeNewMessages() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const userMsg = node.querySelector?.('[data-testid="user-message"]');
            const assistantMsg = node.querySelector?.('[data-testid="assistant-message"]');
            
            if (userMsg) processMessage(userMsg, 'user');
            if (assistantMsg) processMessage(assistantMsg, 'assistant');

            if (node.getAttribute?.('data-testid') === 'user-message') {
              processMessage(node, 'user');
            }
            if (node.getAttribute?.('data-testid') === 'assistant-message') {
              processMessage(node, 'assistant');
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

  async function processMessage(element, role) {
    if (!isEnabled) return;

    // 고유 ID 생성 (Claude는 data-message-id가 없을 수 있음)
    const content = element.textContent || '';
    const messageId = hashCode(content + role);
    
    if (processedMessages.has(messageId)) return;
    processedMessages.add(messageId);

    if (!content.trim()) return;

    const risks = detectRisks(content);
    const totalScore = risks.reduce((sum, r) => sum + r.risk.score * r.count, 0);

    await chrome.runtime.sendMessage({
      type: 'LOG_CONVERSATION',
      data: {
        platform: PLATFORM,
        role: role,
        content: content.substring(0, 500),
        risks: risks.length > 0 ? risks : undefined
      }
    });

    if (risks.length > 0) {
      await chrome.runtime.sendMessage({
        type: 'RISK_DETECTED',
        data: {
          platform: PLATFORM,
          risks,
          totalScore
        }
      });

      highlightRiskyMessage(element, totalScore);
    }
  }

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

  function highlightRiskyMessage(element, score) {
    const borderColor = score >= 4 ? '#ef4444' : 
                        score >= 2 ? '#f97316' : '#eab308';
    
    element.style.borderLeft = `4px solid ${borderColor}`;
    element.style.paddingLeft = '8px';

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

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
