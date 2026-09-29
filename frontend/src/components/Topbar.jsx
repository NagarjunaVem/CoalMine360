import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  RotateCcw, 
  Bot, 
  ShieldAlert, 
  Eye, 
  Sparkles,
  RefreshCw,
  Radio,
  Clock,
  ShieldCheck,
  Building,
  Activity,
  Smartphone
} from 'lucide-react';

export default function Topbar({ 
  currentRole, 
  setCurrentRole, 
  onResetData, 
  onOpenAssistant, 
  setCurrentView,
  isResetting 
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles = [
    { id: 'mine_official', label: 'Mine Official', icon: Activity, desc: 'Focus: Pit Incidents, Rapid Mitigation & Inspections' },
    { id: 'corporate_mgmt', label: 'Corporate Management', icon: Building, desc: 'Focus: Enterprise Risk Parity & Production Quotas' },
    { id: 'field_inspector', label: 'Field Inspector', icon: Smartphone, desc: 'Focus: Geo-Tagged Field Capture & Tamper-Proof Logs' },
    { id: 'regulatory_auth', label: 'Regulatory Authority', icon: ShieldCheck, desc: 'Focus: Statutory Compliance Acts, DGMS Audits & Closures' },
  ];

  return (
    <header className="topbar">
      {/* Left: Brand context & Live status */}
      <div className="topbar-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="system-status-indicator">
            <div className="status-dot-pulse"></div>
            <span>DGMS STATUTORY GRID: ONLINE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Radio size={12} color="#06b6d4" />
            <span>1,420 IoT SENSORS SYNCED</span>
          </div>
        </div>
      </div>

      {/* Center: Role Switcher */}
      <div className="topbar-center">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              id={`role-btn-${r.id}`}
              onClick={() => {
                setCurrentRole(r.id);
                if (r.id === 'field_inspector') setCurrentView('field-inspection');
                else if (r.id === 'regulatory_auth') setCurrentView('compliance');
                else if (r.id === 'corporate_mgmt') setCurrentView('dashboard');
              }}
              className={`role-tab ${isActive ? 'active' : ''}`}
              title={r.desc}
            >
              <Icon size={14} color={isActive ? '#fbbf24' : '#94a3b8'} />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Clock & Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Live IST Clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#cbd5e1', background: 'rgba(0,0,0,0.3)', padding: '5px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Clock size={12} color="#fbbf24" />
          <span>{timeStr || '10:00:00 IST'}</span>
        </div>

        {/* MineGov AI Copilot trigger */}
        <button 
          id="btn-open-minegov-ai"
          onClick={onOpenAssistant} 
          className="btn btn-primary btn-sm"
          style={{ gap: '6px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
        >
          <Sparkles size={14} />
          <span>MineGov AI Copilot</span>
        </button>

        {/* Reset Demo Data button */}
        <button 
          id="btn-reset-demo"
          onClick={onResetData} 
          className="btn btn-secondary btn-sm"
          title="Reset dataset to initial baseline"
          disabled={isResetting}
        >
          <RefreshCw size={13} className={isResetting ? 'spin' : ''} />
          <span>{isResetting ? 'Resetting...' : 'Reset'}</span>
        </button>
      </div>
    </header>
  );
}
