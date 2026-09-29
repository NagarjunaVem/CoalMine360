import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  Wind, 
  Droplet, 
  ChevronRight,
  Flame,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Layers,
  FileCheck2,
  Activity
} from 'lucide-react';
import { RadialComplianceGauge, ProductionPacingBar, TelemetryPulseWave } from './Gauges';

export default function MineOperations({ mines, onSelectMine }) {
  const [filterState, setFilterState] = useState('ALL');

  const filteredMines = filterState === 'ALL' 
    ? mines 
    : mines.filter(m => m.risk_level === filterState);

  return (
    <div>
      {/* Header and filters */}
      <div className="card" style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '18px' }}>
              <Building2 size={20} color="#f59e0b" />
              <span>Eastern Coal Operations Ltd. — Mining Units & Governance Portals</span>
            </div>
            <div className="card-desc">
              Managing 3 primary mining centers spanning Jharkhand, Chhattisgarh, and Madhya Pradesh with live statutory telemetry
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((risk) => (
              <button
                key={risk}
                id={`filter-mine-${risk.toLowerCase()}`}
                onClick={() => setFilterState(risk)}
                className={`btn btn-sm ${filterState === risk ? 'btn-primary' : 'btn-secondary'}`}
              >
                {risk === 'ALL' ? 'All Mining Pits (3)' : `${risk} Risk`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 3 Mines with Gauges & Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '22px' }}>
        {filteredMines.map((mine) => {
          const isHigh = mine.risk_level === 'HIGH';
          const isMed = mine.risk_level === 'MEDIUM';

          return (
            <div 
              key={mine.id}
              id={`mine-card-${mine.id}`}
              className="card"
              style={{
                borderColor: isHigh ? 'rgba(239, 68, 68, 0.45)' : isMed ? 'rgba(245, 158, 11, 0.35)' : 'rgba(16, 185, 129, 0.35)',
                background: isHigh 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.06), rgba(15, 23, 42, 0.95))' 
                  : 'linear-gradient(135deg, rgba(18, 26, 46, 0.95), rgba(10, 16, 30, 0.95))',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isHigh ? '0 10px 30px rgba(239, 68, 68, 0.15)' : 'var(--shadow-lg)'
              }}
              onClick={() => onSelectMine(mine)}
            >
              <div>
                {/* Card top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#38bdf8' }}>
                    <MapPin size={11} /> {mine.state}
                  </span>
                  {isHigh ? (
                    <span className="badge badge-high"><Flame size={12} /> HIGH RISK (Score {mine.risk_score})</span>
                  ) : isMed ? (
                    <span className="badge badge-medium"><AlertTriangle size={12} /> MEDIUM (Score {mine.risk_score})</span>
                  ) : (
                    <span className="badge badge-low"><ShieldCheck size={12} /> LOW (Score {mine.risk_score})</span>
                  )}
                </div>

                {/* Title & Speedometer Gauge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                      {mine.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {mine.type} • Status: <span style={{ color: '#34d399', fontWeight: 700 }}>{mine.status}</span>
                    </p>
                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '6px' }}>
                      Manager: <strong style={{ color: '#fff' }}>{mine.manager}</strong>
                    </div>
                  </div>
                  <RadialComplianceGauge value={mine.compliance_rate} size={110} label="Compliance" />
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Open Violations</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: mine.open_issues > 8 ? '#f87171' : '#f1f5f9' }}>
                      {mine.open_issues} Infractions
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Active Workforce</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={16} color="#38bdf8" /> {mine.active_workforce}
                    </div>
                  </div>
                </div>

                {/* Daily Production Progress Bar */}
                <div style={{ marginBottom: '14px' }}>
                  <ProductionPacingBar 
                    target={mine.daily_target_tonnes} 
                    actual={mine.current_production_tonnes} 
                    label="Daily Extraction" 
                  />
                </div>

                {/* Environmental Wave Telemetry */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '8px', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#cbd5e1' }}>
                    <Wind size={13} color="#38bdf8" /> AQI: <strong style={{ color: mine.air_quality_aqi > 150 ? '#f87171' : '#34d399' }}>{mine.air_quality_aqi}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#cbd5e1' }}>
                    <Droplet size={13} color="#38bdf8" /> Water pH: <strong>{mine.water_discharge_ph}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="btn btn-outline-amber" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '10px 14px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMine(mine);
                }}
              >
                <span>Open Site Governance Dossier</span>
                <ChevronRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
