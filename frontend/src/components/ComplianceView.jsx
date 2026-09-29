import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Filter, 
  Search, 
  FileText, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function ComplianceView({ complianceList, onSelectCompliance }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['ALL', 'Safety', 'Environment', 'Labour', 'Production'];

  const filtered = complianceList.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.mine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.finding.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Top Header Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <ShieldCheck size={18} color="#10b981" />
              <span>3. Statutory Compliance Monitoring Ledger</span>
            </div>
            <div className="card-desc">
              Tracks mandatory Coal Mines Regulations 2017, Mines Act 1952, MoEFCC & SPCB compliance
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '3px', borderRadius: '6px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '11.5px', padding: '5px 10px' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search regulations or mines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ padding: '6px 10px 6px 28px', fontSize: '12px', width: '220px' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '8px', top: '8px', color: '#94a3b8' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Compliance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {filtered.map((item) => {
          const isHigh = item.risk === 'HIGH';
          const isCompliant = item.status === 'COMPLIANT';

          return (
            <div 
              key={item.id}
              className="card"
              style={{
                borderColor: !isCompliant ? (isHigh ? 'rgba(239, 68, 68, 0.35)' : 'rgba(245, 158, 11, 0.35)') : 'rgba(16, 185, 129, 0.25)',
                background: !isCompliant && isHigh ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.04), rgba(15, 23, 42, 0.85))' : 'var(--bg-card)'
              }}
            >
              {/* Card top */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#38bdf8' }}>
                  {item.category} • {item.sub_category}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className={item.risk === 'HIGH' ? 'badge badge-high' : item.risk === 'MEDIUM' ? 'badge badge-medium' : 'badge badge-low'}>
                    {item.risk} RISK
                  </span>
                  <span className={isCompliant ? 'badge badge-low' : 'badge badge-high'}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {item.title}
              </h3>
              <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600, marginBottom: '10px' }}>
                {item.mine_name}
              </div>

              {/* Finding Box */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', borderLeft: isCompliant ? '3px solid #10b981' : '3px solid #ef4444' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Inspection Finding</div>
                <p style={{ fontSize: '12.5px', color: '#f1f5f9', marginTop: '2px' }}>
                  {item.finding}
                </p>
              </div>

              {/* Details List */}
              <div style={{ fontSize: '11.5px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Last Inspection:</span>
                  <strong style={{ color: '#e2e8f0' }}>{item.last_inspection}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Statutory Deadline:</span>
                  <strong style={{ color: !isCompliant ? '#f87171' : '#34d399' }}>{item.due_date}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Responsible Officer:</span>
                  <strong style={{ color: '#cbd5e1' }}>{item.responsible_officer}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Corrective Action:</span>
                  <strong style={{ color: '#fbbf24' }}>{item.corrective_action_status}</strong>
                </div>
              </div>

              {/* Evidence Snippet */}
              <div style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={12} color="#94a3b8" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Evidence: {item.evidence}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
