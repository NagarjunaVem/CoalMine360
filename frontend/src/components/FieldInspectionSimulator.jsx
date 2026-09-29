import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Clock, 
  UserCheck, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  RefreshCw,
  Radio,
  Zap,
  Eye,
  FileCheck2,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FieldInspectionSimulator({ 
  mines, 
  onSubmitObservation, 
  setCurrentView,
  onSelectMine 
}) {
  const [selectedMineId, setSelectedMineId] = useState('mine-1');
  const [category, setCategory] = useState('Safety');
  const [observationText, setObservationText] = useState('Workers without required PPE at Sector 4 High-Wall');
  const [severity, setSeverity] = useState('HIGH');
  const [photoName, setPhotoName] = useState('PPE_violation_pit3.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [flashActive, setFlashActive] = useState(false);

  const currentMine = mines.find(m => m.id === selectedMineId) || mines[0];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 300);

    try {
      const result = await onSubmitObservation({
        mine_id: selectedMineId,
        category: category,
        observation: observationText,
        severity: severity,
        inspector_name: 'Rajesh Kumar (Sr. DGMS Inspector)',
        gps_coordinates: `${currentMine.coordinates.lat}° N, ${currentMine.coordinates.lng}° E`,
        photo_filename: photoName
      });

      setSubmissionResult(result);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setObservationText('Workers without required PPE at Sector 4 High-Wall');
    setSeverity('HIGH');
    setCategory('Safety');
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header explanation */}
      <div className="card" style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '18px' }}>
              <Smartphone size={20} color="#f59e0b" />
              <span>5. Rugged Field Inspector Simulation (Geo-Tagged Handheld)</span>
            </div>
            <div className="card-desc">
              Replaces conventional paper checklists with a tamper-proof, timestamped, GPS-verified handheld inspector interface.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="badge badge-low">IP68 RUGGEDIZED</span>
            <span className="badge badge-ai">RTK GNSS ACTIVE</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '26px', alignItems: 'start' }}>
        
        {/* Rugged Industrial Field Tablet Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="rugged-tablet-shell">
            {/* Rubber Corner Bumpers */}
            <div className="rugged-corner corner-tl"></div>
            <div className="rugged-corner corner-tr"></div>
            <div className="rugged-corner corner-bl"></div>
            <div className="rugged-corner corner-br"></div>

            {/* Hardware Top Header */}
            <div className="tablet-top-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></div>
                <span style={{ fontWeight: 700, color: '#fff' }}>DGMS-TOUGHPAD X9</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#38bdf8' }}>🛰 18 SATS (±1.2m)</span>
                <span style={{ color: '#fbbf24' }}>5G DGMS-NET</span>
              </div>
            </div>

            {/* Tablet Screen */}
            <div className={`tablet-screen ${flashActive ? 'flash-anim' : ''}`}>
              
              {/* Internal Tablet App Header */}
              <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.25))', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    DGMS Coal Statutory Field App
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                    {submissionResult ? 'Inspection Incident Registered' : 'Active Pit Walkthrough Form'}
                  </div>
                </div>
                <Camera size={20} color="#fbbf24" />
              </div>

              {!submissionResult ? (
                /* Inspection Active Form */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Geo-tag & Inspector Metadata Panel */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Target Pit:</span>
                      <strong style={{ color: '#fff' }}>{currentMine.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>RTK Geo-Location:</span>
                      <span style={{ color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {currentMine.coordinates.lat}° N, {currentMine.coordinates.lng}° E ✓
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Field Timestamp:</span>
                      <span style={{ color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                        {currentTime} IST • {currentDate}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Certified Inspector:</span>
                      <strong style={{ color: '#38bdf8' }}>Rajesh Kumar (Sr. DGMS)</strong>
                    </div>
                  </div>

                  {/* Camera Viewfinder Simulation */}
                  <div className="camera-viewfinder">
                    <div className="viewfinder-crosshair"></div>
                    <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                      ISO 400 • F/2.0 • EXIF GPS SYNCED
                    </div>
                    <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
                      [ AUTOFOCUS LOCKED ]
                    </div>
                  </div>

                  {/* Mining Site Selector */}
                  <div className="form-group" style={{ marginBottom: '6px' }}>
                    <label className="form-label" style={{ fontSize: '10.5px' }}>Selected Coal Mine</label>
                    <select 
                      id="field-select-mine"
                      className="form-select"
                      value={selectedMineId}
                      onChange={(e) => setSelectedMineId(e.target.value)}
                      style={{ fontSize: '12px', padding: '8px 10px' }}
                    >
                      {mines.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.state}) - {m.risk_level} Risk</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selector */}
                  <div className="form-group" style={{ marginBottom: '6px' }}>
                    <label className="form-label" style={{ fontSize: '10.5px' }}>Infraction Category</label>
                    <select 
                      id="field-select-category"
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ fontSize: '12px', padding: '8px 10px' }}
                    >
                      <option value="Safety">Safety & PPE Non-Compliance</option>
                      <option value="Environment">Environmental & Dust Suppression</option>
                      <option value="Labour">Labour & Contractor Form-O Compliance</option>
                      <option value="Equipment">HEMM & Conveyor Emergency Interlocks</option>
                    </select>
                  </div>

                  {/* Observation Finding */}
                  <div className="form-group" style={{ marginBottom: '6px' }}>
                    <label className="form-label" style={{ fontSize: '10.5px' }}>Field Observation Details</label>
                    <textarea 
                      id="field-observation-text"
                      className="form-textarea"
                      rows={2}
                      value={observationText}
                      onChange={(e) => setObservationText(e.target.value)}
                      placeholder="Describe field finding..."
                      style={{ fontSize: '12px', padding: '8px 10px' }}
                    />
                  </div>

                  {/* Severity Level Switcher */}
                  <div className="form-group" style={{ marginBottom: '6px' }}>
                    <label className="form-label" style={{ fontSize: '10.5px' }}>Hazard Severity</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                      {['LOW', 'MEDIUM', 'HIGH'].map((sev) => (
                        <button
                          key={sev}
                          type="button"
                          id={`btn-sev-${sev.toLowerCase()}`}
                          onClick={() => setSeverity(sev)}
                          style={{
                            padding: '7px 4px',
                            fontSize: '11px',
                            fontWeight: 800,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            border: severity === sev ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                            background: sev === 'HIGH' ? (severity === sev ? '#ef4444' : 'rgba(239, 68, 68, 0.2)') :
                                        sev === 'MEDIUM' ? (severity === sev ? '#f59e0b' : 'rgba(245, 158, 11, 0.2)') :
                                        (severity === sev ? '#10b981' : 'rgba(16, 185, 129, 0.2)'),
                            color: '#fff',
                            boxShadow: severity === sev ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
                          }}
                        >
                          {sev}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    id="btn-submit-observation"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '6px', padding: '12px', fontSize: '13.5px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={15} className="spin" />
                        <span>Transmitting to DGMS Central AI Grid...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>[ Submit Observation & Calculate Risk ]</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Successful Submission Screen */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'modalPop 0.3s ease' }}>
                  <div style={{ textAlign: 'center', padding: '18px 12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px' }}>
                    <CheckCircle2 size={40} color="#34d399" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#34d399' }}>✓ Observation Recorded</div>
                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Cryptographically Signed & Timestamped</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Geo-tag:</span>
                      <strong style={{ color: '#34d399' }}>Captured ✓ ({submissionResult.geo_tag})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Timestamp:</span>
                      <strong style={{ color: '#34d399' }}>Captured ({submissionResult.timestamp})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Evidence:</span>
                      <strong style={{ color: '#34d399' }}>Attached ({submissionResult.evidence})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>AI Risk Score:</span>
                      <strong style={{ color: '#f87171' }}>{submissionResult.risk_score}/100 ({submissionResult.risk_level})</strong>
                    </div>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.12)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.35)', fontSize: '11.5px', color: '#fde68a' }}>
                    <strong>Autonomous Governance Triggers:</strong>
                    <ul style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <li>Violation Logged: #{submissionResult.violation_id}</li>
                      <li>Corrective Action Assigned: #{submissionResult.corrective_action_id}</li>
                      <li>Manager Notified via High-Priority SMS & Portal</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button 
                      id="btn-return-dashboard"
                      onClick={() => setCurrentView('dashboard')}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      Return to Dashboard (Verify Live KPIs) <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={handleResetForm}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      Log Another Field Observation
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Side: Analytical Proof Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <div className="card-title" style={{ fontSize: '16px', color: '#fbbf24' }}>
              <Cpu size={18} />
              <span>SIH PS 26024 Problem Solved</span>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>
              Traditional coal mine inspections rely on delayed paper reports that take days to reach corporate and statutory desks. 
              <strong> CoalMine360 Field Engine</strong> proves how field reports instantly feed compliance analytics, trigger automatic corrective actions, and update managerial KPIs in milliseconds.
            </p>
          </div>

          <div className="card" style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <div className="card-title" style={{ fontSize: '15px', color: '#38bdf8' }}>
              <FileCheck2 size={16} />
              <span>Interactive Demonstration Steps</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <span style={{ color: '#34d399', fontWeight: 800 }}>✓</span> 1. Observe GPS: <strong>23.7957° N, 86.4304° E</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <span style={{ color: '#34d399', fontWeight: 800 }}>✓</span> 2. Click <strong>[ Submit Observation ]</strong> on the Toughpad
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <span style={{ color: '#34d399', fontWeight: 800 }}>✓</span> 3. Watch KPIs update dynamically: <strong>Violations 18 → 19</strong>, <strong>High-Risk 5 → 6</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <span style={{ color: '#34d399', fontWeight: 800 }}>✓</span> 4. Inspect the <strong>Digital Audit Trail</strong> to see the immutable SHA-256 block hash!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
