import React from 'react';
import { 
  Sparkles, 
  TrendingDown, 
  AlertTriangle, 
  Flame, 
  Lightbulb, 
  Layers, 
  Cpu, 
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function AIInsightsView({ aiInsights, onLaunchFieldInspection, setCurrentView }) {
  const risks = aiInsights?.risks || [];
  const anomalies = aiInsights?.production_anomalies || [];
  const pattern = aiInsights?.compliance_pattern;

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <Sparkles size={18} color="#c084fc" />
              <span>9. AI Anomaly Detection & Predictive Governance Engine</span>
            </div>
            <div className="card-desc">
              Multi-dimensional analytics screening operational logs, sensor telemetry, and statutory inspection histories
            </div>
          </div>
          <span className="badge badge-ai">ACTIVE MODEL: GOV-MINING-V2.4</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Production Anomaly Section */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <TrendingDown size={16} color="#ef4444" />
              <span>Production Anomaly Detection</span>
            </div>
            <span className="badge badge-medium">TELEMETRY ANOMALY</span>
          </div>

          {anomalies.map((anom, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>{anom.mine_name}</span>
                <span className="badge badge-high">{anom.deviation_percent}% DEFICIT</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: '#94a3b8' }}>Expected Baseline:</span>
                  <div style={{ fontWeight: 700, color: '#34d399' }}>{anom.expected}</div>
                </div>
                <div>
                  <span style={{ color: '#94a3b8' }}>Reported Daily:</span>
                  <div style={{ fontWeight: 700, color: '#f87171' }}>{anom.reported}</div>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: '#f1f5f9', background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>AI Insight:</strong> “{anom.ai_insight}”
              </p>

              <div style={{ fontSize: '12px', color: '#38bdf8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                <strong>Recommended Action:</strong> {anom.recommended_action}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Pattern Section */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <AlertTriangle size={16} color="#fbbf24" />
              <span>Compliance Recurrence Pattern</span>
            </div>
            <span className="badge badge-high">RECURRING HAZARD</span>
          </div>

          {pattern && (
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>Dhanbad North Mine</span>
                <span className="badge badge-high">Score: {pattern.risk_score}/100</span>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', padding: '10px', fontSize: '12.5px', color: '#fca5a5' }}>
                <strong>AI Detection:</strong> “{pattern.observation_increase}”
              </div>

              {/* Multi-Cycle Detection Timeline snippet */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '11px', color: '#cbd5e1' }}>
                <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>RECURRING EVIDENCE AUDIT:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div>• Inspection 1 (02 Sep): PPE violation detected</div>
                  <div>• Inspection 2 (10 Sep): PPE violation detected</div>
                  <div>• Inspection 3 (18 Sep): PPE violation detected</div>
                  <div>• Inspection 4 (25 Sep): PPE violation detected (8 workers)</div>
                </div>
                <div style={{ marginTop: '6px', color: '#f87171', fontWeight: 700 }}>
                  → Flagged as Systemic Governance Failure
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#38bdf8' }}>
                <strong>Recommended Action:</strong> {pattern.recommended_action}
              </div>

              <button 
                id="btn-ai-initiate-review"
                onClick={() => onLaunchFieldInspection('mine-1')}
                className="btn btn-outline-amber btn-sm"
                style={{ width: '100%', marginTop: '4px' }}
              >
                Initiate Targeted Safety Review Walkthrough <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* High-Risk Areas List */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <div className="card-title">
            <Flame size={18} color="#ef4444" />
            <span>Active High-Risk Areas Across Eastern Coal Operations</span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time Risk Index</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {risks.map((risk) => (
            <div 
              key={risk.id}
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#38bdf8' }}>
                  {risk.category}
                </span>
                <span className={risk.risk_level === 'HIGH' ? 'badge badge-high' : risk.risk_level === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
                  {risk.risk_level} ({risk.risk_score})
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                {risk.title}
              </div>

              <p style={{ fontSize: '12px', color: '#cbd5e1' }}>
                “{risk.ai_detection}”
              </p>

              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                <strong>Trend:</strong> {risk.recent_trend}
              </div>

              <div style={{ fontSize: '11.5px', color: '#fbbf24', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px', marginTop: '4px' }}>
                <strong>Action:</strong> {risk.recommended_action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
