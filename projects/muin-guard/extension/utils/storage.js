/**
 * MUIN Guard - 로컬 스토리지 관리
 * 모든 데이터는 브라우저 로컬에만 저장됨
 */

const STORAGE_KEYS = {
  CONVERSATIONS: 'muin_guard_conversations',
  ALERTS: 'muin_guard_alerts',
  SETTINGS: 'muin_guard_settings',
  STATS: 'muin_guard_stats'
};

const DEFAULT_SETTINGS = {
  enabled: true,
  notifications: true,
  logLevel: 'all', // 'all', 'risks-only', 'none'
  retentionDays: 30,
  platforms: {
    chatgpt: true,
    claude: true,
    gemini: true
  }
};

/**
 * 대화 저장
 */
async function saveConversation(conversation) {
  const data = await chrome.storage.local.get(STORAGE_KEYS.CONVERSATIONS);
  const conversations = data[STORAGE_KEYS.CONVERSATIONS] || [];
  
  conversations.push({
    ...conversation,
    id: generateId(),
    timestamp: Date.now()
  });

  // 오래된 대화 정리
  const settings = await getSettings();
  const cutoff = Date.now() - (settings.retentionDays * 24 * 60 * 60 * 1000);
  const filtered = conversations.filter(c => c.timestamp > cutoff);

  await chrome.storage.local.set({ [STORAGE_KEYS.CONVERSATIONS]: filtered });
  return filtered.length;
}

/**
 * 알림 저장
 */
async function saveAlert(alert) {
  const data = await chrome.storage.local.get(STORAGE_KEYS.ALERTS);
  const alerts = data[STORAGE_KEYS.ALERTS] || [];
  
  alerts.unshift({
    ...alert,
    id: generateId(),
    timestamp: Date.now(),
    read: false
  });

  // 최근 100개만 유지
  const trimmed = alerts.slice(0, 100);
  
  await chrome.storage.local.set({ [STORAGE_KEYS.ALERTS]: trimmed });
  await updateStats('alertCount', 1);
  
  return trimmed[0];
}

/**
 * 대화 목록 조회
 */
async function getConversations(options = {}) {
  const { platform, limit = 50, offset = 0 } = options;
  const data = await chrome.storage.local.get(STORAGE_KEYS.CONVERSATIONS);
  let conversations = data[STORAGE_KEYS.CONVERSATIONS] || [];

  if (platform) {
    conversations = conversations.filter(c => c.platform === platform);
  }

  // 최신순 정렬
  conversations.sort((a, b) => b.timestamp - a.timestamp);

  return conversations.slice(offset, offset + limit);
}

/**
 * 알림 목록 조회
 */
async function getAlerts(options = {}) {
  const { unreadOnly = false, limit = 20 } = options;
  const data = await chrome.storage.local.get(STORAGE_KEYS.ALERTS);
  let alerts = data[STORAGE_KEYS.ALERTS] || [];

  if (unreadOnly) {
    alerts = alerts.filter(a => !a.read);
  }

  return alerts.slice(0, limit);
}

/**
 * 설정 조회
 */
async function getSettings() {
  const data = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
  return { ...DEFAULT_SETTINGS, ...data[STORAGE_KEYS.SETTINGS] };
}

/**
 * 설정 저장
 */
async function saveSettings(settings) {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: updated });
  return updated;
}

/**
 * 통계 업데이트
 */
async function updateStats(key, increment = 1) {
  const data = await chrome.storage.local.get(STORAGE_KEYS.STATS);
  const stats = data[STORAGE_KEYS.STATS] || {
    totalConversations: 0,
    alertCount: 0,
    risksDetected: 0,
    lastActivity: null
  };

  stats[key] = (stats[key] || 0) + increment;
  stats.lastActivity = Date.now();

  await chrome.storage.local.set({ [STORAGE_KEYS.STATS]: stats });
  return stats;
}

/**
 * 통계 조회
 */
async function getStats() {
  const data = await chrome.storage.local.get(STORAGE_KEYS.STATS);
  return data[STORAGE_KEYS.STATS] || {
    totalConversations: 0,
    alertCount: 0,
    risksDetected: 0,
    lastActivity: null
  };
}

/**
 * 모든 데이터 삭제
 */
async function clearAllData() {
  await chrome.storage.local.clear();
  return true;
}

/**
 * ID 생성
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    saveConversation, saveAlert, getConversations, getAlerts,
    getSettings, saveSettings, getStats, updateStats, clearAllData
  };
}
