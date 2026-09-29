import React from 'react';
import { 
  History, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileCode2, 
  Lock, 
  Cpu, 
  Bell, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function AuditTrailView({ auditLogs }) {
  const getActionIcon = (action) => {
    const act = action.toLowerCase();
    if (act.includes('observation')) return <UserCheck size={14} color="#38bdf8" />;
    if (act.includes('ai') || act.includes('risk')) return <Sparkles size={14} color="#c084fc" />;
    if (act.includes('corrective') || act.includes('assign')) return <RotateCcw size={14} color="#f59e0b" />;
    if (act.includes('notif') || act.includes('alert')) return <Bell size={14} color="#ef4444" />;
    if (act.includes('verif') || act.includes('ocr')) return <ShieldCheck size={14} color="#10b981" />;
    return <Clock size={14} color="#cbd5e1" />;
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <History size={18} color="#10b981" />
              <span>13. Immutable Digital Audit Trail & Governance Provenance</span>
            </div>
            <div className="card-desc">
              Every field observation, AI risk calculation, assignment, and managerial verification is timestamped with cryptographic hashes
            </div>
          </div>
          <span className="badge badge-low">
            <Lock size={12} /> SECURE SHA-256 LEDGER
          </span>
        </div>
      </div>

      {/* Main Timeline Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ fontSize: '15px' }}>
            <span>Chronological Traceability Chain (Observation → Closure)</span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Events: {auditLogs.length}</span>
        </div>

        <div className="timeline" style={{ paddingLeft: '36px', marginTop: '10px' }}>
          {auditLogs.map((log) => (
            <div key={log.id} className="timeline-item">
              {/* Dot */}
              <div 
                className="timeline-dot"
                style={{
                  left: '-36px',
                  width: '24px',
                  height: '24px',
                  background: '#0d1527',
                  border: '2px solid #38bdf8'
                }}
              >
                {getActionIcon(log.action)}
              </div>

              {/* Timestamp & Hash Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '3px' }}>
                <span className="timeline-time" style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600 }}>
                  {log.timestamp}
                </span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.06)' }}>
                  Hash: {log.hash}
                </span>
              </div>

              {/* Action Title */}
              <div className="timeline-title" style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{log.action}</span>
                <span className="badge" style={{ fontSize: '10px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                  {log.entity}
                </span>
              </div>

              {/* Actor & Details */}
              <div style={{ fontSize: '12px', color: '#a855f7', fontWeight: 600, marginTop: '2px' }}>
                Actor: {log.actor}
              </div>

              <div className="timeline-body" style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '6px', marginTop: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                {log.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
