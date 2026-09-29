import React from 'react';
import { 
  LayoutDashboard, 
  Pickaxe, 
  ShieldCheck, 
  ClipboardCheck, 
  Smartphone, 
  AlertTriangle, 
  RotateCcw, 
  Users, 
  Map, 
  Sparkles, 
  Bell, 
  FileText, 
  Bot, 
  History,
  Building2,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, alertCount, openViolationsCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'mines', label: 'Mine Operations', icon: Pickaxe },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'inspections', label: 'Inspections', icon: ClipboardCheck },
    { 
      id: 'field-inspection', 
      label: 'Field Reports', 
      icon: Smartphone, 
      highlight: true, 
      badge: 'SIMULATOR' 
    },
    { 
      id: 'violations', 
      label: 'Violations', 
      icon: AlertTriangle, 
      badge: openViolationsCount > 0 ? `${openViolationsCount}` : null,
      badgeType: 'danger'
    },
    { id: 'corrective-actions', label: 'Corrective Actions', icon: RotateCcw },
    { id: 'contractors', label: 'Contractors', icon: Users },
    { id: 'gis-map', label: 'GIS Mine Map', icon: Map },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, badge: 'ENGINE', badgeType: 'ai' },
    { 
      id: 'alerts', 
      label: 'Alerts & Escalations', 
      icon: Bell, 
      badge: alertCount > 0 ? `${alertCount}` : null,
      badgeType: 'warning'
    },
    { id: 'ocr-demo', label: 'Document / OCR Demo', icon: FileText },
    { id: 'assistant', label: 'MineGov AI', icon: Bot, badge: 'COPILOT', badgeType: 'ai' },
    { id: 'audit-trail', label: 'Audit Trail', icon: History },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon-box">
          <Pickaxe size={22} />
        </div>
        <div>
          <div className="brand-title">CoalMine360</div>
          <div className="brand-subtitle">Smart Governance AI</div>
        </div>
      </div>

      {/* Nav List */}
      <div className="sidebar-nav">
        <div className="nav-section-title">Operations & Oversight</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentView(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`nav-badge ${item.badgeType === 'danger' ? '' : item.badgeType === 'warning' ? 'warning' : 'badge-ai'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="org-pill">
          <div className="org-dot"></div>
          <div>
            <div style={{ fontSize: '11px', color: '#f8fafc', fontWeight: 600 }}>Eastern Coal Operations Ltd.</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>SIH 2026 • PS 26024</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
