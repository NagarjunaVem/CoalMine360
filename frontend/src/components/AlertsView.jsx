import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Flame, 
  CheckCircle2, 
  ArrowUpRight, 
  UserPlus, 
  Clock, 
  ShieldAlert,
  Send,
  RefreshCw
} from 'lucide-react';

export default function AlertsView({ alertsList, onAlertAction }) {
  const [loadingAlertId, setLoadingAlertId] = useState(null);
  const [assignModalAlert, setAssignModalAlert] = useState(null);
  const [assigneeName, setAssigneeName] = useState('Area Safety Officer (K. Sen)');

  const handleAction = async (alertId, actionType, assignedTo = null) => {
    setLoadingAlertId(alertId);
    try {
      await onAlertAction(alertId, actionType, assignedTo);
      if (assignModalAlert) setAssignModalAlert(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAlertId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <Bell size={18} color="#ef4444" />
              <span>8. Autonomous Alert & Multi-Tier Escalation Dispatcher</span>
            </div>
            <div className="card-desc">
              Direct linkage between field infractions, statutory cutoff dates, and hierarchical escalation matrices
            </div>
          </div>
          <span className="badge badge-high">{alertsList.filter(a => !a.acknowledged).length} UNACKNOWLEDGED ALERTS</span>
        </div>
      </div>

      {/* Alerts Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alertsList.map((alert) => {
          const isCrit = alert.type === 'CRITICAL';
          const isWarn = alert.type === 'WARNING';
          const isLoading = loadingAlertId === alert.id;

          return (
            <div 
              key={alert.id}
              id={`alert-card-${alert.id}`}
              className="card"
              style={{
                borderColor: isCrit ? 'rgba(239, 68, 68, 0.4)' : isWarn ? 'rgba(245, 158, 11, 0.35)' : 'rgba(255, 255, 255, 0.1)',
                background: isCrit ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(15, 23, 42, 0.9))' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={isCrit ? 'badge badge-high' : isWarn ? 'badge badge-medium' : 'badge badge-low'}>
                    {isCrit && <Flame size={12} />}
                    {isWarn && <AlertTriangle size={12} />}
                    {alert.type}
                  </span>
                  <span className="badge badge-neutral">{alert.status}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {alert.timestamp}
                  </span>
                </div>

                {/* Escalation Hierarchy Badge */}
                <div style={{ fontSize: '11px', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  Active Level: <strong>{alert.current_escalation_level}</strong>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {alert.title}
              </h3>
              <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600, marginBottom: '8px' }}>
                Site: {alert.mine_name}
              </div>

              <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '6px' }}>
                {alert.message}
              </p>

              {/* Escalation chain */}
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginBottom: '14px' }}>
                <strong>Escalation Chain:</strong> {alert.escalation_chain}
              </div>

              {alert.action_taken && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '8px 12px', borderRadius: '6px', fontSize: '11.5px', color: '#34d399', marginBottom: '14px' }}>
                  <strong>Action Log:</strong> {alert.action_taken}
                </div>
              )}

              {/* Action Buttons: Acknowledge, Assign, Escalate */}
              <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', flexWrap: 'wrap' }}>
                <button
                  id={`btn-ack-${alert.id}`}
                  onClick={() => handleAction(alert.id, 'acknowledge')}
                  disabled={isLoading || alert.acknowledged}
                  className="btn btn-secondary btn-sm"
                  style={alert.acknowledged ? { opacity: 0.6, borderColor: '#10b981', color: '#34d399' } : {}}
                >
                  <CheckCircle2 size={13} />
                  <span>{alert.acknowledged ? 'Acknowledged ✓' : 'Acknowledge'}</span>
                </button>

                <button
                  id={`btn-assign-${alert.id}`}
                  onClick={() => setAssignModalAlert(alert)}
                  disabled={isLoading}
                  className="btn btn-outline-amber btn-sm"
                >
                  <UserPlus size={13} />
                  <span>Assign Investigation</span>
                </button>

                <button
                  id={`btn-escalate-${alert.id}`}
                  onClick={() => handleAction(alert.id, 'escalate')}
                  disabled={isLoading}
                  className="btn btn-danger btn-sm"
                >
                  <ArrowUpRight size={13} />
                  <span>Escalate to CMD & DGMS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assign Modal */}
      {assignModalAlert && (
        <div className="modal-overlay" onClick={() => setAssignModalAlert(null)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Assign Alert Investigation
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>
              Assigning {assignModalAlert.title} ({assignModalAlert.mine_name})
            </p>

            <div className="form-group">
              <label className="form-label">Assignee Officer</label>
              <select 
                value={assigneeName} 
                onChange={e => setAssigneeName(e.target.value)} 
                className="form-select"
              >
                <option value="Area Safety Officer (K. Sen)">Area Safety Officer (K. Sen)</option>
                <option value="Rescue Superintendent (Deepak Mandal)">Rescue Superintendent (Deepak Mandal)</option>
                <option value="Environmental Nodal Officer (Dr. Rashmi Patel)">Environmental Nodal Officer (Dr. Rashmi Patel)</option>
                <option value="Chief Mechanical Lead (V. P. Nambiar)">Chief Mechanical Lead (V. P. Nambiar)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setAssignModalAlert(null)} className="btn btn-secondary btn-sm">Cancel</button>
              <button 
                id="btn-confirm-assign"
                onClick={() => handleAction(assignModalAlert.id, 'assign', assigneeName)}
                className="btn btn-primary btn-sm"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
