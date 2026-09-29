import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardOverview from './components/DashboardOverview';
import MineOperations from './components/MineOperations';
import ComplianceView from './components/ComplianceView';
import InspectionsView from './components/InspectionsView';
import FieldInspectionSimulator from './components/FieldInspectionSimulator';
import GISMineMap from './components/GISMineMap';
import ViolationsView from './components/ViolationsView';
import CorrectiveActionsView from './components/CorrectiveActionsView';
import ContractorView from './components/ContractorView';
import AIInsightsView from './components/AIInsightsView';
import AlertsView from './components/AlertsView';
import DocumentOCRDemo from './components/DocumentOCRDemo';
import MineGovAssistantModal from './components/MineGovAssistantModal';
import MineGovAssistantView from './components/MineGovAssistantView';
import AuditTrailView from './components/AuditTrailView';
import MineDetailModal from './components/MineDetailModal';

// Seed fallback data in case of cold start
const DEFAULT_MINES = [
  {
    id: "mine-1",
    name: "Dhanbad North Mine",
    state: "Jharkhand",
    type: "Underground & Open Cast",
    status: "Operational",
    compliance_rate: 72,
    risk_level: "HIGH",
    risk_score: 87,
    open_issues: 11,
    inspections_count: 18,
    coordinates: { lat: 23.7957, lng: 86.4304 },
    manager: "Dr. A. K. Banerjee",
    safety_officer: "R. K. Sharma",
    daily_target_tonnes: 10000,
    current_production_tonnes: 7200,
    active_workforce: 1420,
    air_quality_aqi: 188,
    water_discharge_ph: 7.8,
    summary: "Heavy extraction zone with repeated PPE compliance gaps and contractor safety lapses.",
    recent_trend: "Increasing Safety Observations (+34% over 4 inspections)"
  },
  {
    id: "mine-2",
    name: "Korba Central Mine",
    state: "Chhattisgarh",
    type: "Open Cast Project",
    status: "Operational",
    compliance_rate: 89,
    risk_level: "MEDIUM",
    risk_score: 58,
    open_issues: 5,
    inspections_count: 15,
    coordinates: { lat: 22.3595, lng: 82.7501 },
    manager: "Smt. Sunita Verma",
    safety_officer: "V. P. Nambiar",
    daily_target_tonnes: 14000,
    current_production_tonnes: 13850,
    active_workforce: 1180,
    air_quality_aqi: 142,
    water_discharge_ph: 7.2,
    summary: "High-volume open cast pit; environmental periodic monitoring documentation pending submission.",
    recent_trend: "Stable operations, air quality monitoring compliance due"
  },
  {
    id: "mine-3",
    name: "Singrauli Open Cast Mine",
    state: "Madhya Pradesh",
    type: "Mega Open Cast Pit",
    status: "Operational",
    compliance_rate: 96,
    risk_level: "LOW",
    risk_score: 24,
    open_issues: 2,
    inspections_count: 13,
    coordinates: { lat: 24.1997, lng: 82.6644 },
    manager: "Er. Mohit Deshmukh",
    safety_officer: "Anil S. Chauhan",
    daily_target_tonnes: 22000,
    current_production_tonnes: 21800,
    active_workforce: 2150,
    air_quality_aqi: 94,
    water_discharge_ph: 7.1,
    summary: "Benchmark mining zone adhering strictly to statutory DGMS and MoEFCC directives.",
    recent_trend: "Consistent benchmark compliance, preventive maintenance on schedule"
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('mine_official');
  const [selectedMineModal, setSelectedMineModal] = useState(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  // App Data states
  const [kpis, setKpis] = useState({
    total_mines: 3,
    compliance_rate: 87,
    open_violations: 18,
    high_risk_issues: 5,
    pending_corrective_actions: 12,
    inspections_this_month: 46,
    active_contractors: 28,
    critical_alerts: 3
  });
  const [mines, setMines] = useState(DEFAULT_MINES);
  const [complianceList, setComplianceList] = useState([]);
  const [inspectionsList, setInspectionsList] = useState([]);
  const [violationsList, setViolationsList] = useState([]);
  const [actionsList, setActionsList] = useState([]);
  const [contractorsList, setContractorsList] = useState([]);
  const [alertsList, setAlertsList] = useState([]);
  const [aiInsights, setAiInsights] = useState({ risks: [], production_anomalies: [], compliance_pattern: null });
  const [auditLogs, setAuditLogs] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Fetch initial data
  const loadAllData = async () => {
    try {
      const [dashRes, minesRes, compRes, inspRes, violRes, caRes, contRes, alertsRes, aiRes, auditRes] = await Promise.all([
        fetch('/api/dashboard').then(r => r.ok ? r.json() : null),
        fetch('/api/mines').then(r => r.ok ? r.json() : null),
        fetch('/api/compliance').then(r => r.ok ? r.json() : null),
        fetch('/api/inspections').then(r => r.ok ? r.json() : null),
        fetch('/api/violations').then(r => r.ok ? r.json() : null),
        fetch('/api/corrective-actions').then(r => r.ok ? r.json() : null),
        fetch('/api/contractors').then(r => r.ok ? r.json() : null),
        fetch('/api/alerts').then(r => r.ok ? r.json() : null),
        fetch('/api/ai-insights').then(r => r.ok ? r.json() : null),
        fetch('/api/audit-logs').then(r => r.ok ? r.json() : null),
      ]);

      if (dashRes?.kpis) setKpis(dashRes.kpis);
      if (minesRes) setMines(minesRes);
      if (compRes) setComplianceList(compRes);
      if (inspRes) setInspectionsList(inspRes);
      if (violRes) setViolationsList(violRes);
      if (caRes) setActionsList(caRes);
      if (contRes) setContractorsList(contRes);
      if (alertsRes) setAlertsList(alertsRes);
      if (aiRes) setAiInsights(aiRes);
      if (auditRes) setAuditLogs(auditRes);
    } catch (err) {
      console.warn("Could not connect to FastAPI backend yet, using local fallback state", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Action: Submit Field Observation
  const handleSubmitObservation = async (obsData) => {
    try {
      const res = await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obsData)
      });
      const data = await res.json();
      
      // Update KPIs immediately
      if (data.kpis_updated) {
        setKpis(data.kpis_updated);
      } else {
        setKpis(prev => ({
          ...prev,
          open_violations: prev.open_violations + 1,
          high_risk_issues: obsData.severity === 'HIGH' ? prev.high_risk_issues + 1 : prev.high_risk_issues
        }));
      }

      await loadAllData();
      showToast("✓ Observation Recorded, AI Risk Calculated & Action Assigned to Safety Officer!");
      return data;
    } catch (err) {
      console.error(err);
      // Fallback local update
      setKpis(prev => ({
        ...prev,
        open_violations: prev.open_violations + 1,
        high_risk_issues: prev.high_risk_issues + 1
      }));
      showToast("✓ Observation Recorded (Local Fallback)");
      return {
        timestamp: "27 Sep 2026, 10:42 AM",
        evidence: obsData.photo_filename,
        risk_score: 87,
        risk_level: "HIGH",
        violation_id: "viol-new",
        corrective_action_id: "ca-new"
      };
    }
  };

  // Action: Update Corrective Action Status
  const handleUpdateActionStatus = async (actionId, status, note) => {
    try {
      await fetch(`/api/corrective-actions/${actionId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note })
      });
      await loadAllData();
      showToast(`Action #${actionId.toUpperCase()} moved to ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Action: Alert Actions (Acknowledge, Assign, Escalate)
  const handleAlertAction = async (alertId, action, assignedTo) => {
    try {
      await fetch(`/api/alerts/${alertId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, assigned_to: assignedTo })
      });
      await loadAllData();
      showToast(`Alert #${alertId} ${action.toUpperCase()} successfully processed.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Action: Upload Statutory Document
  const handleUploadDoc = async (fileName) => {
    try {
      const res = await fetch(`/api/documents/upload?file_name=${encodeURIComponent(fileName)}`, {
        method: 'POST'
      });
      const data = await res.json();
      await loadAllData();
      showToast("✓ Statutory Document OCR extracted & mapped to compliance register!");
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Action: Ask MineGov Assistant
  const handleAskAssistant = async (query) => {
    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      return await res.json();
    } catch (err) {
      return {
        title: "MineGov Assistant (Offline Mode)",
        summary: "Queried: " + query,
        items: [
          {
            title: "Dhanbad North Safety Infractions",
            badge: "HIGH RISK",
            details: "Repeated PPE violations across 3 consecutive cycles.",
            action: "Field audit mandatory."
          }
        ]
      };
    }
  };

  // Action: Reset Demo Data
  const handleResetData = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/reset-data', { method: 'POST' });
      await loadAllData();
      showToast("Demo data reset to initial baseline (18 violations, 5 high-risk issues)");
    } catch (err) {
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        alertCount={alertsList.filter(a => !a.acknowledged).length || kpis.critical_alerts}
        openViolationsCount={kpis.open_violations}
      />

      {/* Main Work Area */}
      <div className="main-area">
        {/* Topbar Header */}
        <Topbar 
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          onResetData={handleResetData}
          onOpenAssistant={() => setAssistantOpen(true)}
          setCurrentView={setCurrentView}
          isResetting={isResetting}
        />

        {/* Scrollable View Content */}
        <main className="content-scrollable">
          {currentView === 'dashboard' && (
            <DashboardOverview 
              kpis={kpis}
              mines={mines}
              aiRisks={aiInsights.risks}
              alerts={alertsList}
              onSelectMine={(mine) => setSelectedMineModal(mine)}
              setCurrentView={setCurrentView}
              currentRole={currentRole}
            />
          )}

          {currentView === 'mines' && (
            <MineOperations 
              mines={mines}
              onSelectMine={(mine) => setSelectedMineModal(mine)}
            />
          )}

          {currentView === 'compliance' && (
            <ComplianceView 
              complianceList={complianceList}
            />
          )}

          {currentView === 'inspections' && (
            <InspectionsView 
              inspectionsList={inspectionsList}
              onLaunchFieldInspection={(mineId) => {
                setCurrentView('field-inspection');
              }}
            />
          )}

          {currentView === 'field-inspection' && (
            <FieldInspectionSimulator 
              mines={mines}
              onSubmitObservation={handleSubmitObservation}
              setCurrentView={setCurrentView}
              onSelectMine={(mine) => setSelectedMineModal(mine)}
            />
          )}

          {currentView === 'gis-map' && (
            <GISMineMap 
              mines={mines}
              violations={violationsList}
              alerts={alertsList}
              onSelectMine={(mine) => setSelectedMineModal(mine)}
            />
          )}

          {currentView === 'violations' && (
            <ViolationsView 
              violationsList={violationsList}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'corrective-actions' && (
            <CorrectiveActionsView 
              actionsList={actionsList}
              onUpdateActionStatus={handleUpdateActionStatus}
            />
          )}

          {currentView === 'contractors' && (
            <ContractorView 
              contractorsList={contractorsList}
            />
          )}

          {currentView === 'ai-insights' && (
            <AIInsightsView 
              aiInsights={aiInsights}
              onLaunchFieldInspection={() => setCurrentView('field-inspection')}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'alerts' && (
            <AlertsView 
              alertsList={alertsList}
              onAlertAction={handleAlertAction}
            />
          )}

          {currentView === 'ocr-demo' && (
            <DocumentOCRDemo 
              onUploadDoc={handleUploadDoc}
            />
          )}

          {currentView === 'assistant' && (
            <MineGovAssistantView 
              onAskAssistant={handleAskAssistant}
              setCurrentView={setCurrentView}
              onSelectMine={(mine) => setSelectedMineModal(mine)}
            />
          )}

          {currentView === 'audit-trail' && (
            <AuditTrailView 
              auditLogs={auditLogs}
            />
          )}
        </main>
      </div>

      {/* Mine Detail Modal */}
      {selectedMineModal && (
        <MineDetailModal 
          mine={selectedMineModal}
          onClose={() => setSelectedMineModal(null)}
          complianceList={complianceList}
          inspectionsList={inspectionsList}
          violationsList={violationsList}
          actionsList={actionsList}
          onLaunchFieldInspection={() => {
            setSelectedMineModal(null);
            setCurrentView('field-inspection');
          }}
        />
      )}

      {/* MineGov AI Assistant Drawer Modal */}
      <MineGovAssistantModal 
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onAskAssistant={handleAskAssistant}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span className="pulse-indicator"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
