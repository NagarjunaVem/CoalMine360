import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Cpu,
  BookOpen
} from 'lucide-react';

export default function MineGovAssistantModal({ isOpen, onClose, onAskAssistant, onNavigateView }) {
  const [queryText, setQueryText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'assistant',
      response: {
        title: 'Welcome to MineGov AI Governance Copilot',
        summary: 'I monitor statutory compliance, recurring safety infractions, contractor risks, and telemetry anomalies across Eastern Coal Operations Ltd.',
        items: [
          {
            title: 'Real-time Organization Snapshot',
            badge: '87% COMPLIANCE',
            details: '3 active mines monitored: Dhanbad North (72%), Korba Central (89%), Singrauli (96%).',
            action: 'Select a quick query below or ask any governance question.'
          }
        ],
        recommendation: 'You can query specific mines, overdue SLA deadlines, or recurring hazard patterns.'
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Which mines currently have high-risk safety issues?',
    'Show me overdue compliance actions',
    'What is SafeWorks risk status?',
    'Analyze production anomalies across all pits'
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
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '720px', height: '640px', display: 'flex', flexDirection: 'column', padding: '22px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>MineGov AI Copilot</span>
                <span className="badge badge-ai" style={{ fontSize: '10px' }}>DGMS REGULATORY LLM</span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                Statutory Regulatory Advisory & Automated Mining Risk Synthesizer
              </div>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        {/* Quick prompt chips */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSend(qp)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11.5px', whiteSpace: 'nowrap', padding: '5px 11px', background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              <Sparkles size={12} color="#c084fc" /> {qp}
            </button>
          ))}
        </div>

        {/* Chat message stream */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '6px' }}>
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
              <div key={idx} style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', borderRadius: '14px 14px 14px 2px', padding: '16px', maxWidth: '94%', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={15} color="#a855f7" /> {res.title}
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {res.summary}
                </div>

                {res.items && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {res.items.map((it, itemIdx) => (
                      <div key={itemIdx} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ color: '#fbbf24', fontSize: '12.5px' }}>{it.title}</strong>
                          <span className="badge badge-medium" style={{ fontSize: '10px' }}>{it.badge}</span>
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.4 }}>{it.details}</div>
                        {it.action && (
                          <div style={{ color: '#38bdf8', fontSize: '11.5px', marginTop: '4px', fontWeight: 600 }}>
                            Action Required: {it.action}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {res.recommendation && (
                  <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#e9d5ff', marginTop: '4px' }}>
                    <strong style={{ color: '#c084fc' }}>Statutory Guidance:</strong> {res.recommendation}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '10px', fontSize: '12.5px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={15} className="spin" color="#a855f7" />
              <span>Querying DGMS Regulations & Site Telemetry...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '8px' }}
        >
          <input
            type="text"
            id="input-minegov-query"
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            placeholder="Ask MineGov AI e.g. Which mines currently have high-risk issues?..."
            className="form-input"
            style={{ flex: 1, padding: '12px 16px', fontSize: '13.5px' }}
          />
          <button 
            type="submit" 
            id="btn-send-minegov-query"
            disabled={!queryText.trim() || isTyping}
            className="btn btn-primary"
            style={{ padding: '0 20px' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
