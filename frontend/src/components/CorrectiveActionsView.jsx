import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  Calendar,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function CorrectiveActionsView({ actionsList, onUpdateActionStatus }) {
  const [updatingId, setUpdatingId] = useState(null);

  const stepsList = [
    { key: 'OPEN', label: '1. Observation' },
    { key: 'ASSIGNED', label: '2. Violation Logged' },
    { key: 'IN PROGRESS', label: '3. Corrective Action' },
    { key: 'VERIFICATION', label: '4. Verification' },
    { key: 'CLOSED', label: '5. Closure & Signed' }
  ];

  const handleAdvance = async (action, nextStatus) => {
    setUpdatingId(action.id);
    try {
      await onUpdateActionStatus(action.id, nextStatus, `Updated to ${nextStatus} via Governance Workflow`);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <RotateCcw size={18} color="#f59e0b" />
              <span>7. Corrective Action Lifecycle & Verification Workflow</span>
            </div>
            <div className="card-desc">
              End-to-end accountability loop: Observation → Violation → Corrective Action → Verification → Closure
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: '#cbd5e1', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: '6px' }}>
            <span>Statutory Lifecycle SLA Target: <strong>&lt; 5 Days</strong></span>
          </div>
        </div>
      </div>

      {/* Lifecycle Visualizer Banner */}
      <div className="card" style={{ marginBottom: '20px', background: 'rgba(15, 23, 42, 0.9)' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.6px' }}>
          Statutory Multi-Stage Governance Pipeline
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: '10px' }}>
          {stepsList.map((step, idx) => (
            <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f59e0b', color: '#000', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {idx + 1}
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#f1f5f9' }}>{step.label}</span>
              </div>
              {idx < stepsList.length - 1 && (
                <ArrowRight size={14} color="#64748b" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Corrective Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {actionsList.map((action) => {
          const isClosed = action.status === 'CLOSED';
          const isVerif = action.status === 'VERIFICATION';
          const isProgress = action.status === 'IN PROGRESS';

          return (
            <div 
              key={action.id}
              className="card"
              style={{
                borderColor: isClosed ? 'rgba(16, 185, 129, 0.4)' : isVerif ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.4)',
                background: 'linear-gradient(135deg, rgba(18, 26, 43, 0.95), rgba(11, 17, 30, 0.95))'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-neutral">{action.id.toUpperCase()}</span>
                    <span className={action.severity === 'HIGH' ? 'badge badge-high' : 'badge badge-medium'}>
                      {action.severity} SEVERITY
                    </span>
                    <span className={isClosed ? 'badge badge-low' : isVerif ? 'badge' : 'badge badge-medium'} style={isVerif ? { background: 'rgba(56,189,248,0.2)', color: '#38bdf8' } : {}}>
                      {action.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>
                    {action.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600 }}>
                    {action.mine_name} • Assigned To: {action.assigned_to}
                  </div>
                </div>

                {/* Status action buttons */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {isProgress && (
                    <button
                      id={`btn-advance-verif-${action.id}`}
                      onClick={() => handleAdvance(action, 'VERIFICATION')}
                      disabled={updatingId === action.id}
                      className="btn btn-primary btn-sm"
                    >
                      {updatingId === action.id ? <RefreshCw size={12} className="spin" /> : <ArrowRight size={13} />}
                      Submit for Verification
                    </button>
                  )}
                  {isVerif && (
                    <button
                      id={`btn-close-action-${action.id}`}
                      onClick={() => handleAdvance(action, 'CLOSED')}
                      disabled={updatingId === action.id}
                      className="btn btn-sm"
                      style={{ background: '#10b981', color: '#000', fontWeight: 700 }}
                    >
                      {updatingId === action.id ? <RefreshCw size={12} className="spin" /> : <CheckCircle2 size={13} />}
                      Sign-off & Close Violation
                    </button>
                  )}
                  {isClosed && (
                    <span className="badge badge-low" style={{ padding: '6px 12px' }}>
                      <CheckCircle2 size={13} /> COMPLIANCE VERIFIED
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Remediation Progress:</span>
                  <span style={{ fontWeight: 700, color: action.progress_percent >= 90 ? '#34d399' : '#fbbf24' }}>
                    {action.progress_percent}%
                  </span>
                </div>
                <div className="progress-bar-wrap">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${action.progress_percent}%`,
                      background: action.progress_percent >= 90 ? '#10b981' : '#f59e0b'
                    }} 
                  />
                </div>
              </div>

              {/* Lifecycle Step Timeline */}
              <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '10px' }}>
                  Lifecycle Trail Steps:
                </div>
                <div className="timeline">
                  {action.lifecycle_steps.map((st, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className={`timeline-dot ${st.status === 'COMPLETED' ? 'done' : st.status === 'IN PROGRESS' ? 'active' : ''}`}>
                        {st.status === 'COMPLETED' && <CheckCircle2 size={10} color="#000" />}
                      </div>
                      <div className="timeline-time">{st.date}</div>
                      <div className="timeline-title">{st.step}</div>
                      <div className="timeline-body">{st.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ fontSize: '11.5px', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>Resolution SLA Deadline:</strong> {action.due_date}</span>
                <span style={{ color: '#64748b' }}>Assigned Date: {action.assigned_date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
