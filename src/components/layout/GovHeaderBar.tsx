import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NationalFlag } from '../common/NationalFlag';
import { NationalEmblem } from '../common/NationalEmblem';
import { Volume2, ChevronDown, Check, Globe } from 'lucide-react';

export const GovHeaderBar: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, availableLanguages, showToast, t } = useApp();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    const root = document.documentElement;
    if (size === 'larger') {
      root.style.fontSize = '17px';
    } else if (size === 'large') {
      root.style.fontSize = '16.25px';
    } else {
      root.style.fontSize = '15.5px';
    }
  };

  const handleScreenReaderAnnounce = () => {
    showToast(
      'info',
      'Screen Reader Enabled / स्क्रीन रीडर सक्रिय',
      'Accessibility ARIA landmarks and live regions are active across CivicLens.'
    );
  };

  const currentLangObj = availableLanguages.find(l => l.code === currentLanguage) || availableLanguages[0];

  return (
    <div className="w-full bg-slate-950/90 text-slate-300 border-b border-white/10 select-none backdrop-blur-xl relative z-50 text-[11px]">
      {/* Tricolour Accent Line at the very top */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-[#FFFFFF]" />
        <div className="bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Indian Government Identity & Flag */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <NationalFlag size="sm" withBorder withShadow waving={false} />
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-white tracking-wide text-xs">
              भारत सरकार
            </span>
            <span className="text-slate-500 font-light">|</span>
            <span className="font-medium text-slate-200 tracking-wide text-[11px] hidden xs:inline">
              GOVERNMENT OF INDIA
            </span>
          </div>

          <span className="hidden md:inline-block text-slate-600 font-light">|</span>

          <span className="hidden md:inline-flex items-center gap-1.5 text-teal-300/90 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            राष्ट्रीय लोक जवाबदेही मंच | Public Accountability Platform
          </span>
        </div>

        {/* Right: Accessibility, Language & Official links */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto text-[11px]">
          {/* Skip to Main Content */}
          <a
            href="#main-content"
            className="hidden sm:inline text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            मुख्य सामग्री पर जाएं / Skip to main
          </a>

          <span className="hidden sm:inline text-slate-700">|</span>

          {/* Screen Reader Access */}
          <button
            onClick={handleScreenReaderAnnounce}
            className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-teal-300 transition-colors"
            title="Screen Reader Access"
            aria-label="Screen Reader Access"
          >
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span>स्क्रीन रीडर</span>
          </button>

          <span className="hidden lg:inline text-slate-700">|</span>

          {/* Font Resizing Controls A- | A | A+ */}
          <div className="flex items-center gap-0.5 bg-slate-900/80 rounded-md border border-white/10 px-1 py-0.5" role="group" aria-label="Font Size Adjustments">
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                fontSize === 'normal' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                fontSize === 'large' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Medium Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('larger')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                fontSize === 'larger' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-slate-700">|</span>

          {/* Compact Language Selector with all 12 Languages */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 border border-teal-500/40 text-teal-200 font-semibold transition-all cursor-pointer"
              title="भाषा चुनें / Select Language"
              aria-expanded={showLangMenu}
            >
              <Globe className="w-3 h-3 text-teal-400" />
              <span className="font-bold">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </button>

            {showLangMenu && (
              <div
                className="absolute right-0 mt-1.5 w-60 glass-panel-dark rounded-xl shadow-2xl border border-white/20 p-1.5 z-50 animate-in fade-in"
                role="menu"
              >
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-300 border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>भाषा चयन / Select Language</span>
                  <span className="text-slate-400 font-mono text-[9px]">12 Languages</span>
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5">
                  {availableLanguages.map(lang => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setShowLangMenu(false);
                          showToast('info', 'Language Updated', `भाषा बदली: ${lang.nativeName} (${lang.name})`);
                        }}
                        className={`w-full text-left px-2.5 py-1 rounded-lg text-[11px] flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-teal-500/25 text-teal-200 font-bold border border-teal-400/30'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                        role="menuitem"
                      >
                        <span className="font-medium">{lang.nativeName}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-slate-400">{lang.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-teal-300" />}
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
    </div>
  );
};
