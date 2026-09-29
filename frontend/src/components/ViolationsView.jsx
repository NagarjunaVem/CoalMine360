import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  FileText, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';

export default function ViolationsView({ violationsList, setCurrentView, onSelectViolation }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filtered = filterSeverity === 'ALL'
    ? violationsList
    : violationsList.filter(v => v.severity === filterSeverity);

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <AlertTriangle size={18} color="#ef4444" />
              <span>Statutory Non-Compliance & Safety Violations Registry</span>
            </div>
            <div className="card-desc">
              Tracks field observations converted into formal compliance infractions requiring statutory mitigation
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`btn btn-sm ${filterSeverity === sev ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '11px', padding: '5px 10px' }}
              >
                {sev === 'ALL' ? 'All Violations' : `${sev} Severity`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Violations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
        {filtered.map((viol) => (
          <div 
            key={viol.id}
            id={`violation-card-${viol.id}`}
            className="card"
            style={{
              borderColor: viol.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)',
              background: viol.severity === 'HIGH' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(15, 23, 42, 0.9))' : 'var(--bg-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                {viol.category}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className={viol.severity === 'HIGH' ? 'badge badge-high' : 'badge badge-medium'}>
                  {viol.severity} SEVERITY
                </span>
                <span className="badge badge-neutral">{viol.status}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              {viol.title}
            </h3>
            <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600, marginBottom: '10px' }}>
              {viol.mine_name} • Detected: {viol.detected_date}
            </div>

            {/* Observations count breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '6px', textAlign: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>OBSERVATIONS</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>{viol.observations_total}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#f87171' }}>CRITICAL</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#f87171' }}>{viol.critical_observations}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#38bdf8' }}>NORMAL</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#38bdf8' }}>{viol.normal_observations}</div>
              </div>
            </div>

            {/* Assigned & SLA */}
            <div style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Assigned To:</span>
                <strong style={{ color: '#38bdf8' }}>{viol.assigned_to}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Mitigation SLA:</span>
                <strong style={{ color: '#f87171' }}>{viol.due_date}</strong>
              </div>
            </div>

            {/* AI Pattern Flag */}
            {viol.ai_flag && (
              <div style={{ padding: '6px 10px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '6px', fontSize: '11px', color: '#d8b4fe', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Sparkles size={13} color="#c084fc" />
                <span>AI Flag: <strong>{viol.ai_flag}</strong></span>
              </div>
            )}

            {/* Evidence photos */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Evidence:</span>
              {viol.evidence_files.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhoto(file)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '11px', padding: '3px 8px' }}
                >
                  <FileText size={11} /> {file}
                </button>
              ))}
              <button
                onClick={() => setCurrentView('corrective-actions')}
                className="btn btn-outline-amber btn-sm"
                style={{ marginLeft: 'auto', fontSize: '11px', padding: '4px 9px' }}
              >
                Track Action <RotateCcw size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" style={{ maxWidth: '480px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: 700, color: '#fff' }}>Evidence Capture: {selectedPhoto}</div>
              <button onClick={() => setSelectedPhoto(null)} className="btn btn-secondary btn-sm" style={{ padding: '4px' }}>
                <X size={16} />
              </button>
            </div>
            
            {/* Simulated photographic proof viewport */}
            <div style={{ height: '240px', background: 'radial-gradient(circle, #2d3748 0%, #1a202c 100%)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-medium)', position: 'relative', overflow: 'hidden' }}>
              <AlertTriangle size={48} color="#f59e0b" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                Field Photo Evidence Captured
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                Dhanbad North Pit 3 High-Wall Sector • Exif GPS: 23.7957° N, 86.4304° E
              </div>
              <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '10px', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                TAMPER-PROOF DIGITALLY SIGNED SHA-256
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '12px' }}>
              8 workers documented without mandatory high-visibility reflective vests & safety helmets.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
