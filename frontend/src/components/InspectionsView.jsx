import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

export default function InspectionsView({ inspectionsList, onLaunchFieldInspection }) {
  const [selectedInspection, setSelectedInspection] = useState(null);

  const scheduled = inspectionsList.filter(i => i.status === 'Scheduled');
  const completed = inspectionsList.filter(i => i.status === 'Completed');

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <ClipboardCheck size={18} color="#38bdf8" />
              <span>4. Mine Inspection Management Portal</span>
            </div>
            <div className="card-desc">
              Synchronizing DGMS statutory audits, internal spot checks, and environmental surveys
            </div>
          </div>
          <button 
            id="btn-schedule-field-insp"
            onClick={() => onLaunchFieldInspection('mine-1')}
            className="btn btn-primary btn-sm"
          >
            + Start Field Inspection
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Upcoming Inspections */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <Clock size={16} color="#fbbf24" />
              <span>Upcoming Scheduled Inspections</span>
            </div>
            <span className="badge badge-medium">{scheduled.length} Scheduled</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scheduled.map((insp) => (
              <div 
                key={insp.id}
                className="card"
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedInspection(insp)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{insp.mine_name}</span>
                  <span className="badge badge-medium">Scheduled</span>
                </div>
                <div style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 600, marginBottom: '6px' }}>
                  {insp.title} ({insp.type})
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="#cbd5e1" /> Date: <strong style={{ color: '#fff' }}>{insp.date}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserCheck size={13} color="#cbd5e1" /> Inspector: <strong style={{ color: '#38bdf8' }}>{insp.inspector}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inspections */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>Recent Completed Inspections</span>
            </div>
            <span className="badge badge-low">{completed.length} Completed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {completed.map((insp) => (
              <div 
                key={insp.id}
                className="card"
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedInspection(insp)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{insp.mine_name}</span>
                  <span className="badge badge-low">Completed</span>
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>
                  {insp.title}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                  {insp.date} • Inspector: {insp.inspector}
                </div>

                {/* Observation Counters */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>TOTAL</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>{insp.observations_count}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#f87171' }}>CRITICAL</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#f87171' }}>{insp.critical_count}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#34d399' }}>RESOLVED</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>{insp.resolved_count}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#fbbf24' }}>PENDING</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fbbf24' }}>{insp.pending_count}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Inspection Detail Modal */}
      {selectedInspection && (
        <div className="modal-overlay" onClick={() => setSelectedInspection(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-ai" style={{ marginBottom: '6px' }}>{selectedInspection.type}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>{selectedInspection.title}</h3>
                <div style={{ fontSize: '12px', color: '#fbbf24' }}>{selectedInspection.mine_name}</div>
              </div>
              <button onClick={() => setSelectedInspection(null)} className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', padding: '6px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Inspection Date:</span>
                <strong style={{ color: '#fff' }}>{selectedInspection.date}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Accredited Inspector:</span>
                <strong style={{ color: '#38bdf8' }}>{selectedInspection.inspector}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>GPS Location:</span>
                <strong style={{ color: '#34d399' }}>{selectedInspection.gps}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Audit Status:</span>
                <span className={selectedInspection.status === 'Completed' ? 'badge badge-low' : 'badge badge-medium'}>
                  {selectedInspection.status}
                </span>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Summary & Executive Remarks</div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1' }}>
                {selectedInspection.summary}
              </p>
            </div>

            {selectedInspection.report_file && (
              <div style={{ padding: '10px 14px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color="#38bdf8" />
                  <span style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 600 }}>{selectedInspection.report_file}</span>
                </div>
                <span className="badge badge-low">DGMS DIGITALLY SIGNED</span>
              </div>
            )}

            <button onClick={() => setSelectedInspection(null)} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Close Inspection Sheet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
