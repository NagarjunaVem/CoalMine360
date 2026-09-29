import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  ShieldAlert, 
  ArrowRight, 
  RefreshCw, 
  Cpu, 
  BookOpen,
  HelpCircle,
  FileText,
  Building2
} from 'lucide-react';

export default function MineGovAssistantView({ onAskAssistant, setCurrentView, onSelectMine }) {
  const [queryText, setQueryText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'assistant',
      response: {
        title: 'Welcome to MineGov AI Statutory Governance Copilot',
        summary: 'I monitor statutory compliance, recurring safety infractions, contractor risks, and telemetry anomalies across Eastern Coal Operations Ltd.',
        items: [
          {
            title: 'Real-time Organization Snapshot',
            badge: '86% COMPLIANCE',
            details: '3 active mines monitored: Dhanbad North (72% High Risk), Korba Central (89% Medium Risk), Singrauli (96% Low Risk).',
            action: 'Select a quick query chip below or type any custom governance query.'
          },
          {
            title: 'Regulatory Data Sources Synced',
            badge: 'DGMS & MoEFCC',
            details: 'Coal Mines Regulations 2017, Mines Act 1952, Form-O Labour PME records, CAAQMS SPCB telemetry.',
            action: 'Statutory citations referenced automatically in responses.'
          }
        ],
        recommendation: 'You can query specific mines, overdue SLA deadlines, or recurring hazard patterns.'
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Which mines currently have high-risk safety issues?',
    'Show me overdue compliance actions',
    'What is SafeWorks risk status?',
    'Analyze production anomalies across all pits',
    'Summarize Dhanbad North PPE violations'
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || queryText;
    if (!text.trim()) return;

    const newChat = [...chatHistory, { sender: 'user', text }];
    setChatHistory(newChat);
    setQueryText('');
    setIsTyping(true);

    try {
      const res = await onAskAssistant(text);
      setChatHistory([...newChat, { sender: 'assistant', response: res }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(15, 23, 42, 0.95))', borderColor: 'rgba(168, 85, 247, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 20px rgba(168, 85, 247, 0.45)' }}>
              <Bot size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>MineGov AI Governance Copilot</h2>
                <span className="badge badge-ai">LLM REGULATORY ENGINE</span>
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                Context-aware conversational AI for statutory compliance, inspection records, and mining hazard intelligence
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="badge badge-low">DGMS REGS 2017</span>
            <span className="badge badge-medium">MINES ACT 1952</span>
          </div>
        </div>
      </div>

      {/* Main Conversation & Intelligence Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '20px', alignItems: 'start' }}>
        
        {/* Chat Feed */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '560px', maxHeight: '720px', padding: '18px' }}>
          
          {/* Quick Prompts Bar */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                id={`view-prompt-${idx}`}
                onClick={() => handleSend(qp)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', whiteSpace: 'nowrap', padding: '5px 11px', background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
              >
                <Sparkles size={11} color="#c084fc" /> {qp}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '8px' }}>
            {chatHistory.map((msg, idx) => {
              if (msg.sender === 'user') {
                return (
                  <div key={idx} style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.35))', border: '1px solid rgba(245, 158, 11, 0.45)', borderRadius: '14px 14px 2px 14px', padding: '10px 16px', maxWidth: '82%', color: '#fff', fontSize: '13px', fontWeight: 500 }}>
                    {msg.text}
                  </div>
                );
              }

              const res = msg.response;
              return (
                <div key={idx} style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '14px 14px 14px 2px', padding: '16px', maxWidth: '95%', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#a855f7" /> {res.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {res.summary}
                  </div>

                  {res.items && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                      {res.items.map((it, itemIdx) => (
                        <div key={itemIdx} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <strong style={{ color: '#fbbf24', fontSize: '13px' }}>{it.title}</strong>
                            <span className="badge badge-medium" style={{ fontSize: '10px' }}>{it.badge}</span>
                          </div>
                          <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.4 }}>{it.details}</div>
                          {it.action && (
                            <div style={{ color: '#38bdf8', fontSize: '11.5px', marginTop: '4px', fontWeight: 600 }}>
                              Action Mandate: {it.action}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {res.recommendation && (
                    <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#e9d5ff', marginTop: '4px' }}>
                      <strong style={{ color: '#c084fc' }}>Statutory Authority Advisory:</strong> {res.recommendation}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '10px', fontSize: '12.5px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RefreshCw size={15} className="spin" color="#a855f7" />
                <span>Querying Central DGMS Compliance Ledger & Real-Time Mining Pits...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '10px' }}
          >
            <input
              type="text"
              id="input-minegov-view-query"
              value={queryText}
              onChange={e => setQueryText(e.target.value)}
              placeholder="Ask MineGov AI e.g. Which mines currently have high-risk issues?..."
              className="form-input"
              style={{ flex: 1, padding: '12px 16px', fontSize: '13.5px' }}
            />
            <button 
              type="submit" 
              id="btn-send-minegov-view-query"
              disabled={!queryText.trim() || isTyping}
              className="btn btn-primary"
              style={{ padding: '0 20px' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right Side: Statutory Knowledge Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="card">
            <div className="card-title" style={{ fontSize: '14px', color: '#38bdf8' }}>
              <BookOpen size={16} />
              <span>Statutory Knowledge Base</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '12px', color: '#cbd5e1' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>Coal Mines Regulations 2017:</strong>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Regulation 104: Systematic support rules & PPE enforcement</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>Mines Act 1952 §22:</strong>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Powers of DGMS Inspectors to prohibit employment in dangerous conditions</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>Mines Rules 1955 §29B:</strong>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Form-O Periodic Medical Examination (PME) for contract workers</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <div className="card-title" style={{ fontSize: '14px', color: '#fbbf24' }}>
              <HelpCircle size={16} />
              <span>Suggested Queries</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              {[
                'Which mines currently have high-risk safety issues?',
                'Show me overdue compliance actions',
                'What is SafeWorks risk status?',
                'Analyze production anomalies across all pits'
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="btn btn-secondary btn-sm"
                  style={{ textAlign: 'left', justifyContent: 'flex-start', fontSize: '11.5px', padding: '6px 10px' }}
                >
                  <ArrowRight size={12} color="#a855f7" /> {q}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
