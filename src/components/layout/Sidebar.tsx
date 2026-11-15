import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';
import {
  LayoutDashboard,
  FolderKanban,
  CircleDollarSign,
  Cpu,
  Network,
  FileSpreadsheet,
  CheckCircle2,
  MessageSquareWarning,
  ShieldAlert,
  BarChart3,
  Database,
  Sliders,
  School,
  X,
  Home,
  Sparkles
} from 'lucide-react';
import { NationalEmblem } from '../common/NationalEmblem';
import { NationalFlag } from '../common/NationalFlag';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const {
    activePage,
    setActivePage,
    setSelectedProjectId,
    currentUserRole,
    riskFlags,
    complaints,
    t
  } = useApp();

  const navItems: { id: NavigationPage; labelKey: string; defaultLabel: string; icon: React.FC<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'overview', labelKey: 'overview', defaultLabel: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'projects', labelKey: 'projects', defaultLabel: 'Public Projects', icon: FolderKanban, badge: '6' },
    { id: 'money-trail', labelKey: 'moneyTrail', defaultLabel: 'Money Trail', icon: CircleDollarSign },
    { id: 'ai-risk', labelKey: 'aiRisk', defaultLabel: 'AI Risk Analysis', icon: Cpu, badge: `${riskFlags.length}`, badgeColor: 'bg-amber-400 text-slate-950 font-bold' },
    { id: 'responsibility', labelKey: 'responsibility', defaultLabel: 'Responsibility Map', icon: Network },
    { id: 'procurement', labelKey: 'procurement', defaultLabel: 'Procurement & Contracts', icon: FileSpreadsheet },
    { id: 'delivery', labelKey: 'delivery', defaultLabel: 'Delivery Verification', icon: CheckCircle2, badge: 'Mismatch', badgeColor: 'bg-rose-500/30 text-rose-200 border border-rose-500/40' },
    { id: 'complaints', labelKey: 'complaints', defaultLabel: 'Citizen Complaints', icon: MessageSquareWarning, badge: `${complaints.length}` },
    { id: 'audit', labelKey: 'audit', defaultLabel: 'Audit & Investigation', icon: ShieldAlert },
    { id: 'reports', labelKey: 'reports', defaultLabel: 'Reports & Transparency', icon: BarChart3 },
    { id: 'data-sources', labelKey: 'dataSources', defaultLabel: 'Data Sources & Verification', icon: Database },
    { id: 'settings', labelKey: 'settings', defaultLabel: 'System Settings', icon: Sliders }
  ];

  const handleNavClick = (page: NavigationPage) => {
    setActivePage(page);
    onCloseMobile();
  };

  const handleSchoolCaseClick = () => {
    setSelectedProjectId('JD-UP-2026-001');
    setActivePage('project-detail');
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full bg-slate-950/70 backdrop-blur-2xl text-slate-300 border-r border-white/10 shadow-2xl">
      {/* Mobile Header with Emblem & Flag */}
      <div className="lg:hidden p-4 flex items-center justify-between border-b border-white/10 bg-slate-900/40">
        <div className="flex items-center gap-2.5">
          <NationalEmblem size="sm" className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-sm leading-tight">सिविक लेंस / CIVICLENS</span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <NationalFlag size="xs" withBorder={false} />
              <span>भारत सरकार</span>
            </div>
          </div>
        </div>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          aria-label="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Landing Page Quick Link */}
      <div className="p-3 border-b border-white/10">
        <button
          onClick={() => handleNavClick('landing')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activePage === 'landing'
              ? 'bg-white/15 text-white border border-white/20 shadow-inner'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home className="w-4 h-4 text-teal-400" />
          <span>Home / मुख्य पृष्ठ</span>
          <span className="ml-auto text-[10px] text-teal-300 bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-800">
            Intro
          </span>
        </button>
      </div>

      {/* Central Demonstration Case Quick Callout (Glassmorphic Amber) */}
      <div className="p-3">
        <div
          onClick={handleSchoolCaseClick}
          className={`p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group backdrop-blur-md ${
            activePage === 'project-detail'
              ? 'bg-amber-950/60 border-amber-400/80 ring-2 ring-amber-400/30 shadow-lg shadow-amber-950/50'
              : 'bg-slate-900/60 border-white/10 hover:border-amber-400/50 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <School className="w-4 h-4" />
            <span>Central Case Demo</span>
          </div>
          <p className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
            JD-UP-2026-001
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            School Upgrade: ₹1.2L Potential Overbilling Case
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
            <span className="text-amber-300 font-semibold bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-800/60">
              Claim: ₹9.0L
            </span>
            <span className="text-teal-400 font-medium">Ref: ₹7.8L</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Accountability Modules
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          const label = t(item.labelKey, item.defaultLabel);

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold shadow-lg shadow-teal-950/50 border border-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'}`} />
              <span className="truncate">{label}</span>
              {item.badge && (
                <span
                  className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-slate-400 border border-white/5')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Role & System Context */}
      <div className="p-3 border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Active Perspective</span>
            <span className="font-mono text-teal-400 font-bold capitalize">{currentUserRole.replace('_', ' ')}</span>
          </div>
          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
            {currentUserRole === 'auditor' && 'Forensic audit, checklist update, and note recording access.'}
            {currentUserRole === 'citizen' && 'Public transparency, project tracking & grievance submission mode.'}
            {currentUserRole === 'finance' && 'Treasury reconciliation, invoice verification & disbursement audit.'}
            {currentUserRole === 'admin' && 'Implementing agency oversight, document submissions & milestone approvals.'}
            {currentUserRole === 'investigator' && 'Formal anti-corruption scrutiny, relationship mapping & escalation.'}
            {currentUserRole === 'platform_admin' && 'System configuration, tolerance settings & seed state management.'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-[calc(100vh-4.5rem)] sticky top-[4.5rem] overflow-hidden">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
