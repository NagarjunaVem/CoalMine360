import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  MapPin, 
  Layers, 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Wind, 
  Eye, 
  Navigation, 
  Building2,
  ChevronRight,
  Maximize2,
  Radio,
  Compass,
  Cpu
} from 'lucide-react';
import { TelemetryPulseWave } from './Gauges';

export default function GISMineMap({ mines, violations, alerts, onSelectMine }) {
  const [selectedPin, setSelectedPin] = useState(mines[0]);
  const [mapMode, setMapMode] = useState('TACTICAL'); // 'TACTICAL' or 'TERRAIN'
  const [activeLayers, setActiveLayers] = useState({
    mines: true,
    riskHeat: true,
    violations: true,
    sensors: true
  });

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div>
      {/* Header card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <MapIcon size={18} color="#06b6d4" />
              <span>6. Spatial GIS & Tactical Geo-Governance Telemetry Hub</span>
            </div>
            <div className="card-desc">
              Multi-layer spatial tracking across Eastern Coal mining pits, environmental monitoring towers, and haulage arteries
            </div>
          </div>

          {/* Layer and View Toggles */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '3px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button 
                onClick={() => setMapMode('TACTICAL')}
                className={`btn btn-sm ${mapMode === 'TACTICAL' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
              >
                Tactical Radar
              </button>
              <button 
                onClick={() => setMapMode('TERRAIN')}
                className={`btn btn-sm ${mapMode === 'TERRAIN' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
              >
                Topographic Pit
              </button>
            </div>

            <button 
              onClick={() => toggleLayer('riskHeat')}
              className={`btn btn-sm ${activeLayers.riskHeat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '11px', padding: '4px 9px' }}
            >
              <Flame size={12} /> Risk Heatmap
            </button>
            <button 
              onClick={() => toggleLayer('sensors')}
              className={`btn btn-sm ${activeLayers.sensors ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '11px', padding: '4px 9px' }}
            >
              <Wind size={12} /> IoT Sensors
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Tactical Map Display */}
        <div 
          className="card" 
          style={{ 
            minHeight: '520px', 
            position: 'relative', 
            overflow: 'hidden', 
            background: mapMode === 'TACTICAL' 
              ? 'radial-gradient(ellipse at center, #0c1626 0%, #050811 100%)'
              : 'radial-gradient(ellipse at center, #13221b 0%, #060e0a 100%)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            boxShadow: 'inset 0 0 70px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {/* Tactical HUD Header */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: 'rgba(9, 14, 25, 0.85)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={13} /> GRID WGS-84 • EASTERN COAL BASIN
            </div>
            <div style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
              ZOOM: 1:50,000 • REFRESH: REALTIME • GNSS: RTK DUAL
            </div>
          </div>

          <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, display: 'flex', gap: '6px' }}>
            <span className="badge badge-low" style={{ fontSize: '10px' }}>LIVE GPS SATELLITES</span>
          </div>

          {/* SVG Map Canvas with Radar Sweep & Interactive Nodes */}
          <svg 
            viewBox="0 0 900 500" 
            style={{ width: '100%', height: '100%', minHeight: '480px' }}
          >
            <defs>
              <pattern id="gisGrid" width="45" height="45" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <circle cx="45" cy="45" r="1" fill="rgba(255,255,255,0.1)" />
              </pattern>

              {/* Dhanbad Heat */}
              <radialGradient id="heatDhanbadAdv" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>

              {/* Korba Heat */}
              <radialGradient id="heatKorbaAdv" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Singrauli Heat */}
              <radialGradient id="heatSingrauliAdv" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#gisGrid)" />

            {/* Range Rings */}
            <circle cx="450" cy="250" r="120" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="450" cy="250" r="220" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="450" cy="250" r="320" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="5 5" />

            {/* Radar Sweep Line */}
            {mapMode === 'TACTICAL' && (
              <line 
                x1="450" 
                y1="250" 
                x2="850" 
                y2="250" 
                stroke="rgba(6, 182, 212, 0.35)" 
                strokeWidth="2" 
                className="radar-sweep-arm" 
              />
            )}

            {/* Regional Geological Basin Overlay */}
            <path 
              d="M 120 180 Q 300 110, 500 140 T 820 220 Q 740 390, 530 430 T 150 370 Z" 
              fill="rgba(30, 41, 59, 0.3)" 
              stroke="rgba(255, 255, 255, 0.09)" 
              strokeWidth="1.5" 
            />

            {/* Haulage Transport Flow Corridors */}
            <path 
              d="M 280 290 Q 400 240, 530 200 T 730 170" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2.5" 
              strokeDasharray="8 6" 
              opacity="0.6"
            />

            {/* Active Risk Heatmaps */}
            {activeLayers.riskHeat && (
              <>
                <circle cx="730" cy="170" r="120" fill="url(#heatDhanbadAdv)" />
                <circle cx="280" cy="290" r="90" fill="url(#heatKorbaAdv)" />
                <circle cx="530" cy="200" r="70" fill="url(#heatSingrauliAdv)" />
              </>
            )}

            {/* Mining Pit Boundary Polygons */}
            <polygon points="690,140 770,145 780,195 700,205" fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="250,260 320,270 310,320 240,305" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="500,175 570,180 560,225 490,215" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

            {/* IoT Sensor Nodes if enabled */}
            {activeLayers.sensors && (
              <>
                {/* Dhanbad Haul Tower */}
                <g transform="translate(660, 130)">
                  <circle cx="0" cy="0" r="4" fill="#06b6d4" />
                  <text x="8" y="3" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)">CAAQMS #01 (AQI 188)</text>
                </g>
                {/* Korba Sump */}
                <g transform="translate(240, 240)">
                  <circle cx="0" cy="0" r="4" fill="#06b6d4" />
                  <text x="8" y="3" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)">WATER-PH #04 (7.2)</text>
                </g>
              </>
            )}

            {/* MINE 1: DHANBAD NORTH (HIGH RISK) */}
            <g 
              style={{ cursor: 'pointer' }} 
              onClick={() => {
                const m = mines.find(x => x.id === 'mine-1');
                if (m) setSelectedPin(m);
              }}
            >
              <circle cx="730" cy="170" r="26" fill="rgba(239, 68, 68, 0.3)" className="pulse-indicator" />
              <circle cx="730" cy="170" r="14" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
              <text x="730" y="210" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                Dhanbad North Mine
              </text>
              <text x="730" y="226" fill="#f87171" fontSize="11" fontWeight="600" textAnchor="middle">
                ● HIGH RISK (Score 87)
              </text>
              <text x="730" y="242" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Jharkhand • 11 Open Issues
              </text>
            </g>

            {/* MINE 2: KORBA CENTRAL (MEDIUM RISK) */}
            <g 
              style={{ cursor: 'pointer' }} 
              onClick={() => {
                const m = mines.find(x => x.id === 'mine-2');
                if (m) setSelectedPin(m);
              }}
            >
              <circle cx="280" cy="290" r="20" fill="rgba(245, 158, 11, 0.25)" />
              <circle cx="280" cy="290" r="13" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
              <text x="280" y="328" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                Korba Central Mine
              </text>
              <text x="280" y="344" fill="#fbbf24" fontSize="11" fontWeight="600" textAnchor="middle">
                ● MEDIUM (Score 58)
              </text>
              <text x="280" y="360" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Chhattisgarh • 5 Open Issues
              </text>
            </g>

            {/* MINE 3: SINGRAULI OPEN CAST (LOW RISK) */}
            <g 
              style={{ cursor: 'pointer' }} 
              onClick={() => {
                const m = mines.find(x => x.id === 'mine-3');
                if (m) setSelectedPin(m);
              }}
            >
              <circle cx="530" cy="200" r="18" fill="rgba(16, 185, 129, 0.25)" />
              <circle cx="530" cy="200" r="12" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
              <text x="530" y="236" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                Singrauli Open Cast
              </text>
              <text x="530" y="252" fill="#34d399" fontSize="11" fontWeight="600" textAnchor="middle">
                ● LOW RISK (Score 24)
              </text>
              <text x="530" y="268" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Madhya Pradesh • 2 Open Issues
              </text>
            </g>
          </svg>

          {/* Bottom HUD Legend */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(9, 14, 25, 0.9)', padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', fontSize: '11.5px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }}></div>
              <span style={{ color: '#fff' }}>High Risk Critical</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }}></div>
              <span style={{ color: '#fff' }}>Medium Risk Watch</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
              <span style={{ color: '#fff' }}>Low Risk Optimal</span>
            </div>
          </div>
        </div>

        {/* Selected Mine Live Telemetry HUD */}
        <div className="card" style={{ borderColor: selectedPin.risk_level === 'HIGH' ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)' }}>
          <div className="card-header">
            <div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#38bdf8', marginBottom: '4px' }}>
                <MapPin size={10} /> {selectedPin.state} • {selectedPin.type}
              </span>
              <div className="card-title" style={{ fontSize: '19px' }}>
                {selectedPin.name}
              </div>
            </div>
            <span className={selectedPin.risk_level === 'HIGH' ? 'badge badge-high' : selectedPin.risk_level === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
              {selectedPin.risk_level} RISK ({selectedPin.risk_score})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Live GPS Coordinates banner */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>RTK Coordinate Fix:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>
                  {selectedPin.coordinates.lat}° N, {selectedPin.coordinates.lng}° E
                </div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Mine Manager:</span>
                <div style={{ fontWeight: 600, color: '#fff' }}>{selectedPin.manager}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Statutory Compliance:</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: selectedPin.compliance_rate >= 90 ? '#34d399' : '#f87171' }}>
                  {selectedPin.compliance_rate}%
                </div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Open Hazards:</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: selectedPin.open_issues > 8 ? '#f87171' : '#fff' }}>
                  {selectedPin.open_issues} Infractions
                </div>
              </div>
            </div>

            {/* Environmental Waveform */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Live CAAQMS Air Quality Waveform:
                </span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: selectedPin.air_quality_aqi > 150 ? '#f87171' : '#34d399' }}>
                  AQI {selectedPin.air_quality_aqi}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TelemetryPulseWave color={selectedPin.air_quality_aqi > 150 ? '#ef4444' : '#10b981'} width={300} />
              </div>
            </div>

            {/* Sector Summary */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '4px' }}>
                Geological & Environmental Brief
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.4 }}>{selectedPin.summary}</p>
            </div>

            <button 
              id="btn-gis-drilldown"
              onClick={() => onSelectMine(selectedPin)} 
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Open Site Governance Ledger</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
