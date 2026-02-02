/**
 * MUIN Guard - Popup Script
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  await loadAlerts();
  await loadSettings();
  setupEventListeners();
});

async function loadStats() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_STATS' });
    
    document.getElementById('totalConversations').textContent = 
      formatNumber(response?.totalConversations || 0);
    document.getElementById('risksDetected').textContent = 
      formatNumber(response?.risksDetected || 0);
    document.getElementById('alertCount').textContent = 
      formatNumber(response?.alertCount || 0);

    // 상태 업데이트
    updateStatus(response?.risksDetected || 0);
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

async function loadAlerts() {
  try {
    const data = await chrome.storage.local.get('muin_guard_alerts');
    const alerts = data.muin_guard_alerts || [];
    
    const alertList = document.getElementById('alertList');
    
    if (alerts.length === 0) {
      alertList.innerHTML = '<div class="empty-state">탐지된 위험이 없습니다</div>';
      return;
    }

    alertList.innerHTML = alerts.slice(0, 5).map(alert => {
      const riskLevel = getRiskLevel(alert.totalScore);
      const timeAgo = formatTimeAgo(alert.timestamp);
      const icon = riskLevel === 'high' ? '🔴' : riskLevel === 'medium' ? '🟠' : '🟡';
      const messages = alert.risks?.map(r => r.message).join(', ') || '위험 탐지';

      return `
        <div class="alert-item ${riskLevel}">
          <div class="alert-icon">${icon}</div>
          <div class="alert-content">
            <div class="alert-message">${escapeHtml(messages)}</div>
            <div class="alert-time">${alert.platform} · ${timeAgo}</div>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Failed to load alerts:', error);
  }
}

async function loadSettings() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    document.getElementById('enableToggle').checked = response?.enabled !== false;
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
}

function setupEventListeners() {
  // Enable toggle
  document.getElementById('enableToggle').addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    const data = await chrome.storage.local.get('muin_guard_settings');
    const settings = data.muin_guard_settings || {};
    settings.enabled = enabled;
    await chrome.storage.local.set({ muin_guard_settings: settings });
    
    updateStatusByEnabled(enabled);
  });

  // Dashboard button
  document.getElementById('openDashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html') });
  });

  // Settings button
  document.getElementById('openSettings').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html#settings') });
  });
}

function updateStatus(risksDetected) {
  const statusSection = document.getElementById('statusSection');
  
  if (risksDetected > 10) {
    statusSection.className = 'status danger';
    statusSection.innerHTML = `
      <div class="status-icon">⚠️</div>
      <div class="status-text">주의가 필요한 위험이 다수 탐지됨</div>
    `;
  } else if (risksDetected > 0) {
    statusSection.className = 'status warning';
    statusSection.innerHTML = `
      <div class="status-icon">⚡</div>
      <div class="status-text">일부 위험이 탐지되었습니다</div>
    `;
  } else {
    statusSection.className = 'status';
    statusSection.innerHTML = `
      <div class="status-icon">✅</div>
      <div class="status-text">AI 대화를 안전하게 모니터링 중</div>
    `;
  }
}

function updateStatusByEnabled(enabled) {
  const statusSection = document.getElementById('statusSection');
  
  if (!enabled) {
    statusSection.className = 'status';
    statusSection.innerHTML = `
      <div class="status-icon">⏸️</div>
      <div class="status-text">모니터링이 일시 중지됨</div>
    `;
  } else {
    statusSection.className = 'status';
    statusSection.innerHTML = `
      <div class="status-icon">✅</div>
      <div class="status-text">AI 대화를 안전하게 모니터링 중</div>
    `;
  }
}

function getRiskLevel(score) {
  if (score >= 4) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return '방금';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  return `${Math.floor(seconds / 86400)}일 전`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
