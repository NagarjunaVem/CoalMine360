"""
In-memory & JSON-persisted database for CoalMine360
"""
import copy
import json
import os
from datetime import datetime
from data import (
    INITIAL_MINES,
    INITIAL_AI_RISKS,
    INITIAL_COMPLIANCE,
    INITIAL_INSPECTIONS,
    INITIAL_VIOLATIONS,
    INITIAL_CORRECTIVE_ACTIONS,
    INITIAL_CONTRACTORS,
    INITIAL_ALERTS,
    INITIAL_AUDIT_TRAIL,
)

is_vercel = os.environ.get("VERCEL") is not None
DEFAULT_STORE = os.path.join(os.path.dirname(__file__), "store.json")

if is_vercel:
    DATA_FILE = "/tmp/store.json"
    if not os.path.exists(DATA_FILE) and os.path.exists(DEFAULT_STORE):
        try:
            import shutil
            shutil.copyfile(DEFAULT_STORE, DATA_FILE)
        except Exception:
            pass
else:
    DATA_FILE = DEFAULT_STORE

class Database:
    def __init__(self):
        self.load_or_reset()

    def reset(self):
        self.mines = copy.deepcopy(INITIAL_MINES)
        self.ai_risks = copy.deepcopy(INITIAL_AI_RISKS)
        self.compliance = copy.deepcopy(INITIAL_COMPLIANCE)
        self.inspections = copy.deepcopy(INITIAL_INSPECTIONS)
        self.violations = copy.deepcopy(INITIAL_VIOLATIONS)
        self.corrective_actions = copy.deepcopy(INITIAL_CORRECTIVE_ACTIONS)
        self.contractors = copy.deepcopy(INITIAL_CONTRACTORS)
        self.alerts = copy.deepcopy(INITIAL_ALERTS)
        self.audit_trail = copy.deepcopy(INITIAL_AUDIT_TRAIL)
        self.save()

    def load_or_reset(self):
        load_path = DATA_FILE if os.path.exists(DATA_FILE) else DEFAULT_STORE
        if os.path.exists(load_path):
            try:
                with open(load_path, "r", encoding="utf-8") as f:
                    saved = json.load(f)
                    self.mines = saved.get("mines", copy.deepcopy(INITIAL_MINES))
                    self.ai_risks = saved.get("ai_risks", copy.deepcopy(INITIAL_AI_RISKS))
                    self.compliance = saved.get("compliance", copy.deepcopy(INITIAL_COMPLIANCE))
                    self.inspections = saved.get("inspections", copy.deepcopy(INITIAL_INSPECTIONS))
                    self.violations = saved.get("violations", copy.deepcopy(INITIAL_VIOLATIONS))
                    self.corrective_actions = saved.get("corrective_actions", copy.deepcopy(INITIAL_CORRECTIVE_ACTIONS))
                    self.contractors = saved.get("contractors", copy.deepcopy(INITIAL_CONTRACTORS))
                    self.alerts = saved.get("alerts", copy.deepcopy(INITIAL_ALERTS))
                    self.audit_trail = saved.get("audit_trail", copy.deepcopy(INITIAL_AUDIT_TRAIL))
                    return
            except Exception as e:
                print(f"Error loading store data: {e}, resetting to default")
        self.reset()

    def save(self):
        data = {
            "mines": self.mines,
            "ai_risks": self.ai_risks,
            "compliance": self.compliance,
            "inspections": self.inspections,
            "violations": self.violations,
            "corrective_actions": self.corrective_actions,
            "contractors": self.contractors,
            "alerts": self.alerts,
            "audit_trail": self.audit_trail,
        }
        try:
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except Exception:
            # In-memory updates remain active even if filesystem is read-only
            pass

    def get_dashboard_kpis(self):
        total_mines = len(self.mines)
        # Average compliance rate rounded
        avg_compliance = round(sum(m["compliance_rate"] for m in self.mines) / total_mines) if total_mines else 87
        
        # Open violations
        open_viol = sum(1 for v in self.violations if v.get("status") in ["OPEN", "IN PROGRESS", "ASSIGNED", "VERIFICATION"])
        
        # High risk issues
        high_risk_issues = sum(1 for r in self.ai_risks if r.get("risk_level") == "HIGH")
        
        # Pending corrective actions
        pending_ca = sum(1 for ca in self.corrective_actions if ca.get("status") in ["OPEN", "IN PROGRESS", "ASSIGNED", "VERIFICATION"])
        
        # Inspections this month
        total_inspections = sum(m.get("inspections_count", 0) for m in self.mines)
        
        # Active contractors
        active_contractors = 28 # standard organization wide number
        
        # Critical alerts
        critical_alerts = sum(1 for a in self.alerts if a.get("type") == "CRITICAL" and not a.get("acknowledged", False))

        return {
            "total_mines": total_mines,
            "compliance_rate": avg_compliance,
            "open_violations": open_viol,
            "high_risk_issues": high_risk_issues,
            "pending_corrective_actions": pending_ca,
            "inspections_this_month": total_inspections,
            "active_contractors": active_contractors,
            "critical_alerts": critical_alerts,
            "organization": "Eastern Coal Operations Ltd.",
            "last_updated": datetime.now().strftime("%d %b %Y, %I:%M %p")
        }

db = Database()
