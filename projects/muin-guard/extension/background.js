/**
 * MUIN Guard - Background Service Worker
 */

// 설치 시 초기화
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('[MUIN Guard] 설치 완료');
    
    // 기본 설정 초기화
    await chrome.storage.local.set({
      muin_guard_settings: {
        enabled: true,
        notifications: true,
        logLevel: 'all',
        retentionDays: 30,
        platforms: {
          chatgpt: true,
          claude: true,
          gemini: true
        }
      },
      muin_guard_stats: {
        totalConversations: 0,
        alertCount: 0,
        risksDetected: 0,
        lastActivity: Date.now()
      }
    });
  }
});

// Content Script에서 메시지 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender).then(sendResponse);
  return true; // 비동기 응답을 위해 true 반환
});

async function handleMessage(message, sender) {
  const { type, data } = message;

  switch (type) {
    case 'LOG_CONVERSATION':
      return await logConversation(data, sender.tab);

    case 'RISK_DETECTED':
      return await handleRiskDetected(data, sender.tab);

    case 'GET_SETTINGS':
      return await getSettings();

    case 'GET_STATS':
      return await getStats();

    default:
      console.warn('[MUIN Guard] Unknown message type:', type);
      return { success: false, error: 'Unknown message type' };
  }
}

async function logConversation(data, tab) {
  try {
    const storageData = await chrome.storage.local.get('muin_guard_conversations');
    const conversations = storageData.muin_guard_conversations || [];

    conversations.push({
      id: generateId(),
      platform: data.platform,
      role: data.role,
      content: data.content,
      risks: data.risks || [],
      url: tab?.url,
      timestamp: Date.now()
    });

    // 최근 1000개만 유지
    const trimmed = conversations.slice(-1000);
    await chrome.storage.local.set({ muin_guard_conversations: trimmed });

    // 통계 업데이트
    await updateStats('totalConversations');

    return { success: true, count: trimmed.length };
  } catch (error) {
    console.error('[MUIN Guard] Error logging conversation:', error);
    return { success: false, error: error.message };
  }
}

async function handleRiskDetected(data, tab) {
  try {
    const settings = await getSettings();
    
    // 알림 저장
    const storageData = await chrome.storage.local.get('muin_guard_alerts');
    const alerts = storageData.muin_guard_alerts || [];

    const alert = {
      id: generateId(),
      platform: data.platform,
      risks: data.risks,
      totalScore: data.totalScore,
      url: tab?.url,
      timestamp: Date.now(),
      read: false
    };

    alerts.unshift(alert);
    const trimmed = alerts.slice(0, 100);
    await chrome.storage.local.set({ muin_guard_alerts: trimmed });

    // 통계 업데이트
    await updateStats('alertCount');
    await updateStats('risksDetected', data.risks.length);

    // 데스크톱 알림
    if (settings.notifications && data.totalScore >= 2) {
      const riskLevel = data.totalScore >= 4 ? '🔴 심각' : 
                        data.totalScore >= 2 ? '🟠 경고' : '🟡 주의';
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: `MUIN Guard ${riskLevel}`,
        message: data.risks.map(r => r.message).join('\n'),
        priority: data.totalScore >= 4 ? 2 : 1
      });
    }

    return { success: true, alert };
  } catch (error) {
    console.error('[MUIN Guard] Error handling risk:', error);
    return { success: false, error: error.message };
  }
}

async function getSettings() {
  const data = await chrome.storage.local.get('muin_guard_settings');
  return data.muin_guard_settings || {};
}

async function getStats() {
  const data = await chrome.storage.local.get('muin_guard_stats');
  return data.muin_guard_stats || {};
}

async function updateStats(key, increment = 1) {
  const stats = await getStats();
  stats[key] = (stats[key] || 0) + increment;
  stats.lastActivity = Date.now();
  await chrome.storage.local.set({ muin_guard_stats: stats });
  return stats;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log('[MUIN Guard] Background service worker started');
