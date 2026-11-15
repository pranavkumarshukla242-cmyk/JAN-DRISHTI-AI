import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';
import { Eye, Phone, Mail, Shield, ExternalLink, Globe, Award } from 'lucide-react';
import { NationalFlag } from '../common/NationalFlag';
import { NationalEmblem } from '../common/NationalEmblem';

export const Footer: React.FC = () => {
  const { setActivePage, t } = useApp();

  const handleNav = (p: NavigationPage) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10 text-xs relative overflow-hidden">
      {/* Tricolour Accent Ribbon at Footer Top */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-[#FFFFFF]" />
        <div className="bg-[#138808]" />
      </div>

      {/* Official Government Badges Bar (Standard on indian government portals) */}
      <div className="bg-slate-900/80 border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NationalEmblem size="sm" className="w-8 h-8" />
            <div>
              <div className="text-white font-extrabold text-xs tracking-wide">
                भारत सरकार | GOVERNMENT OF INDIA
              </div>
              <div className="text-[10px] text-teal-400 font-medium">
                राष्ट्रीय लोक जवाबदेही मंच (National Public Accountability Platform)
              </div>
            </div>
          </div>

          {/* Allied National Portals Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 hover:bg-white/10 transition-colors">
              <Globe className="w-3 h-3 text-teal-400" />
              <span>india.gov.in</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 hover:bg-white/10 transition-colors">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Digital India</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 hover:bg-white/10 transition-colors">
              <NationalFlag size="xs" withBorder={false} withShadow={false} />
              <span>MyGov.in</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 hover:bg-white/10 transition-colors">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>CPGRAMS Grievance</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand, National Emblem & Purpose */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 text-white">
              <NationalEmblem size="sm" className="w-9 h-9" />
              <div>
                <div className="font-black text-sm tracking-tight">सिविक लेंस / CIVICLENS AI</div>
                <div className="text-[10px] text-teal-300 font-medium">Government of India Portal</div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              National AI-Powered Public Accountability Platform connecting public funds, project delivery, and institutional responsibility across all 36 States & Union Territories.
            </p>
            <div className="pt-2 text-amber-300/90 text-[11px] font-serif italic border-l-2 border-amber-500/50 pl-2.5">
              "सत्यमेव जयते — We don't put people under surveillance. We put public responsibility under public visibility."
            </div>
          </div>

          {/* Quick Navigation Trails */}
          <div>
            <h5 className="text-white font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Accountability Trails
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('money-trail')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Money Trail & Payment Reconciliation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('responsibility')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Responsibility & Authority Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('delivery')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Delivery & Field Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('complaints')}
                  className="hover:text-teal-400 transition-colors text-left font-medium text-teal-300"
                >
                  Citizen Grievances & Whistleblower Form
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Analytical Hub */}
          <div>
            <h5 className="text-white font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Analytical Hub
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('ai-risk')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  AI Anomaly & Risk Analysis Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('audit')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Audit & Investigation Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reports')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Public Transparency Reports & CSV Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('data-sources')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Data Connectors & Integrity Proofs
                </button>
              </li>
            </ul>
          </div>

          {/* Demonstration Notice & Official Contact */}
          <div className="space-y-3">
            <h5 className="text-white font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <NationalFlag size="xs" withBorder={false} />
              National Secretariat
            </h5>
            <p className="text-slate-400 text-xs">
              Central Public Vigilance & Accountability System for all 36 States & Union Territories of India.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a
                  href="tel:1800115555"
                  className="text-slate-300 hover:text-teal-300 font-mono transition-colors"
                >
                  Toll Free: 1800-11-5555 (Toll Free)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-slate-300 hover:text-teal-300 transition-colors break-all">
                  grievance-vigilance@gov.in
                </span>
              </div>
            </div>
            <div className="mt-3 p-2.5 bg-slate-900/90 rounded-xl border border-amber-500/20 text-[11px] text-amber-200/90">
              Notice: All records, authorities, contractors, and invoices are fictional demonstration data for governance evaluation.
            </div>
          </div>
        </div>

        {/* Bottom Bar with Government Standards and Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <NationalFlag size="xs" withBorder withShadow={false} />
              <span className="text-slate-400 font-medium">
                © 2026 भारत सरकार / Government of India.
              </span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>Designed in accordance with Guidelines for Indian Government Websites (GIGW 3.0)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-center">
            <span className="text-[11px] text-teal-400/90 font-mono">
              NIC & Digital India Standards Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
