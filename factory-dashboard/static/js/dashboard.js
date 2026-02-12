// Factory Dashboard - Real-time Session Monitoring

const REFRESH_INTERVAL = 10000; // 10 seconds
let lastFetchTime = null;

async function fetchSessions() {
    try {
        const response = await fetch('/api/sessions');
        const data = await response.json();
        updateDashboard(data);
        updateStatus(true);
    } catch (error) {
        console.error('Failed to fetch sessions:', error);
        updateStatus(false);
    }
}

function updateDashboard(data) {
    // Update stats
    document.getElementById('stat-active').textContent = data.stats.active;
    document.getElementById('stat-idle').textContent = data.stats.idle;
    document.getElementById('stat-stale').textContent = data.stats.stale;
    document.getElementById('stat-total').textContent = data.total;
    document.getElementById('stat-main').textContent = data.stats.main;
    document.getElementById('stat-subagent').textContent = data.stats.subagent;
    document.getElementById('stat-cron').textContent = data.stats.cron;

    // Update sessions grid
    const container = document.getElementById('sessions-container');
    
    if (data.sessions.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-inbox display-1"></i>
                <p class="mt-3">No active sessions</p>
            </div>
        `;
        return;
    }

    // Sort: active first, then by age
    const sorted = data.sessions.sort((a, b) => {
        const statusOrder = { active: 0, idle: 1, stale: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return a.ageMs - b.ageMs;
    });

    container.innerHTML = sorted.map(session => createSessionCard(session)).join('');
}

function createSessionCard(session) {
    const typeIcons = {
        main: 'bi-person-fill',
        subagent: 'bi-diagram-3',
        cron: 'bi-clock-history',
        unknown: 'bi-question-circle'
    };

    const typeColors = {
        main: 'primary',
        subagent: 'purple',
        cron: 'secondary',
        unknown: 'dark'
    };

    const statusColors = {
        active: 'success',
        idle: 'warning',
        stale: 'secondary'
    };

    const icon = typeIcons[session.sessionType] || typeIcons.unknown;
    const typeColor = typeColors[session.sessionType] || typeColors.unknown;
    const statusColor = statusColors[session.status] || 'secondary';

    // Extract short name from key
    const keyParts = session.key.split(':');
    const shortName = keyParts.slice(-1)[0].substring(0, 8);

    // Format tokens
    const tokens = session.totalTokens 
        ? `${(session.totalTokens / 1000).toFixed(1)}k tokens`
        : '';

    return `
        <div class="col-lg-4 col-md-6">
            <div class="card bg-dark border-secondary session-card session-${session.status}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <span class="badge bg-${typeColor} badge-type me-1">
                                <i class="bi ${icon}"></i> ${session.sessionType}
                            </span>
                            <span class="badge bg-${statusColor} badge-type">
                                ${session.status}
                            </span>
                        </div>
                        <small class="text-muted">${session.ageFormatted}</small>
                    </div>
                    <p class="session-key mb-2" title="${session.key}">${session.key}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="session-model text-info">
                            <i class="bi bi-cpu"></i> ${session.model || 'unknown'}
                        </span>
                        <small class="text-muted">${tokens}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateStatus(connected) {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('last-update');
    
    if (connected) {
        dot.className = 'status-dot bg-success';
        const now = new Date();
        text.textContent = `Updated ${now.toLocaleTimeString()}`;
    } else {
        dot.className = 'status-dot bg-danger';
        text.textContent = 'Connection lost';
    }
}

// Initial fetch and start polling
fetchSessions();
setInterval(fetchSessions, REFRESH_INTERVAL);

// Visual feedback for manual refresh
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
        fetchSessions();
    }
});
