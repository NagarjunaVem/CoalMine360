import React from 'react';

// Radial Semi-Circle Speedometer Gauge for Compliance %
export function RadialComplianceGauge({ value, size = 160, strokeWidth = 14, label = "Compliance Rate" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const clamped = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const getColor = (val) => {
    if (val >= 90) return '#10b981'; // Emerald
    if (val >= 75) return '#f59e0b'; // Amber
    return '#f43f5e'; // Crimson
  };

  const color = getColor(clamped);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: size, height: size * 0.65 }}>
      <svg width={size} height={size * 0.65} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`gauge-grad-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={`url(#gauge-grad-${value})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>

      {/* Center Value */}
      <div style={{ position: 'absolute', bottom: '0px', textAlign: 'center' }}>
        <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
          {clamped}%
        </div>
        <div style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600, marginTop: '2px' }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// Sparkline Mini Area Graph for KPI cards
export function MiniSparkline({ data = [30, 45, 40, 60, 55, 75, 70], color = '#f59e0b', height = 36, width = 90 }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`spark-fill-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-fill-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Environmental Sensor Telemetry Waveform
export function TelemetryPulseWave({ color = '#06b6d4', width = 120, height = 30 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 30" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M 0 15 L 25 15 L 32 4 L 38 26 L 46 8 L 52 20 L 58 15 L 85 15 L 90 9 L 95 21 L 100 15 L 120 15"
        fill="none"
        stroke="url(#waveGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="telemetry-pulse"
      />
    </svg>
  );
}

// Production Comparison Bar Chart
export function ProductionPacingBar({ target, actual, label = "Daily Coal Target" }) {
  const percent = Math.round((actual / target) * 100);
  const isDeficit = percent < 80;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12px' }}>
        <span style={{ color: '#94a3b8', fontWeight: 500 }}>{label}:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <strong style={{ color: '#fff' }}>{actual.toLocaleString()} t</strong>
          <span style={{ color: '#64748b' }}>/ {target.toLocaleString()} t</span>
          <span className={isDeficit ? 'badge badge-high' : 'badge badge-low'} style={{ padding: '1px 6px', fontSize: '10px' }}>
            {percent}%
          </span>
        </div>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(percent, 100)}%`,
            background: isDeficit 
              ? 'linear-gradient(90deg, #ef4444, #f87171)' 
              : 'linear-gradient(90deg, #059669, #10b981)',
            borderRadius: '4px',
            boxShadow: isDeficit ? '0 0 10px rgba(239, 68, 68, 0.5)' : '0 0 10px rgba(16, 185, 129, 0.5)',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
}
