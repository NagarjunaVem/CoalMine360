"""
AI Engine for CoalMine360
Simulates analytics-driven risk calculation, anomaly detection, recurring failure flags,
and the MineGov AI assistant.
"""
from typing import Dict, Any, List

def compute_risk_score(severity: str, recurrence_count: int, overdue_actions: int) -> Dict[str, Any]:
    """
    Computes an AI risk score (0-100) based on severity, recurrence history, and overdue actions.
    """
    base = 40
    if severity.upper() == "CRITICAL" or severity.upper() == "HIGH":
        base += 30
    elif severity.upper() == "MEDIUM":
        base += 15
    else:
        base += 5

    recurrence_weight = min(recurrence_count * 8, 20)
    overdue_weight = min(overdue_actions * 5, 15)

    score = min(base + recurrence_weight + overdue_weight, 99)
    level = "HIGH" if score >= 75 else ("MEDIUM" if score >= 50 else "LOW")

    return {
        "score": score,
        "level": level,
        "factors": {
            "severity_weight": base,
            "recurrence_weight": recurrence_weight,
            "overdue_weight": overdue_weight
        }
    }

def detect_production_anomalies(mines: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Detects production deviation against expected baseline.
    """
    anomalies = []
    for m in mines:
        target = m.get("daily_target_tonnes", 10000)
        current = m.get("current_production_tonnes", 10000)
        deviation = ((current - target) / target) * 100

        if deviation <= -15:
            anomalies.append({
                "mine_id": m["id"],
                "mine_name": m["name"],
                "type": "Production Anomaly",
                "expected": f"{target:,} tonnes/day",
                "reported": f"{current:,} tonnes/day",
                "deviation_percent": round(deviation, 1),
                "ai_insight": f"Production is {abs(round(deviation))}% below the recent baseline. Similar deviations occurred twice in the previous month.",
                "risk_level": "MEDIUM" if abs(deviation) < 35 else "HIGH",
                "recommended_action": "Review equipment downtime, shovel availability logs, and coal dispatch bottleneck."
            })
    return anomalies

def answer_minegov_assistant(query: str, db_context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Simulates the MineGov AI assistant delivering structured regulatory and operational answers.
    """
    q = query.lower()

    if "high-risk" in q or "high risk" in q or "safety issue" in q or "dangerous" in q:
        return {
            "title": "High-Risk Safety & Governance Issues",
            "summary": "3 high-risk safety issues were identified across operations:",
            "items": [
                {
                    "title": "Dhanbad North Mine — PPE Violations",
                    "badge": "HIGH RISK (Score: 87)",
                    "details": "8 infractions recorded at Pit 3 High-Wall; recurring across last 3 consecutive inspections.",
                    "action": "Immediate enforcement drive assigned to R. K. Sharma."
                },
                {
                    "title": "Dhanbad North Mine — Delayed Statutory Inspections",
                    "badge": "HIGH RISK (Score: 79)",
                    "details": "Ventilation shaft compliance audit overdue by 6 days under Mines Act Sec 22.",
                    "action": "DGMS special audit team mobilization recommended."
                },
                {
                    "title": "Korba Central Mine — Haul Road Dust Suppression",
                    "badge": "MEDIUM RISK (Score: 64)",
                    "details": "Misting nozzles clogged along Ramp 4 causing particulate PM10 elevation.",
                    "action": "Flush line scheduled for signoff by 30 Sep 2026."
                }
            ],
            "recommendation": "Prioritize Dhanbad North Mine pithead walkthrough and enforce contractor Form-O documentation before next shift."
        }

    if "overdue" in q or "action" in q or "corrective" in q or "pending" in q:
        return {
            "title": "Overdue & Pending Compliance Actions",
            "summary": "4 critical corrective actions require managerial review:",
            "items": [
                {
                    "title": "Biometric Gate Verification for SafeWorks Pvt Ltd",
                    "badge": "OVERDUE (Due: 27 Sep 2026)",
                    "details": "24 unverified dumper drivers flagged without Form O medical certificate.",
                    "action": "Show-cause issued; site access suspended pending clearance."
                },
                {
                    "title": "Belt 03 Conveyor Pull-Cord Re-installation",
                    "badge": "DUE TOMORROW (28 Sep 2026)",
                    "details": "High hazard risk on emergency trip switch line.",
                    "action": "80% completed by Electrical Dept; test scheduled tomorrow 10:00 AM."
                },
                {
                    "title": "Targeted PPE Compliance Enforcement Drive",
                    "badge": "DUE 29 Sep 2026",
                    "details": "Distribution of 200 high-visibility harnesses and hard hats.",
                    "action": "65% completed. Shift safety audit scheduled."
                }
            ],
            "recommendation": "Escalate contractor SafeWorks Pvt Ltd to Corporate Procurement for statutory penalty appraisal."
        }

    if "contractor" in q or "safeworks" in q or "vendor" in q:
        return {
            "title": "Contractor Statutory Risk Evaluation",
            "summary": "Contractor SafeWorks Pvt Ltd is currently ranked HIGH RISK:",
            "items": [
                {
                    "title": "SafeWorks Pvt Ltd (Dhanbad North)",
                    "badge": "COMPLIANCE: 71% | HIGH RISK",
                    "details": "142 active workers, 7 open violations (3 high-risk). Missing 24 Form-O medical certificates.",
                    "action": "AI recommends issuing penalty deduction on pending invoice."
                },
                {
                    "title": "ABC Mining Services (Singrauli & Korba)",
                    "badge": "COMPLIANCE: 94% | LOW RISK",
                    "details": "310 workers, 1 open minor observation. Full statutory documentation verified.",
                    "action": "Eligible for safety excellence commendation."
                }
            ],
            "recommendation": "Audit all subcontractor licenses expiring within the next 30 days."
        }

    if "production" in q or "tonnes" in q or "output" in q or "anomaly" in q:
        return {
            "title": "AI Production Anomaly Analysis",
            "summary": "Detected a 28% production deficit at Dhanbad North Mine:",
            "items": [
                {
                    "title": "Dhanbad North Deficit: 7,200 vs 10,000 Tonnes/day",
                    "badge": "DEFICIT -28%",
                    "details": "Blasting delay in Pit 2 compounded by Shovel #08 hydraulic hose rupture.",
                    "action": "Maintenance log cross-referenced with PESO magazine release."
                },
                {
                    "title": "Singrauli Open Cast Performance",
                    "badge": "OPTIMAL (99.1%)",
                    "details": "21,800 tonnes extracted against 22,000 target.",
                    "action": "Operating within 1.2% allowable tolerance."
                }
            ],
            "recommendation": "Review Dhanbad North Pit 2 shovel dispatch routing to prevent haulage choke."
        }

    # Default fallback intelligent response
    return {
        "title": "MineGov AI Assistant Analysis",
        "summary": f"Analyzed governance query: '{query}'. Current operational health across Eastern Coal Operations Ltd:",
        "items": [
            {
                "title": "Overall Governance Health",
                "badge": "COMPLIANCE: 87%",
                "details": "3 active mines monitored: Singrauli (96% Low Risk), Korba Central (89% Med Risk), Dhanbad North (72% High Risk).",
                "action": "All digital logs synced with DGMS compliance standard."
            },
            {
                "title": "Active Regulatory Escalations",
                "badge": "3 CRITICAL ALERTS",
                "details": "PPE non-compliance recurrence, environmental reporting cutoff, and statutory contractor audit.",
                "action": "Select 'Alerts' or 'AI Insights' in sidebar for line-item review."
            }
        ],
        "recommendation": "You can ask: 'Which mines have high-risk issues?', 'Show overdue compliance actions', 'What is SafeWorks risk status?', or 'Analyze production anomalies'."
    }
