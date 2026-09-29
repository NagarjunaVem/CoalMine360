import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Building2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function ContractorView({ contractorsList }) {
  const [selectedContractor, setSelectedContractor] = useState(contractorsList[1] || contractorsList[0]);

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <Users size={18} color="#f59e0b" />
              <span>10. Contractor Statutory Governance & Safety Scorecard</span>
            </div>
            <div className="card-desc">
              Tracks 28 outsourced logistics, overburden, and civil contractors against DGMS safety & Form-O compliance
            </div>
          </div>
          <span className="badge badge-ai">DGMS CONTRACTOR AUDIT ACTIVE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Contractor List */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <span>Registered Primary Contractors</span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Click to view audit ledger</span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Contractor</th>
                  <th style={{ textAlign: 'right' }}>Compliance</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {contractorsList.map((cont) => {
                  const isSelected = selectedContractor?.id === cont.id;
                  return (
                    <tr 
                      key={cont.id}
                      id={`contractor-row-${cont.id}`}
                      className="clickable"
                      onClick={() => setSelectedContractor(cont)}
                      style={isSelected ? { background: 'rgba(245, 158, 11, 0.1)' } : {}}
                    >
                      <td>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{cont.name}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{cont.category}</div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: cont.compliance_rate >= 90 ? '#34d399' : cont.compliance_rate >= 80 ? '#fbbf24' : '#f87171' }}>
                        {cont.compliance_rate}%
                      </td>
                      <td>
                        <span className={cont.risk_level === 'HIGH' ? 'badge badge-high' : cont.risk_level === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
                          {cont.risk_level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Contractor Deep Dive */}
        {selectedContractor && (
          <div className="card" style={{ borderColor: selectedContractor.risk_level === 'HIGH' ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)' }}>
            <div className="card-header">
              <div>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', marginBottom: '4px' }}>
                  Category: {selectedContractor.category}
                </span>
                <div className="card-title" style={{ fontSize: '18px' }}>
                  {selectedContractor.name}
                </div>
              </div>
              <span className={selectedContractor.risk_level === 'HIGH' ? 'badge badge-high' : selectedContractor.risk_level === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
                AI RISK: {selectedContractor.risk_level}
              </span>
            </div>

            {/* AI Warning if High Risk */}
            {selectedContractor.ai_warning && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#fca5a5', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Sparkles size={16} color="#ef4444" />
                <span><strong>AI Detection:</strong> {selectedContractor.ai_warning}</span>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', marginBottom: '14px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Contractor Workforce:</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{selectedContractor.workers_count} Deployments</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Active Mining Sites:</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8' }}>{selectedContractor.active_sites} Pits</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Open Infractions:</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: selectedContractor.open_violations > 4 ? '#f87171' : '#fff' }}>
                  {selectedContractor.open_violations} Violations
                </div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>High-Risk Issues:</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: selectedContractor.high_risk_issues > 0 ? '#f87171' : '#34d399' }}>
                  {selectedContractor.high_risk_issues} Critical
                </div>
              </div>
            </div>

            {/* Detailed Category Scores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                  <span style={{ color: '#cbd5e1' }}>Safety Compliance</span>
                  <strong style={{ color: selectedContractor.safety_compliance < 75 ? '#f87171' : '#34d399' }}>{selectedContractor.safety_compliance}%</strong>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${selectedContractor.safety_compliance}%`, background: selectedContractor.safety_compliance < 75 ? '#ef4444' : '#10b981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                  <span style={{ color: '#cbd5e1' }}>Document Compliance</span>
                  <strong style={{ color: selectedContractor.document_compliance < 80 ? '#fbbf24' : '#34d399' }}>{selectedContractor.document_compliance}%</strong>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${selectedContractor.document_compliance}%`, background: selectedContractor.document_compliance < 80 ? '#f59e0b' : '#10b981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                  <span style={{ color: '#cbd5e1' }}>Attendance & Biometric Sync</span>
                  <strong style={{ color: '#34d399' }}>{selectedContractor.attendance_compliance}%</strong>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${selectedContractor.attendance_compliance}%`, background: '#10b981' }} />
                </div>
              </div>
            </div>

            {/* Compliance Documents */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Statutory Evidence Documents
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedContractor.documents.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={14} color="#38bdf8" />
                      <span style={{ color: '#f1f5f9' }}>{doc.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Exp: {doc.expiry}</span>
                      <span className={doc.status === 'VALID' ? 'badge badge-low' : doc.status === 'EXPIRED' ? 'badge badge-high' : 'badge badge-medium'}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
