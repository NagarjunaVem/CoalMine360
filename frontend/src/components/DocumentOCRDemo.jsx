import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  FileCheck2, 
  Clock, 
  Building2, 
  ShieldCheck,
  RefreshCw,
  Eye,
  FileSpreadsheet,
  Scan,
  Check
} from 'lucide-react';

export default function DocumentOCRDemo({ onUploadDoc }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [ocrResult, setOcrResult] = useState(null);
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('extracted');

  const sampleDocs = [
    { name: 'DGMS_Statutory_Safety_Certificate_2026.pdf', type: 'Statutory Safety Clearance', auth: 'Directorate General of Mines Safety' },
    { name: 'SafeWorks_Form_O_Periodic_Medical_Batch.pdf', type: 'Labour Form-O Medical Register', auth: 'Mines Rules 1955 §29B' },
    { name: 'SPCB_Continuous_Air_Emission_Consent.pdf', type: 'State Pollution Control Consent', auth: 'Environment Protection Act' }
  ];

  const currentDoc = sampleDocs[selectedDocIndex];

  const steps = [
    'Document uploaded to Secure Ingestion Bucket ✓',
    'High-resolution OCR character extraction (98.4% Confidence) ✓',
    'Entity linking & Statutory Metadata resolution ✓',
    'Direct mapping to CoalMine360 Compliance Ledger ✓'
  ];

  const handleSimulateOCR = async () => {
    setIsProcessing(true);
    setOcrResult(null);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 600);
    setTimeout(() => setPipelineStep(3), 1200);
    setTimeout(async () => {
      setPipelineStep(4);
      try {
        const res = await onUploadDoc(currentDoc.name);
        setOcrResult(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }, 1800);
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <FileText size={18} color="#06b6d4" />
              <span>11. Statutory Document Digitization & Automated OCR Engine</span>
            </div>
            <div className="card-desc">
              Extracts statutory DGMS certificates, Form-O medical registers, and environmental consents directly into the compliance ledger
            </div>
          </div>
          <span className="badge badge-ai">OCR ENGINE: MINES-OCR-V3</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '22px' }}>
        
        {/* Upload & Document Viewport */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <UploadCloud size={16} color="#fbbf24" />
              <span>Select Statutory File to Ingest</span>
            </div>
            <span className="badge badge-low">PDF / TIFF / SCAN</span>
          </div>

          {/* Sample Document Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {sampleDocs.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDocIndex(idx);
                  setOcrResult(null);
                  setPipelineStep(0);
                }}
                className={`btn btn-sm ${selectedDocIndex === idx ? 'btn-outline-amber' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '8px 12px', fontSize: '12px' }}
              >
                <FileText size={14} color={selectedDocIndex === idx ? '#fbbf24' : '#94a3b8'} />
                <span style={{ fontWeight: 600 }}>{doc.name}</span>
              </button>
            ))}
          </div>

          {/* Visual Document Scanner Simulation */}
          <div 
            style={{
              height: '200px',
              background: 'radial-gradient(ellipse at center, #172338 0%, #0c1424 100%)',
              border: '2px dashed rgba(6, 182, 212, 0.4)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            {/* Animated Laser Scanline */}
            {isProcessing && (
              <div 
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #06b6d4, #38bdf8, transparent)',
                  boxShadow: '0 0 15px #06b6d4',
                  animation: 'laserScan 1.8s ease-in-out infinite'
                }}
              />
            )}

            <Scan size={44} color="#06b6d4" style={{ marginBottom: '8px', opacity: isProcessing ? 1 : 0.7 }} />
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
              {currentDoc.name}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Authority: {currentDoc.auth}
            </div>

            {ocrResult && (
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <span className="badge badge-low">OCR VERIFIED</span>
              </div>
            )}
          </div>

          {/* Run Pipeline Button */}
          <button
            id="btn-run-ocr"
            onClick={handleSimulateOCR}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '14px' }}
          >
            {isProcessing ? (
              <>
                <RefreshCw size={15} className="spin" />
                <span>Running Optical Character Recognition & Entity Mapping...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>[ Run OCR & Ingestion Pipeline ]</span>
              </>
            )}
          </button>

          {/* Live Pipeline Steps */}
          {(isProcessing || ocrResult) && (
            <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                Extraction Progress:
              </div>
              {steps.map((st, idx) => {
                const isDone = pipelineStep > idx || ocrResult;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: isDone ? '#34d399' : '#64748b' }}>
                    {isDone ? <CheckCircle2 size={13} color="#34d399" /> : <Clock size={13} />}
                    <span>{st}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Extracted Statutory Entities */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '15px' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>Extracted Regulatory Metadata</span>
            </div>
            {ocrResult && (
              <span className="badge badge-low">
                CONFIDENCE: {ocrResult.extracted.confidence_score}
              </span>
            )}
          </div>

          {ocrResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Validation Status Banner */}
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                    Statutory Validation State
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>
                    {ocrResult.extracted.status}
                  </div>
                </div>
                <span className="badge badge-low" style={{ padding: '6px 14px', fontSize: '12px' }}>
                  DGMS OFFICIAL VERIFIED
                </span>
              </div>

              {/* Structured Metadata Grid */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Ingested File:</span>
                  <strong style={{ color: '#fff' }}>{ocrResult.extracted.document_name}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Certificate / Seal No:</span>
                  <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{ocrResult.extracted.certificate_number}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Statutory Authority:</span>
                  <strong style={{ color: '#cbd5e1' }}>{ocrResult.extracted.issuing_authority}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Issue Date:</span>
                  <strong style={{ color: '#cbd5e1' }}>{ocrResult.extracted.issue_date}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Expiry / Renewal Due:</span>
                  <strong style={{ color: '#34d399' }}>{ocrResult.extracted.expiry_date}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Mapped Mining Center:</span>
                  <strong style={{ color: '#fbbf24' }}>{ocrResult.extracted.mine_assigned}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Governing Legislation:</span>
                  <span style={{ color: '#e2e8f0', fontSize: '12px' }}>{ocrResult.extracted.statutory_act}</span>
                </div>
              </div>

              {/* Compliance ledger confirmation */}
              <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', fontSize: '12px', color: '#7dd3fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="#38bdf8" />
                <span>Synchronized with Central Statutory Register: <strong>Ref #{ocrResult.extracted.mapped_compliance_item}</strong></span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <FileSpreadsheet size={40} style={{ margin: '0 auto 10px', opacity: 0.3 }} />
              <p style={{ fontSize: '13px' }}>Click "[ Run OCR & Ingestion Pipeline ]" to trigger automated optical entity extraction and register mapping.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
