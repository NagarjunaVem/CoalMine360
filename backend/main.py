"""
FastAPI Backend for CoalMine360
"""
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid
import hashlib

from database import db
from ai_engine import compute_risk_score, detect_production_anomalies, answer_minegov_assistant

app = FastAPI(
    title="CoalMine360 API",
    description="Smart Governance & Compliance Monitoring Platform for Eastern Coal Operations Ltd.",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def make_hash(data_str: str) -> str:
    h = hashlib.sha256(data_str.encode()).hexdigest()
    return f"0x{h[:8]}...{h[-4:]}"

# Models
class ObservationCreate(BaseModel):
    mine_id: str
    category: str
    observation: str
    severity: str
    inspector_name: str
    gps_coordinates: Optional[str] = "23.7957° N, 86.4304° E"
    photo_filename: Optional[str] = "PPE_violation.jpg"

class AlertActionRequest(BaseModel):
    action: str # "acknowledge", "assign", "escalate"
    assigned_to: Optional[str] = None
    note: Optional[str] = None

class CorrectiveActionUpdate(BaseModel):
    status: str # "IN PROGRESS", "VERIFICATION", "CLOSED"
    note: Optional[str] = None

class AssistantQuery(BaseModel):
    query: str

# Endpoints
@app.get("/")
def read_root():
    return {
        "platform": "CoalMine360 — AI-Powered Smart Governance & Compliance Platform",
        "organization": "Eastern Coal Operations Ltd.",
        "status": "Operational",
        "version": "1.0.0"
    }

@app.get("/api/dashboard")
def get_dashboard():
    kpis = db.get_dashboard_kpis()
    return {
        "kpis": kpis,
        "mines": db.mines,
        "critical_alerts": [a for a in db.alerts if a.get("type") == "CRITICAL" and not a.get("acknowledged")],
        "ai_high_risks": [r for r in db.ai_risks if r.get("risk_level") == "HIGH"][:3],
        "recent_audit": db.audit_trail[-5:]
    }

@app.get("/api/mines")
def get_mines():
    return db.mines

@app.get("/api/mines/{mine_id}")
def get_mine_details(mine_id: str):
    mine = next((m for m in db.mines if m["id"] == mine_id), None)
    if not mine:
        raise HTTPException(status_code=404, detail="Mine not found")
    
    # Filter related records
    mine_compliance = [c for c in db.compliance if c.get("mine_id") == mine_id]
    mine_inspections = [i for i in db.inspections if i.get("mine_id") == mine_id]
    mine_violations = [v for v in db.violations if v.get("mine_id") == mine_id]
    mine_actions = [ca for ca in db.corrective_actions if ca.get("mine_id") == mine_id]
    mine_alerts = [a for a in db.alerts if a.get("mine_id") == mine_id]
    mine_ai_risks = [r for r in db.ai_risks if r.get("mine_id") == mine_id]

    return {
        "mine": mine,
        "compliance": mine_compliance,
        "inspections": mine_inspections,
        "violations": mine_violations,
        "corrective_actions": mine_actions,
        "alerts": mine_alerts,
        "ai_risks": mine_ai_risks
    }

@app.get("/api/compliance")
def get_compliance():
    return db.compliance

@app.get("/api/inspections")
def get_inspections():
    return db.inspections

@app.get("/api/inspections/{insp_id}")
def get_inspection(insp_id: str):
    insp = next((i for i in db.inspections if i["id"] == insp_id), None)
    if not insp:
        raise HTTPException(status_code=404, detail="Inspection not found")
    return insp

@app.get("/api/violations")
def get_violations():
    return db.violations

@app.get("/api/contractors")
def get_contractors():
    return db.contractors

@app.get("/api/contractors/{cont_id}")
def get_contractor(cont_id: str):
    cont = next((c for c in db.contractors if c["id"] == cont_id), None)
    if not cont:
        raise HTTPException(status_code=404, detail="Contractor not found")
    return cont

@app.get("/api/alerts")
def get_alerts():
    return db.alerts

@app.post("/api/alerts/{alert_id}/action")
def update_alert(alert_id: str, req: AlertActionRequest):
    alert = next((a for a in db.alerts if a["id"] == alert_id), None)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    timestamp = datetime.now().strftime("%d %b %Y, %I:%M %p")
    if req.action == "acknowledge":
        alert["acknowledged"] = True
        alert["status"] = "ACKNOWLEDGED"
        alert["action_taken"] = f"Acknowledged on {timestamp}."
    elif req.action == "assign":
        alert["status"] = "ASSIGNED"
        assigned = req.assigned_to or "Area Safety Officer"
        alert["action_taken"] = f"Assigned to {assigned} on {timestamp}."
    elif req.action == "escalate":
        alert["status"] = "ESCALATED"
        alert["current_escalation_level"] = "Chairman & Managing Director (CMD)"
        alert["action_taken"] = f"Statutory escalation to CMD & DGMS Desk on {timestamp}."

    # Audit log
    db.audit_trail.insert(0, {
        "id": f"audit-{uuid.uuid4().hex[:6]}",
        "timestamp": timestamp,
        "action": f"Alert {req.action.capitalize()}",
        "entity": f"Alert #{alert['id']} ({alert['title']})",
        "actor": "Mine Official / Governance Lead",
        "details": alert["action_taken"],
        "hash": make_hash(alert["id"] + timestamp)
    })
    db.save()
    return alert

@app.get("/api/ai-insights")
def get_ai_insights():
    anomalies = detect_production_anomalies(db.mines)
    return {
        "risks": db.ai_risks,
        "production_anomalies": anomalies,
        "compliance_pattern": {
            "title": "Recurring Compliance Pattern Detected",
            "observation_increase": "Safety observations increased 34% over the last four inspections at Dhanbad North.",
            "risk_score": 87,
            "risk_level": "HIGH",
            "recommended_action": "Initiate targeted safety review and deploy senior safety auditor.",
            "statutory_reference": "Coal Mines Regulations 2017 - Regulation 104"
        }
    }

@app.post("/api/observations")
def submit_observation(obs: ObservationCreate):
    """
    Submits a geo-tagged field observation, automatically triggers AI risk calculation,
    creates violation, logs corrective action, notifies manager, and updates audit trail.
    """
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    now_date = datetime.now().strftime("%d %b %Y")
    
    # Find mine
    mine = next((m for m in db.mines if m["id"] == obs.mine_id), db.mines[0])
    
    # Calculate AI risk
    risk_info = compute_risk_score(severity=obs.severity, recurrence_count=3, overdue_actions=2)

    obs_id = f"obs-{uuid.uuid4().hex[:6]}"
    viol_id = f"viol-{uuid.uuid4().hex[:6]}"
    ca_id = f"ca-{uuid.uuid4().hex[:6]}"

    # Update mine stats (open issues + 1)
    mine["open_issues"] = mine.get("open_issues", 0) + 1
    if obs.severity.upper() == "HIGH":
        mine["risk_score"] = min(mine.get("risk_score", 70) + 2, 98)

    # 1. Create Violation
    new_violation = {
        "id": viol_id,
        "mine_id": mine["id"],
        "mine_name": mine["name"],
        "title": obs.observation,
        "category": obs.category,
        "detected_date": now_date,
        "severity": obs.severity.upper(),
        "observations_total": 1,
        "critical_observations": 1 if obs.severity.upper() == "HIGH" else 0,
        "normal_observations": 0 if obs.severity.upper() == "HIGH" else 1,
        "evidence_files": [obs.photo_filename or "Field_Observation_Capture.jpg"],
        "assigned_to": f"Mine Safety Officer ({mine.get('safety_officer', 'Area Officer')})",
        "corrective_action_title": f"Corrective Action: Resolve {obs.observation}",
        "due_date": "02 Oct 2026",
        "status": "OPEN",
        "verification_status": "Pending Assignment",
        "ai_flag": f"AI Risk Score {risk_info['score']} ({risk_info['level']})"
    }
    db.violations.insert(0, new_violation)

    # 2. Create Corrective Action
    new_ca = {
        "id": ca_id,
        "violation_id": viol_id,
        "mine_id": mine["id"],
        "mine_name": mine["name"],
        "title": f"Corrective Action: {obs.observation}",
        "assigned_to": f"Mine Safety Officer ({mine.get('safety_officer', 'Area Officer')})",
        "assigned_date": now_date,
        "due_date": "02 Oct 2026",
        "status": "OPEN",
        "severity": obs.severity.upper(),
        "progress_percent": 10,
        "lifecycle_steps": [
            {"step": "Observation Submitted", "date": now_str, "status": "COMPLETED", "note": f"{obs.observation} captured via geo-tagged field form by {obs.inspector_name}"},
            {"step": "AI Risk Classification", "date": now_str, "status": "COMPLETED", "note": f"Risk Score: {risk_info['score']}/100 ({risk_info['level']})"},
            {"step": "Corrective Action Auto-Generated", "date": now_str, "status": "COMPLETED", "note": "Assigned to Safety Officer with 5-day resolution SLA"},
            {"step": "Action Implementation", "date": "Pending", "status": "PENDING", "note": "Awaiting field supervisor sign-off"},
            {"step": "Verification & Closure", "date": "Pending", "status": "PENDING", "note": "Independent re-inspection mandatory before closeout"}
        ],
        "notes": f"Simulated GPS: {obs.gps_coordinates}. Evidence verified."
    }
    db.corrective_actions.insert(0, new_ca)

    # 3. Create Alert if HIGH severity
    if obs.severity.upper() == "HIGH":
        new_alert = {
            "id": f"alert-{uuid.uuid4().hex[:6]}",
            "type": "CRITICAL",
            "title": f"New High-Severity Field Observation: {mine['name']}",
            "mine_id": mine["id"],
            "mine_name": mine["name"],
            "message": f"Inspector {obs.inspector_name} logged '{obs.observation}'. Corrective action required immediately.",
            "escalation_chain": "Field Inspector → Mine Safety Officer → Mine Manager",
            "current_escalation_level": "Mine Safety Officer",
            "timestamp": now_str,
            "acknowledged": False,
            "status": "OPEN",
            "action_taken": None
        }
        db.alerts.insert(0, new_alert)

    # 4. Record complete digital Audit Trail steps
    trail_items = [
        {
            "id": f"audit-{uuid.uuid4().hex[:6]}",
            "timestamp": now_str,
            "action": "Field observation submitted",
            "entity": f"Field Observation ({mine['name']})",
            "actor": f"{obs.inspector_name} (Field Inspector)",
            "details": f"Geo-tagged: {obs.gps_coordinates} | Category: {obs.category} | Severity: {obs.severity}",
            "hash": make_hash(obs_id + now_str)
        },
        {
            "id": f"audit-{uuid.uuid4().hex[:6]}",
            "timestamp": now_str,
            "action": "AI risk classification generated",
            "entity": "CoalMine360 AI Risk Engine",
            "actor": "System AI Engine",
            "details": f"Calculated Risk Score: {risk_info['score']} ({risk_info['level']}) | Model: v2.4 Multi-Factor",
            "hash": make_hash(risk_info["level"] + now_str)
        },
        {
            "id": f"audit-{uuid.uuid4().hex[:6]}",
            "timestamp": now_str,
            "action": "Corrective action assigned",
            "entity": f"Action #{ca_id}",
            "actor": "Automated Governance Workflow",
            "details": f"Assigned to {mine.get('safety_officer', 'Safety Officer')} with due date 02 Oct 2026",
            "hash": make_hash(ca_id + now_str)
        },
        {
            "id": f"audit-{uuid.uuid4().hex[:6]}",
            "timestamp": now_str,
            "action": "Mine Manager notified",
            "entity": "SMS / Digital Dispatch Gateway",
            "actor": "Notification Dispatcher",
            "details": f"Automated notice dispatched to {mine.get('manager', 'Mine Manager')} ({mine['name']})",
            "hash": make_hash("manager-notify" + now_str)
        }
    ]
    for t in trail_items:
        db.audit_trail.insert(0, t)

    db.save()

    return {
        "success": True,
        "message": "Observation Recorded, AI Risk Calculated & Action Assigned",
        "observation_id": obs_id,
        "violation_id": viol_id,
        "corrective_action_id": ca_id,
        "risk_score": risk_info["score"],
        "risk_level": risk_info["level"],
        "geo_tag": obs.gps_coordinates,
        "timestamp": now_str,
        "evidence": obs.photo_filename,
        "status": "OPEN",
        "kpis_updated": db.get_dashboard_kpis()
    }

@app.post("/api/corrective-actions/{action_id}/status")
def update_action_status(action_id: str, req: CorrectiveActionUpdate):
    ca = next((c for c in db.corrective_actions if c["id"] == action_id), None)
    if not ca:
        raise HTTPException(status_code=404, detail="Action not found")
    
    ca["status"] = req.status
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    
    if req.status == "IN PROGRESS":
        ca["progress_percent"] = 65
    elif req.status == "VERIFICATION":
        ca["progress_percent"] = 90
    elif req.status == "CLOSED":
        ca["progress_percent"] = 100
        # Update matching violation
        v = next((item for item in db.violations if item["id"] == ca.get("violation_id")), None)
        if v:
            v["status"] = "CLOSED"
            v["verification_status"] = "Verified & Closed"
        
        # Decrement mine open issues
        m = next((m for m in db.mines if m["id"] == ca.get("mine_id")), None)
        if m and m["open_issues"] > 0:
            m["open_issues"] -= 1

    # Log in action lifecycle
    ca["lifecycle_steps"].append({
        "step": f"Status changed to {req.status}",
        "date": now_str,
        "status": "COMPLETED" if req.status == "CLOSED" else "IN PROGRESS",
        "note": req.note or f"Updated status to {req.status}"
    })

    # Log in audit trail
    db.audit_trail.insert(0, {
        "id": f"audit-{uuid.uuid4().hex[:6]}",
        "timestamp": now_str,
        "action": f"Corrective action status: {req.status}",
        "entity": f"Action #{ca['id']} ({ca['title']})",
        "actor": ca.get("assigned_to", "Safety Lead"),
        "details": req.note or f"Lifecycle transitioned to {req.status}",
        "hash": make_hash(action_id + now_str)
    })

    db.save()
    return ca

@app.post("/api/documents/upload")
def upload_statutory_document(file_name: Optional[str] = "Safety_Certificate_2026.pdf"):
    """
    Simulates OCR processing of statutory document and maps to compliance ledger.
    """
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    extracted_data = {
        "document_name": file_name or "Safety_Certificate.pdf",
        "certificate_number": "SAF-2026-1823",
        "issuing_authority": "Directorate General of Mines Safety (DGMS)",
        "issue_date": "12 Aug 2026",
        "expiry_date": "12 Aug 2027",
        "mine_assigned": "Dhanbad North Mine",
        "mine_id": "mine-1",
        "status": "VALID",
        "confidence_score": "98.4%",
        "statutory_act": "Coal Mines Regulations (CMR) 2017, Regulation 104",
        "mapped_compliance_item": "Emergency Refuge & Heavy Fleet Clearance"
    }

    # Record audit log
    db.audit_trail.insert(0, {
        "id": f"audit-{uuid.uuid4().hex[:6]}",
        "timestamp": now_str,
        "action": "Statutory document uploaded & OCR verified",
        "entity": f"Document {extracted_data['document_name']}",
        "actor": "Compliance Registrar",
        "details": f"OCR extracted Certificate #SAF-2026-1823. Validity confirmed to 12 Aug 2027.",
        "hash": make_hash(extracted_data["certificate_number"] + now_str)
    })
    db.save()

    return {
        "success": True,
        "pipeline_steps": [
            "Document uploaded ✓",
            "OCR processing ✓",
            "Information extracted ✓",
            "Compliance requirement mapped ✓"
        ],
        "extracted": extracted_data
    }

@app.post("/api/assistant/chat")
def chat_assistant(req: AssistantQuery):
    response = answer_minegov_assistant(req.query, {"mines": db.mines})
    return response

@app.get("/api/audit-logs")
def get_audit_logs():
    return db.audit_trail

@app.post("/api/reset-data")
def reset_demo_data():
    db.reset()
    return {"success": True, "message": "Demo data reset to initial baseline"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
