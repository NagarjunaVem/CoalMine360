import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Users, 
  ClipboardCheck, 
  RotateCcw, 
  Smartphone,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Wind,
  Droplet
} from 'lucide-react';

export default function MineDetailModal({ 
  mine, 
  onClose, 
  complianceList, 
  inspectionsList, 
  violationsList, 
  actionsList,
  onLaunchFieldInspection 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!mine) return null;

  const mineComp = complianceList.filter(c => c.mine_id === mine.id);
  const mineInsp = inspectionsList.filter(i => i.mine_id === mine.id);
  const mineViol = violationsList.filter(v => v.mine_id === mine.id);
  const mineAct = actionsList.filter(a => a.mine_id === mine.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '850px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}>
                <MapPin size={10} /> {mine.state}
              </span>
              <span className={mine.risk_level === 'HIGH' ? 'badge badge-high' : mine.risk_level === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
                {mine.risk_level} RISK ({mine.risk_score}/100)
              </span>
              <span className="badge badge-compliant">{mine.status}</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{mine.name}</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              GPS: {mine.coordinates.lat}° N, {mine.coordinates.lng}° E • Type: {mine.type}
            </p>
          </div>
          <button 
            id="btn-close-modal"
            onClick={onClose} 
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Officers & Key Contacts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px' }}>
          <div>
            <span style={{ color: '#94a3b8' }}>Mine Manager:</span>
            <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{mine.manager}</div>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>Safety Officer:</span>
            <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{mine.safety_officer}</div>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>Active Workforce:</span>
            <div style={{ fontWeight: 700, color: '#38bdf8' }}>{mine.active_workforce} Personnel</div>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>Daily Production:</span>
            <div style={{ fontWeight: 700, color: mine.current_production_tonnes < mine.daily_target_tonnes * 0.8 ? '#f87171' : '#34d399' }}>
              {mine.current_production_tonnes.toLocaleString()} / {mine.daily_target_tonnes.toLocaleString()} t
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '16px' }}>
          {[
            { id: 'overview', label: `Summary (${mine.open_issues} Issues)` },
            { id: 'compliance', label: `Compliance (${mineComp.length})` },
            { id: 'violations', label: `Violations (${mineViol.length})` },
            { id: 'actions', label: `Corrective Actions (${mineAct.length})` },
            { id: 'inspections', label: `Inspections (${mineInsp.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '12px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#fbbf24', marginBottom: '4px' }}>
                AI Risk Assessment & Anomaly Detection
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', marginBottom: '8px' }}>
                {mine.summary}
              </p>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                <strong>Recent Pattern:</strong> {mine.recent_trend}
              </div>
            </div>

            {/* Environmental indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                  <Wind size={14} color="#38bdf8" /> Air Quality (CAAQMS Station)
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: mine.air_quality_aqi > 150 ? '#f87171' : '#34d399' }}>
                  AQI {mine.air_quality_aqi}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Statutory Threshold: 200 AQI max</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                  <Droplet size={14} color="#38bdf8" /> Mine Water Effluent pH
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#34d399' }}>
                  pH {mine.water_discharge_ph}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Permissible SPCB limits: 6.5 - 8.5</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mineComp.map(c => (
              <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>{c.title}</span>
                  <span className={c.status === 'COMPLIANT' ? 'badge badge-low' : 'badge badge-high'}>{c.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{c.finding}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Officer: {c.responsible_officer} • Due: {c.due_date} • Act: {c.statutory_act}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'violations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mineViol.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No open violations logged for this mine.</div>
            ) : (
              mineViol.map(v => (
                <div key={v.id} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#f87171', fontSize: '13px' }}>{v.title}</span>
                    <span className="badge badge-high">{v.severity}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>
                    Assigned: {v.assigned_to} • Due: {v.due_date}
                  </div>
                  <div style={{ fontSize: '11px', color: '#fbbf24' }}>
                    {v.ai_flag}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mineAct.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No pending corrective actions.</div>
            ) : (
              mineAct.map(a => (
                <div key={a.id} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>{a.title}</span>
                    <span className="badge badge-medium">{a.status} ({a.progress_percent}%)</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{a.notes}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Assigned to: {a.assigned_to} • Due: {a.due_date}</div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'inspections' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mineInsp.map(i => (
              <div key={i.id} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>{i.title}</span>
                  <span className="badge badge-low">{i.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {i.inspector} • Date: {i.date}
                </div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '4px' }}>
                  {i.summary}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '16px' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Central DGMS ID: IND-COAL-{mine.id.toUpperCase()}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              id="btn-launch-inspection-from-modal"
              onClick={() => {
                onClose();
                onLaunchFieldInspection(mine.id);
              }}
              className="btn btn-primary btn-sm"
            >
              <Smartphone size={13} /> Launch Field Inspection at {mine.name}
            </button>
            <button onClick={onClose} className="btn btn-secondary btn-sm">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
