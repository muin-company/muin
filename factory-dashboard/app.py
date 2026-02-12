#!/usr/bin/env python3
"""Factory Dashboard - OpenClaw Multi-Agent Monitoring"""

import subprocess
import json
from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)


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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/sessions")
def api_sessions():
    data = get_sessions()
    sessions = data.get("sessions", [])
    
    # Enrich sessions with categorization
    enriched = []
    stats = {"active": 0, "idle": 0, "stale": 0, "main": 0, "subagent": 0, "cron": 0}
    
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
        
        # Update stats
        stats[status] += 1
        stats[session_type] += 1
        
        enriched.append(session)
    
    return jsonify({
        "sessions": enriched,
        "stats": stats,
        "total": len(enriched),
        "fetchedAt": datetime.now().isoformat()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
