#!/usr/bin/env python3
"""Factory Dashboard - OpenClaw Multi-Agent Monitoring (Enhanced)"""

import subprocess
import json
from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)

# Token cost estimation (Claude Opus 4.5)
# Source: https://www.anthropic.com/pricing
COST_PER_1M_INPUT = 15.0  # $15 per 1M input tokens
COST_PER_1M_OUTPUT = 75.0  # $75 per 1M output tokens


def get_sessions():
    """Fetch sessions from openclaw CLI"""
    try:
        result = subprocess.run(
            ["openclaw", "sessions", "--json", "--active", "60"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            return json.loads(result.stdout)
        return {"sessions": [], "error": result.stderr}
    except Exception as e:
        return {"sessions": [], "error": str(e)}


def categorize_session(session):
    """Categorize session by type and status"""
    key = session.get("key", "")
    age_ms = session.get("ageMs", 0)
    
    # Determine session type
    if ":subagent:" in key:
        session_type = "subagent"
    elif ":cron:" in key:
        session_type = "cron"
    elif ":main" in key:
        session_type = "main"
    else:
        session_type = "unknown"
    
    # Determine status (active if updated within 5 minutes)
    if age_ms < 300000:  # 5 minutes
        status = "active"
    elif age_ms < 3600000:  # 1 hour
        status = "idle"
    else:
        status = "stale"
    
    return session_type, status


def calculate_cost(input_tokens, output_tokens):
    """Calculate cost based on token usage"""
    if not input_tokens and not output_tokens:
        return 0.0
    
    input_cost = (input_tokens or 0) / 1_000_000 * COST_PER_1M_INPUT
    output_cost = (output_tokens or 0) / 1_000_000 * COST_PER_1M_OUTPUT
    return input_cost + output_cost


def extract_task_name(session_key):
    """Extract human-readable task name from session key"""
    parts = session_key.split(":")
    if len(parts) >= 4:
        # For subagents, try to get UUID for identification
        return f"{parts[2]}...{parts[-1][:8]}"
    return parts[-1][:16]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/sessions")
def api_sessions():
    data = get_sessions()
    sessions = data.get("sessions", [])
    
    # Enrich sessions with categorization
    enriched = []
    stats = {
        "active": 0, 
        "idle": 0, 
        "stale": 0, 
        "main": 0, 
        "subagent": 0, 
        "cron": 0
    }
    
    total_input_tokens = 0
    total_output_tokens = 0
    total_context_tokens = 0
    total_cost = 0.0
    
    for session in sessions:
        session_type, status = categorize_session(session)
        session["sessionType"] = session_type
        session["status"] = status
        
        # Format timestamps
        age_ms = session.get("ageMs", 0)
        if age_ms < 60000:
            session["ageFormatted"] = f"{age_ms // 1000}s ago"
        elif age_ms < 3600000:
            session["ageFormatted"] = f"{age_ms // 60000}m ago"
        else:
            session["ageFormatted"] = f"{age_ms // 3600000}h ago"
        
        # Extract task name
        session["taskName"] = extract_task_name(session.get("key", ""))
        
        # Calculate cost
        input_tokens = session.get("inputTokens", 0)
        output_tokens = session.get("outputTokens", 0)
        context_tokens = session.get("contextTokens", 0)
        
        session["cost"] = calculate_cost(input_tokens, output_tokens)
        
        # Aggregate stats
        total_input_tokens += input_tokens or 0
        total_output_tokens += output_tokens or 0
        total_context_tokens = max(total_context_tokens, context_tokens or 0)
        total_cost += session["cost"]
        
        # Update stats
        stats[status] += 1
        stats[session_type] += 1
        
        enriched.append(session)
    
    # Task queue: active subagents
    task_queue = [
        {
            "taskName": s["taskName"],
            "ageFormatted": s["ageFormatted"],
            "model": s.get("model", "unknown"),
            "tokens": s.get("totalTokens", 0),
            "status": s["status"]
        }
        for s in enriched 
        if s["sessionType"] == "subagent" and s["status"] in ["active", "idle"]
    ]
    
    return jsonify({
        "sessions": enriched,
        "stats": stats,
        "total": len(enriched),
        "tokenStats": {
            "totalInput": total_input_tokens,
            "totalOutput": total_output_tokens,
            "totalContext": total_context_tokens,
            "totalCost": round(total_cost, 4)
        },
        "taskQueue": task_queue,
        "fetchedAt": datetime.now().isoformat()
    })


@app.route("/api/health")
def api_health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
