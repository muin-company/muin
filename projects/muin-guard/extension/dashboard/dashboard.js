/**
 * MUIN Guard - Dashboard
 */

document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  await loadStats();
  await loadAlerts();
  await loadConversations();
  await loadSettings();
});

// Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');

  // Check URL hash
  const hash = window.location.hash.slice(1);
  if (hash) {
    navigateToPage(hash);
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageId = item.dataset.page;
      navigateToPage(pageId);
    });
  });
}

function navigateToPage(pageId) {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');

  navItems.forEach(nav => {
    nav.classList.toggle('active', nav.dataset.page === pageId);
  });

  pages.forEach(page => {
    page.classList.toggle('active', page.id === `page-${pageId}`);
  });

  window.location.hash = pageId;
}

// Load Stats
async function loadStats() {
  try {
    const data = await chrome.storage.local.get([
      'muin_guard_stats',
      'muin_guard_conversations',
      'muin_guard_alerts'
    ]);

    const stats = data.muin_guard_stats || {};
    const conversations = data.muin_guard_conversations || [];
    const alerts = data.muin_guard_alerts || [];

    document.getElementById('stat-conversations').textContent = 
      formatNumber(conversations.length);
    document.getElementById('stat-alerts').textContent = 
      formatNumber(stats.alertCount || 0);
    document.getElementById('stat-protected').textContent = 
      formatNumber(stats.risksDetected || 0);

    // LLM status
    const llmStatus = await chrome.runtime.sendMessage({ type: 'GET_LLM_STATUS' });
    document.getElementById('stat-llm').textContent = 
      llmStatus?.ready ? '활성' : '비활성';

    // Platform stats
    const platformCounts = {};
    conversations.forEach(c => {
      platformCounts[c.platform] = (platformCounts[c.platform] || 0) + 1;
    });

    const platformGrid = document.getElementById('platform-stats');
    platformGrid.innerHTML = ['chatgpt', 'claude', 'gemini'].map(p => `
      <div class="platform-card">
        <div class="platform-name">${p.charAt(0).toUpperCase() + p.slice(1)}</div>
        <div class="platform-count">${platformCounts[p] || 0} 대화</div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Load Alerts
async function loadAlerts() {
  try {
    const data = await chrome.storage.local.get('muin_guard_alerts');
    const alerts = data.muin_guard_alerts || [];

    // Recent alerts (overview)
    const recentAlerts = document.getElementById('recent-alerts');
    if (alerts.length === 0) {
      recentAlerts.innerHTML = '<div class="empty-state">탐지된 위험이 없습니다 ✅</div>';
    } else {
      recentAlerts.innerHTML = alerts.slice(0, 5).map(renderAlert).join('');
    }

    // All alerts
    const allAlerts = document.getElementById('all-alerts');
    if (alerts.length === 0) {
      allAlerts.innerHTML = '<div class="empty-state">알림이 없습니다</div>';
    } else {
      allAlerts.innerHTML = alerts.map(renderAlert).join('');
    }

  } catch (error) {
    console.error('Failed to load alerts:', error);
  }
}

function renderAlert(alert) {
  const level = alert.totalScore >= 4 ? 'high' : alert.totalScore >= 2 ? 'medium' : 'low';
  const icon = level === 'high' ? '🔴' : level === 'medium' ? '🟠' : '🟡';
  const messages = alert.risks?.map(r => r.message).join(', ') || '위험 탐지';

  return `
    <div class="alert-item ${level}">
      <div class="alert-icon">${icon}</div>
      <div class="alert-content">
        <div class="alert-message">${escapeHtml(messages)}</div>
        <div class="alert-meta">${alert.platform} · ${formatTime(alert.timestamp)}</div>
      </div>
    </div>
  `;
}

// Load Conversations
async function loadConversations() {
  try {
    const data = await chrome.storage.local.get('muin_guard_conversations');
    const conversations = data.muin_guard_conversations || [];

    const list = document.getElementById('conversation-list');
    
    if (conversations.length === 0) {
      list.innerHTML = '<div class="empty-state">기록된 대화가 없습니다</div>';
      return;
    }

    // Sort by timestamp desc
    conversations.sort((a, b) => b.timestamp - a.timestamp);

    list.innerHTML = conversations.slice(0, 100).map(c => `
      <div class="conversation-item ${c.risks?.length ? 'risky' : ''}">
        <div class="conversation-header">
          <span class="conversation-platform">${c.platform} - ${c.role}</span>
          <span class="conversation-time">${formatTime(c.timestamp)}</span>
        </div>
        <div class="conversation-content">${escapeHtml(c.content?.substring(0, 200))}${c.content?.length > 200 ? '...' : ''}</div>
      </div>
    `).join('');

    // Setup filters
    document.getElementById('filter-platform').addEventListener('change', filterConversations);
    document.getElementById('filter-risk').addEventListener('change', filterConversations);

  } catch (error) {
    console.error('Failed to load conversations:', error);
  }
}

function filterConversations() {
  // Implement filtering logic
  console.log('Filter changed');
}

// Load Settings
async function loadSettings() {
  try {
    const data = await chrome.storage.local.get('muin_guard_settings');
    const settings = data.muin_guard_settings || {};

    document.getElementById('setting-enabled').checked = settings.enabled !== false;
    document.getElementById('setting-notifications').checked = settings.notifications !== false;
    document.getElementById('setting-chatgpt').checked = settings.platforms?.chatgpt !== false;
    document.getElementById('setting-claude').checked = settings.platforms?.claude !== false;
    document.getElementById('setting-gemini').checked = settings.platforms?.gemini !== false;
    document.getElementById('setting-retention').value = settings.retentionDays || 30;

    // Setting change handlers
    const settingIds = ['enabled', 'notifications', 'chatgpt', 'claude', 'gemini'];
    settingIds.forEach(id => {
      document.getElementById(`setting-${id}`).addEventListener('change', saveSettings);
    });
    document.getElementById('setting-retention').addEventListener('change', saveSettings);

    // Clear data button
    document.getElementById('clear-data').addEventListener('click', async () => {
      if (confirm('모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        await chrome.storage.local.clear();
        window.location.reload();
      }
    });

    // Enable LLM button
    document.getElementById('enable-llm').addEventListener('click', async () => {
      const btn = document.getElementById('enable-llm');
      btn.textContent = '로딩 중...';
      btn.disabled = true;
      await chrome.runtime.sendMessage({ type: 'INIT_LLM_FROM_POPUP' });
    });

  } catch (error) {
    console.error('Failed to load settings:', error);
  }
}

async function saveSettings() {
  const settings = {
    enabled: document.getElementById('setting-enabled').checked,
    notifications: document.getElementById('setting-notifications').checked,
    retentionDays: parseInt(document.getElementById('setting-retention').value),
    platforms: {
      chatgpt: document.getElementById('setting-chatgpt').checked,
      claude: document.getElementById('setting-claude').checked,
      gemini: document.getElementById('setting-gemini').checked
    }
  };

  await chrome.storage.local.set({ muin_guard_settings: settings });
}

// Utilities
function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return '방금';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
  
  return date.toLocaleDateString('ko-KR', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
