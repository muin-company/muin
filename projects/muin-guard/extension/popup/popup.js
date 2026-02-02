/**
 * MUIN Guard - Popup Script
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  await loadAlerts();
  await loadSettings();
  await loadLLMStatus();
  setupEventListeners();
  
  // LLM 상태 업데이트 리스너
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'LLM_PROGRESS') {
      updateLLMProgress(message.data);
    } else if (message.type === 'LLM_READY') {
      setLLMReady();
    } else if (message.type === 'LLM_ERROR') {
      setLLMError(message.data.error);
    }
  });
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

async function loadLLMStatus() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_LLM_STATUS' });
    if (response?.ready) {
      setLLMReady();
    }
  } catch (error) {
    console.error('Failed to load LLM status:', error);
  }
}

function updateLLMProgress(data) {
  const progressSection = document.getElementById('llmProgress');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const enableBtn = document.getElementById('enableLLM');
  const llmStatus = document.getElementById('llmStatus');

  progressSection.style.display = 'block';
  enableBtn.style.display = 'none';
  llmStatus.textContent = '로딩 중';
  llmStatus.className = 'llm-status loading';

  const percent = Math.round((data.progress || 0) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = data.text || '모델 로딩 중...';
}

function setLLMReady() {
  const progressSection = document.getElementById('llmProgress');
  const enableBtn = document.getElementById('enableLLM');
  const llmStatus = document.getElementById('llmStatus');

  progressSection.style.display = 'none';
  enableBtn.style.display = 'none';
  llmStatus.textContent = '활성';
  llmStatus.className = 'llm-status ready';
}

function setLLMError(error) {
  const progressSection = document.getElementById('llmProgress');
  const enableBtn = document.getElementById('enableLLM');
  const llmStatus = document.getElementById('llmStatus');
  const progressText = document.getElementById('progressText');

  enableBtn.style.display = 'block';
  enableBtn.textContent = '다시 시도';
  llmStatus.textContent = '오류';
  llmStatus.className = 'llm-status';
  
  if (progressSection.style.display !== 'none') {
    progressText.textContent = `오류: ${error}`;
    progressText.style.color = '#ef4444';
  }
}

function setupEventListeners() {
  // LLM Enable button
  document.getElementById('enableLLM').addEventListener('click', async () => {
    const btn = document.getElementById('enableLLM');
    btn.disabled = true;
    btn.textContent = '초기화 중...';
    
    try {
      await chrome.runtime.sendMessage({ type: 'INIT_LLM_FROM_POPUP' });
    } catch (error) {
      console.error('Failed to init LLM:', error);
      btn.disabled = false;
      btn.textContent = 'AI 분석 활성화';
    }
  });

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
