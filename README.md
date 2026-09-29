# CoalMine360 — AI-Powered Smart Governance & Compliance Platform

> **Smart India Hackathon 2026 | Problem Statement: PS 26024**  
> Organization: **Eastern Coal Operations Ltd.**  
> Concept: *“One digital governance layer connecting every mine, inspection, compliance activity, contractor, risk, and corrective action in real time.”*

---

## 🌟 Solution Overview

**CoalMine360** transforms fragmented coal-mine governance into one centralized, AI-assisted, evidence-driven governance system. It connects field activities, statutory compliance, inspections, contractors, risks, and corrective actions in real time.

The central workflow demonstrated in this prototype:
```
Mine Operations ➔ Field Data ➔ Compliance Monitoring ➔ AI Risk Detection ➔ Alerts ➔ Corrective Action ➔ Verification ➔ Management Dashboard ➔ Audit Trail
```

---

## 🏗️ Architecture & Technology Stack

```
                     CoalMine360
                          |
             ┌────────────┴────────────┐
             |                         |
          React UI                Field UI
             |                         |
             └────────────┬────────────┘
                          |
                       FastAPI
                          |
             ┌────────────┼────────────┐
             |            |            |
         Compliance    AI Risk      Workflow
          Engine       Engine        Engine
             |            |            |
             └────────────┼────────────┘
                          |
                      SQLite/JSON
                          |
                   Dummy Mine Data
```

- **Frontend**: React 19 + Vite 8 + Lucide Icons + Canvas Confetti
- **Styling**: Tailored Dark Industrial Command Center (Vanilla CSS design system with HSL tailored glassmorphic cards, glowing borders, crisp pill badges, and mobile handheld simulation viewport)
- **Backend**: Python 3.13 + FastAPI + Uvicorn
- **Persistence**: Real-time reactive JSON/SQLite storage layer (`store.json`) with auto-recalculation of KPIs upon every mutation.

---

## 🏢 Fictional Organization & Mining Units

- **Eastern Coal Operations Ltd.**
  1. **Dhanbad North Mine** (Jharkhand) — Operational | **Risk: HIGH (Score: 87)** | Compliance: 72% | Open Issues: 11 | Inspections: 18
  2. **Korba Central Mine** (Chhattisgarh) — Operational | **Risk: MEDIUM (Score: 58)** | Compliance: 89% | Open Issues: 5 | Inspections: 15
  3. **Singrauli Open Cast Mine** (Madhya Pradesh) — Operational | **Risk: LOW (Score: 24)** | Compliance: 96% | Open Issues: 2 | Inspections: 13

---

## 🚀 14 Core Functional Modules Implemented

1. **Main Executive Dashboard**: High-level KPIs, 3-Mine health comparison table, AI risk priority stream, and critical alerts strip.
2. **Mine Operations Drill-Down**: Individual site portals for Dhanbad North, Korba Central, and Singrauli with environmental telemetry (CAAQMS AQI & water pH) and production targets.
3. **Statutory Compliance Monitoring**: Four pillars (Safety, Environment, Labour, Production) mapped against Mines Act 1952, CMR 2017, and MoEFCC directives.
4. **Inspection Management**: Upcoming scheduled audits vs recent completed inspections with observation counts (total, critical, resolved, pending).
5. **Field Inspection Handheld Simulator**: Mobile viewport with simulated GPS geo-tag capture, timestamping, camera evidence attachment, and instantaneous AI risk calculation.
6. **GIS Mine Map**: Spatial geo-governance visualization with state corridors, open-cast pit perimeters, risk heat spots, and interactive mine nodes.
7. **Corrective Action Lifecycle**: 5-stage progression (`Observation → Violation Logged → Corrective Action → Verification → Closure & Signed`) with interactive advancement controls.
8. **Alert & Multi-Tier Escalation Dispatcher**: Critical, warning, and reminder escalations with live `[ Acknowledge ]`, `[ Assign ]`, and `[ Escalate to CMD & DGMS ]` actions.
9. **AI Anomaly & Pattern Detection**: Production deficit detection (e.g. -28% output anomaly at Dhanbad North) and recurring violation pattern detection across consecutive inspection cycles.
10. **Contractor Statutory Governance**: Scorecards for SafeWorks Pvt Ltd (71% High Risk), ABC Mining Services (94% Low Risk), and Eastern Contractors (86% Medium Risk) with Form-O medical checks.
11. **Document / OCR Pipeline Demo**: 4-stage optical character recognition simulator extracting certificate numbers, validity dates, and mapping them directly to statutory registers.
12. **MineGov AI Governance Copilot**: Conversational intelligence assistant answering natural regulatory and operational queries with structured answers.
13. **Digital Audit Trail**: Cryptographic SHA-256 hash-sealed ledger logging actors, entities, timestamps, and governance decisions.
14. **Role-Based Views Switcher**: Instant switching between `[ Mine Official ]`, `[ Corporate Management ]`, `[ Field Inspector ]`, and `[ Regulatory Authority ]`.

---

## 🎯 10-Step Judge Demonstration Flow

1. **Open Main Dashboard**: Show multi-mine KPIs (3 Mines, 87% Compliance, 18 Open Violations, 5 High-Risk Issues, 12 Pending Actions).
2. **Click Dhanbad North Mine**: Review site telemetry, 72% compliance rate, and 11 open issues across pitheads.
3. **Inspect AI Insights**: Observe the AI warning: *"Repeated safety observations related to PPE violations recorded across last 4 inspections (Score: 87/100 HIGH)"*.
4. **Click the Violation**: View evidence attachment `#DN-Pit3-20260925.jpg` and inspection finding details.
5. **Launch Field Inspection Simulator**: View the mobile phone screen. Review auto-captured GPS `(23.7957° N, 86.4304° E)` and timestamp. Click **`[ Submit Observation ]`**.
6. **Verify Automatic AI Workflow**: Watch the screen confirm:
   - `✓ Observation Recorded`
   - `✓ AI Risk Computed (Score: 99/100 HIGH)`
   - `✓ Violation ID Generated`
   - `✓ Corrective Action Assigned to Safety Officer`
   - `✓ Mine Manager Notified via SMS & Portal`
7. **Return to Dashboard**: Verify that the KPI cards have updated dynamically in real time:
   - **Open Violations**: Incremented from 18 → 19
   - **High-Risk Issues**: Incremented from 5 → 6
   - **Dhanbad Open Issues**: Incremented from 11 → 12
8. **Open Corrective Actions**: See the new remediation task with its 5-stage lifecycle and click **"Submit for Verification"** or **"Sign-off & Close"**.
9. **Test MineGov AI Copilot**: Click **"MineGov AI"** in the top bar, click a quick prompt like *"Which mines currently have high-risk safety issues?"*, and observe the structured response.
10. **Open Digital Audit Trail**: Trace the exact immutable cryptographic chain of custody from the inspector's geo-tag to managerial signoff.

---

## 🏃 Running the Application

Double-click `run.bat` or run:

```bash
# Terminal 1: Start Backend
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

Open:
- **Frontend Application**: `http://127.0.0.1:5173/`
- **FastAPI Interactive Docs**: `http://127.0.0.1:8000/docs`
