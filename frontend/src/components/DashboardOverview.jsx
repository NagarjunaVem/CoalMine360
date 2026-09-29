import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  RotateCcw, 
  ClipboardCheck, 
  Users, 
  Bell,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  MapPin,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Activity,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { RadialComplianceGauge, MiniSparkline, ProductionPacingBar } from './Gauges';

export default function DashboardOverview({ 
  kpis, 
  mines, 
  aiRisks, 
  alerts, 
  onSelectMine, 
  setCurrentView,
  currentRole 
}) {
  const getRiskBadge = (level) => {
    switch (level) {
      case 'HIGH':
        return <span className="badge badge-high"><Flame size={12} /> HIGH</span>;
      case 'MEDIUM':
        return <span className="badge badge-medium"><AlertTriangle size={12} /> MEDIUM</span>;
      case 'LOW':
        return <span className="badge badge-low"><ShieldCheck size={12} /> LOW</span>;
      default:
        return <span className="badge badge-neutral">{level}</span>;
    }
  };

  return (
    <div>
      {/* Hero Command Banner with Radial Compliance Gauge */}
      <div 
        className="card" 
        style={{ 
          marginBottom: '22px', 
          background: 'linear-gradient(135deg, rgba(20, 28, 50, 0.95), rgba(10, 16, 28, 0.95))', 
          borderColor: 'rgba(245, 158, 11, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(245, 158, 11, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          
          {/* Left: Product Vision & Quick Walkthrough */}
          <div style={{ flex: '1 1 450px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-ai" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <Sparkles size={12} /> SMART INDIA HACKATHON 2026 • PS 26024
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#fbbf24' }}>
                Eastern Coal Operations Ltd.
              </span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '6px', lineHeight: 1.2 }}>
              Centralized AI Governance & Statutory Monitoring Platform
            </h2>

            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
              One unified digital governance layer connecting pit inspections, real-time telemetry, DGMS regulatory mandates, contractor compliance, and corrective action lifecycles.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                id="btn-demo-start-field"
                onClick={() => setCurrentView('field-inspection')}
                className="btn btn-primary"
                style={{ padding: '8px 18px' }}
              >
                <Activity size={15} /> Launch Field Simulator <ArrowRight size={14} />
              </button>
              <button 
                id="btn-demo-inspect-dhanbad"
                onClick={() => onSelectMine(mines.find(m => m.id === 'mine-1') || mines[0])}
                className="btn btn-outline-amber"
              >
                Drill-down Dhanbad North (High Risk)
              </button>
            </div>
          </div>

          {/* Right: Radial Speedometer Gauge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', background: 'rgba(0,0,0,0.3)', padding: '16px 22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <RadialComplianceGauge value={kpis?.compliance_rate ?? 87} size={150} label="Org Compliance" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>DGMS Benchmark:</span>
                <div style={{ fontWeight: 700, color: '#34d399' }}>85.0% Mandatory</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Audit Status:</span>
                <span className="badge badge-low" style={{ marginTop: '2px' }}>Compliant Baseline</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* High-level KPIs Grid with Embedded Sparklines */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Mines</span>
            <div className="kpi-icon-wrap"><Building2 size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value">{kpis?.total_mines ?? 3}</div>
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Active Mining Units</div>
            </div>
            <MiniSparkline data={[3, 3, 3, 3, 3, 3]} color="#38bdf8" />
          </div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Compliance Rate</span>
            <div className="kpi-icon-wrap"><ShieldCheck size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value">{kpis?.compliance_rate ?? 87}%</div>
              <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 600 }}>+2.4% vs last qtr</div>
            </div>
            <MiniSparkline data={[82, 83, 85, 84, 86, 87]} color="#10b981" />
          </div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Open Violations</span>
            <div className="kpi-icon-wrap"><AlertTriangle size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value" id="kpi-open-violations">{kpis?.open_violations ?? 18}</div>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>Requires Mitigation</div>
            </div>
            <MiniSparkline data={[14, 15, 17, 16, 18, kpis?.open_violations ?? 18]} color="#ef4444" />
          </div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">High-Risk Issues</span>
            <div className="kpi-icon-wrap"><Flame size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value" id="kpi-high-risk">{kpis?.high_risk_issues ?? 5}</div>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>AI Priority P1</div>
            </div>
            <MiniSparkline data={[3, 4, 4, 5, 5, kpis?.high_risk_issues ?? 5]} color="#f43f5e" />
          </div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Pending Actions</span>
            <div className="kpi-icon-wrap"><RotateCcw size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value">{kpis?.pending_corrective_actions ?? 12}</div>
              <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>Under SLA Tracking</div>
            </div>
            <MiniSparkline data={[8, 9, 11, 10, 12, 12]} color="#f59e0b" />
          </div>
        </div>

        <div className="kpi-card cyan">
          <div className="kpi-top">
            <span className="kpi-label">Inspections Month</span>
            <div className="kpi-icon-wrap"><ClipboardCheck size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value">{kpis?.inspections_this_month ?? 46}</div>
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Audits Logged</div>
            </div>
            <MiniSparkline data={[32, 35, 38, 42, 44, 46]} color="#06b6d4" />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Contractors</span>
            <div className="kpi-icon-wrap"><Users size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value">{kpis?.active_contractors ?? 28}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Form-O Screened</div>
            </div>
            <MiniSparkline data={[26, 26, 27, 28, 28, 28]} color="#a855f7" />
          </div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Critical Alerts</span>
            <div className="kpi-icon-wrap"><Bell size={18} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-value" id="kpi-critical-alerts">{kpis?.critical_alerts ?? 3}</div>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>Unacknowledged</div>
            </div>
            <MiniSparkline data={[1, 2, 2, 3, 3, kpis?.critical_alerts ?? 3]} color="#f43f5e" />
          </div>
        </div>
      </div>

      {/* Two Column Section: Mine Health Overview + AI Risk Engine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Section 1: Mine Health Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Building2 size={18} color="#f59e0b" />
                <span>1. Mine Health Overview & Pacing</span>
              </div>
              <div className="card-desc">Click any mine row to launch site-level governance ledger</div>
            </div>
            <button 
              onClick={() => setCurrentView('mines')}
              className="btn btn-secondary btn-sm"
            >
              Operations <ExternalLink size={12} />
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Mine Unit</th>
                  <th style={{ textAlign: 'right' }}>Compliance</th>
                  <th>Risk Level</th>
                  <th style={{ textAlign: 'right' }}>Open Issues</th>
                  <th style={{ textAlign: 'right' }}>Inspections</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mines.map((mine) => (
                  <tr 
                    key={mine.id} 
                    id={`mine-row-${mine.id}`}
                    className="clickable"
                    onClick={() => onSelectMine(mine)}
                  >
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '13.5px' }}>{mine.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{mine.state} • {mine.type}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span style={{ 
                        fontWeight: 800,
                        fontSize: '14px',
                        color: mine.compliance_rate >= 90 ? '#34d399' : mine.compliance_rate >= 80 ? '#fbbf24' : '#f87171' 
                      }}>
                        {mine.compliance_rate}%
                      </span>
                    </td>
                    <td>{getRiskBadge(mine.risk_level)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: mine.open_issues > 8 ? '#f87171' : '#f1f5f9' }}>
                      {mine.open_issues}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 500, color: '#94a3b8' }}>
                      {mine.inspections_count}
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline-amber btn-sm"
                        style={{ padding: '4px 9px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMine(mine);
                        }}
                      >
                        Drill-down <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Production Pacing Indicators */}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Daily Production vs Extraction Target:
            </div>
            {mines.map(m => (
              <ProductionPacingBar 
                key={m.id} 
                target={m.daily_target_tonnes} 
                actual={m.current_production_tonnes} 
                label={m.name} 
              />
            ))}
          </div>
        </div>

        {/* Section 2: AI Risk Engine */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Sparkles size={18} color="#c084fc" />
                <span>2. AI Risk Engine — Priority Insights</span>
              </div>
              <div className="card-desc">Continuous multi-factor telemetry & statutory non-compliance audit</div>
            </div>
            <button 
              onClick={() => setCurrentView('ai-insights')}
              className="btn btn-secondary btn-sm"
            >
              All AI Insights <ExternalLink size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {aiRisks.slice(0, 3).map((risk) => (
              <div 
                key={risk.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  borderLeft: risk.risk_level === 'HIGH' ? '4px solid #ef4444' : '4px solid #f59e0b',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#fff' }}>
                    {risk.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#fbbf24', fontWeight: 700 }}>
                      Score: {risk.risk_score}/100
                    </span>
                    {getRiskBadge(risk.risk_level)}
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: '#e2e8f0', marginBottom: '8px', lineHeight: 1.4 }}>
                  <strong style={{ color: '#c084fc' }}>AI Detection:</strong> “{risk.ai_detection}”
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                  <span><strong>Pattern:</strong> {risk.recent_trend}</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>Rec: {risk.recommended_action.slice(0, 48)}...</span>
                </div>
              </div>
            ))}

            <div style={{ padding: '10px 14px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.25)', fontSize: '11.5px', color: '#d8b4fe', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={15} color="#c084fc" />
              <span>* AI-generated insights assist mine safety officers & DGMS observers; statutory jurisdiction remains with authorized inspectors.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Critical Escalations Row */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Bell size={18} color="#ef4444" />
            <span>Active Critical Escalations & Statutory Reminders</span>
          </div>
          <button 
            onClick={() => setCurrentView('alerts')}
            className="btn btn-secondary btn-sm"
          >
            Manage Escalations <ChevronRight size={12} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: alert.type === 'CRITICAL' ? '1px solid rgba(239, 68, 68, 0.45)' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '16px',
                position: 'relative',
                boxShadow: alert.type === 'CRITICAL' ? '0 0 15px rgba(239, 68, 68, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className={alert.type === 'CRITICAL' ? 'badge badge-high' : alert.type === 'WARNING' ? 'badge badge-medium' : 'badge badge-neutral'}>
                  {alert.type}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  {alert.timestamp}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#fff', marginBottom: '4px' }}>
                {alert.title}
              </div>
              <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700, marginBottom: '8px' }}>
                {alert.mine_name}
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', marginBottom: '10px', lineHeight: 1.4 }}>
                {alert.message}
              </p>

              <div style={{ fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                <strong>Escalation:</strong> <span style={{ color: '#e2e8f0' }}>{alert.escalation_chain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
