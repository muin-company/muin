// Factory Dashboard v2.0 - Real-time Session Monitoring with Task Queue & Cost Tracking

const REFRESH_INTERVAL = 10000; // 10 seconds
let lastFetchTime = null;
let currentData = null;

async function fetchSessions() {
    try {
        const response = await fetch('/api/sessions');
        const data = await response.json();
        currentData = data;
        updateDashboard(data);
        updateStatus(true);
    } catch (error) {
        console.error('Failed to fetch sessions:', error);
        updateStatus(false);
    }
}

function updateDashboard(data) {
    updateStats(data);
    updateTokenStats(data);
    updateTaskQueue(data);
    updateSessionsGrid(data);
}

function updateStats(data) {
    // Basic stats
    document.getElementById('stat-active').textContent = data.stats.active;
    document.getElementById('stat-idle').textContent = data.stats.idle;
    document.getElementById('stat-stale').textContent = data.stats.stale;
    document.getElementById('stat-total').textContent = data.total;
    document.getElementById('stat-main').textContent = data.stats.main;
    document.getElementById('stat-subagent').textContent = data.stats.subagent;
    document.getElementById('stat-cron').textContent = data.stats.cron;

    // Cost
    const cost = data.tokenStats.totalCost;
    const costEl = document.getElementById('stat-cost');
    costEl.textContent = `$${cost.toFixed(4)}`;
    
    // Color code based on cost
    if (cost > 1.0) {
        costEl.className = 'mb-0 cost-high';
    } else if (cost > 0.1) {
        costEl.className = 'mb-0 cost-medium';
    } else {
        costEl.className = 'mb-0 cost-low';
    }

    // Total tokens
    const totalTokens = data.tokenStats.totalInput + data.tokenStats.totalOutput;
    document.getElementById('stat-tokens').textContent = formatTokens(totalTokens);
}

function updateTokenStats(data) {
    const ts = data.tokenStats;
    
    document.getElementById('token-input').textContent = formatTokens(ts.totalInput);
    document.getElementById('token-output').textContent = formatTokens(ts.totalOutput);
    document.getElementById('token-context').textContent = formatTokens(ts.totalContext);
    document.getElementById('token-cost-detail').textContent = `$${ts.totalCost.toFixed(4)}`;
}

function updateTaskQueue(data) {
    const queue = data.taskQueue || [];
    const queueSection = document.getElementById('task-queue-section');
    const queueContainer = document.getElementById('task-queue-container');
    const queueCount = document.getElementById('queue-count');

    if (queue.length === 0) {
        queueSection.style.display = 'none';
        return;
    }

    queueSection.style.display = 'block';
    queueCount.textContent = queue.length;

    queueContainer.innerHTML = queue.map(task => createTaskItem(task)).join('');
}

function createTaskItem(task) {
    const statusIcon = task.status === 'active' 
        ? '<i class="bi bi-lightning-charge-fill text-success task-icon"></i>'
        : '<i class="bi bi-hourglass-split text-warning task-icon"></i>';
    
    const itemClass = task.status === 'active' ? 'task-item task-item-active' : 'task-item';

    return `
        <div class="${itemClass}">
            ${statusIcon}
            <div class="task-name">${escapeHtml(task.taskName)}</div>
            <div class="task-meta">
                <span><i class="bi bi-clock"></i> ${task.ageFormatted}</span>
                <span><i class="bi bi-cpu"></i> ${escapeHtml(task.model)}</span>
                <span><i class="bi bi-hash"></i> ${formatTokens(task.tokens)}</span>
            </div>
        </div>
    `;
}

function updateSessionsGrid(data) {
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

    // Format tokens
    const inputTokens = session.inputTokens || 0;
    const outputTokens = session.outputTokens || 0;
    const totalTokens = session.totalTokens || 0;
    const contextTokens = session.contextTokens || 0;
    const cost = session.cost || 0;

    const tokenInfo = totalTokens 
        ? `
            <div class="mt-2 pt-2 border-top border-secondary">
                <small class="text-muted d-block">
                    <i class="bi bi-arrow-down-circle text-success"></i> In: ${formatTokens(inputTokens)} &nbsp;
                    <i class="bi bi-arrow-up-circle text-warning"></i> Out: ${formatTokens(outputTokens)}
                </small>
                <small class="text-muted d-block mt-1">
                    <i class="bi bi-collection"></i> Total: ${formatTokens(totalTokens)} &nbsp;
                    <i class="bi bi-cash-coin text-danger"></i> Cost: $${cost.toFixed(4)}
                </small>
            </div>
        `
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
                    <div class="session-key mb-2" title="${escapeHtml(session.key)}">
                        ${escapeHtml(session.key)}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="session-model text-info">
                            <i class="bi bi-cpu"></i> ${escapeHtml(session.model || 'unknown')}
                        </span>
                        <small class="text-muted">
                            <i class="bi bi-memory"></i> ${formatTokens(contextTokens)}
                        </small>
                    </div>
                    ${tokenInfo}
                </div>
            </div>
        </div>
    `;
}

function formatTokens(tokens) {
    if (!tokens) return '0';
    if (tokens < 1000) return tokens.toString();
    if (tokens < 1000000) return (tokens / 1000).toFixed(1) + 'k';
    return (tokens / 1000000).toFixed(2) + 'M';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStatus(connected) {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('last-update');
    
    if (connected) {
        dot.className = 'status-dot bg-success';
        const now = new Date();
        text.textContent = `Updated ${now.toLocaleTimeString()}`;
        lastFetchTime = now;
    } else {
        dot.className = 'status-dot bg-danger';
        text.textContent = 'Connection lost';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        console.log('Manual refresh triggered');
        fetchSessions();
        
        // Visual feedback
        const statusText = document.getElementById('last-update');
        const originalText = statusText.textContent;
        statusText.textContent = 'Refreshing...';
        setTimeout(() => {
            if (lastFetchTime) {
                statusText.textContent = `Updated ${lastFetchTime.toLocaleTimeString()}`;
            }
        }, 500);
    }
});

// Initial fetch and start polling
console.log('Factory Dashboard v2.0 initialized');
fetchSessions();
setInterval(fetchSessions, REFRESH_INTERVAL);

// Update footer with refresh interval
document.getElementById('footer-refresh').textContent = `Auto-refresh: ${REFRESH_INTERVAL / 1000}s`;
