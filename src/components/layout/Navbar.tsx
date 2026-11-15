import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fictionalRoles } from '../../data/seedData';
import {
  Eye,
  Search,
  Bell,
  HelpCircle,
  Shield,
  UserCheck,
  ChevronDown,
  Menu,
  RotateCcw,
  Languages,
  MapPin,
  Sparkles
} from 'lucide-react';
import { HelpMethodologyModal } from '../common/HelpMethodologyModal';
import { GovHeaderBar } from './GovHeaderBar';
import { NationalEmblem } from '../common/NationalEmblem';
import { NationalFlag } from '../common/NationalFlag';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onOpenResetDialog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, onOpenResetDialog }) => {
  const {
    currentUserRole,
    setCurrentUserRole,
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    financialYear,
    setFinancialYear,
    currentLanguage,
    setCurrentLanguage,
    allStates,
    availableLanguages,
    t,
    showToast,
    riskFlags
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const selectedStateObj = allStates.find(s => s.name === selectedState);
  const activeLangObj = availableLanguages.find(l => l.code === currentLanguage) || availableLanguages[0];

  const handleStateChange = (st: string) => {
    setSelectedState(st);
    setSelectedDistrict('All');
  };

  return (
    <>
      <GovHeaderBar />
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-2xl text-white border-b border-white/10 shadow-lg shadow-black/25">
        {/* Top Demarcation Notice */}
        <div className="bg-gradient-to-r from-amber-600/70 via-slate-900/90 to-teal-700/70 backdrop-blur-md py-1 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-center gap-2 text-amber-100 border-b border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-semibold">DEMO ENVIRONMENT</span> — All 36 States & UTs • All transactions & authorities shown are fictional demonstration records.
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo, National Emblem & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Clickable Brand Logo with National Emblem & Tiranga */}
            <button
              onClick={() => setActivePage('overview')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
              title="Go to CivicLens Overview"
            >
              {/* National Emblem of India */}
              <NationalEmblem size="sm" className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />

              {/* Platform Brand Identity */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-teal-300 transition-colors">
                    {t('appName', 'सिविक लेंस / CIVICLENS')}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-400/30 font-bold backdrop-blur-sm">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 leading-tight">
                  <NationalFlag size="xs" withBorder withShadow={false} />
                  <span className="truncate max-w-[200px] sm:max-w-none text-slate-300 font-medium">
                    {t('appSubtitle', 'राष्ट्रीय लोक जवाबदेही मंच | Public Accountability Platform')}
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Global Search Bar with Glass effect */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by project, school, vendor, district..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* All 36 States & UTs Selector Dropdown */}
          <div className="hidden xl:flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-2.5 py-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <select
                value={selectedState}
                onChange={e => handleStateChange(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[150px] truncate"
              >
                <option value="All" className="bg-slate-900 text-white">All 36 States & UTs</option>
                <optgroup label="States" className="bg-slate-900 text-slate-300 font-bold">
                  {allStates.filter(s => s.type === 'State').map(s => (
                    <option key={s.code} value={s.name} className="bg-slate-900 text-white font-normal">
                      {s.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Union Territories" className="bg-slate-900 text-slate-300 font-bold">
                  {allStates.filter(s => s.type === 'Union Territory').map(s => (
                    <option key={s.code} value={s.name} className="bg-slate-900 text-white font-normal">
                      {s.name} (UT)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Dynamic District Selector */}
            {selectedState !== 'All' && selectedStateObj && (
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-2.5 py-1 text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[130px] truncate"
              >
                <option value="All" className="bg-slate-900 text-white">All Districts</option>
                {selectedStateObj.districts.map(d => (
                  <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                ))}
              </select>
            )}

            {/* Financial Year selector */}
            <select
              value={financialYear}
              onChange={e => setFinancialYear(e.target.value)}
              className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-2 py-1 font-mono text-slate-300 text-xs focus:outline-none cursor-pointer"
            >
              <option value="2025-26" className="bg-slate-900 text-white">FY 2025-26</option>
              <option value="2024-25" className="bg-slate-900 text-white">FY 2024-25</option>
            </select>
          </div>

          {/* Right Action Icons & Modals */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md transition-all shadow-sm"
                title="Change Platform Language"
              >
                <Languages className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-bold">{activeLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-56 glass-panel-dark rounded-2xl shadow-2xl border border-white/20 p-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-300 border-b border-white/10 mb-1">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {availableLanguages.map(lang => {
                      const isSel = currentLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLanguage(lang.code);
                            setShowLangDropdown(false);
                            showToast('info', 'Language Updated', `Switched to ${lang.nativeName} (${lang.name})`);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                            isSel
                              ? 'bg-teal-500/30 text-teal-200 font-bold border border-teal-400/30'
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span>{lang.nativeName}</span>
                          <span className="text-[10px] font-mono text-slate-400">{lang.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={onOpenResetDialog}
              title="Reset Demo Data"
              className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Help & Methodology Modal Trigger */}
            <button
              onClick={() => setShowHelpModal(true)}
              title="Methodology & Rules"
              className="p-2 rounded-xl text-slate-300 hover:text-teal-300 hover:bg-white/10 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-medium">Methodology</span>
            </button>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-panel-dark rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in fade-in">
                  <div className="p-3.5 bg-slate-950/80 text-white flex items-center justify-between border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      System Notifications
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-semibold border border-amber-500/30">
                      {riskFlags.length} Flagged Cases
                    </span>
                  </div>
                  <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                    {riskFlags.slice(0, 3).map(rf => (
                      <div
                        key={rf.id}
                        onClick={() => {
                          setShowNotifications(false);
                          setActivePage('ai-risk');
                        }}
                        className="p-3 hover:bg-white/5 cursor-pointer transition-colors text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{rf.category}</span>
                          <span className="text-[10px] font-mono text-amber-400 font-bold">
                            Score {rf.riskScore}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2">{rf.reason}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 bg-slate-950/60 border-t border-white/10 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setActivePage('ai-risk');
                      }}
                      className="text-xs text-teal-300 font-bold hover:underline"
                    >
                      View All Priority Risk Flags →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 text-left transition-all backdrop-blur-md shadow-sm"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] text-slate-400 leading-none">Role View</div>
                  <div className="text-xs font-bold text-white capitalize leading-tight">
                    {currentUserRole.replace('_', ' ')}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-72 glass-panel-dark rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in fade-in">
                  <div className="p-3 bg-slate-950/90 text-white border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Switch Role View (Demo)
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Controls visible privileges, actions, and audit perspectives.
                    </p>
                  </div>
                  <div className="p-1 divide-y divide-white/5 max-h-72 overflow-y-auto">
                    {fictionalRoles.map(role => {
                      const isSelected = currentUserRole === role.accessRole;
                      return (
                        <button
                          key={role.id}
                          onClick={() => {
                            setCurrentUserRole(role.accessRole);
                            setShowRoleDropdown(false);
                            showToast(
                              'info',
                              'Role Switched',
                              `Now viewing platform as: ${role.roleTitle}`
                            );
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                            isSelected ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30' : 'hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <div className={`mt-0.5 p-1 rounded-lg ${isSelected ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                            <UserCheck className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{role.displayName}</span>
                              {isSelected && <span className="text-[10px] font-bold text-teal-400">Active</span>}
                            </div>
                            <span className="text-[11px] text-slate-400 block truncate">{role.roleTitle}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Help & Methodology Modal */}
      <HelpMethodologyModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </>
  );
};
