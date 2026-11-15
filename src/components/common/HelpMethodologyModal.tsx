import React from 'react';
import { X, ShieldCheck, Scale, CheckCircle2, AlertTriangle, Eye, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpMethodologyModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">CivicLens AI Methodology & Safeguards</h3>
              <p className="text-xs text-teal-300">National Public Accountability Governance Standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Core Philosophy */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1.5 text-base">
              <Scale className="w-4 h-4 text-amber-600" />
              Core Philosophy & Non-Accusatory Due Process
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>"Public office is public responsibility."</strong>
              <br />
              CivicLens AI detects <em>statistical and documentary inconsistencies</em>.
              An anomaly is <strong>not proof of corruption or guilt</strong>.
              Legitimate price variations (transport fluctuations, premium specifications, statutory tax updates) must be reviewed by designated human officers under lawful due process.
            </p>
          </div>

          {/* 6 Essential Questions */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider text-slate-500">
              The Six Accountability Questions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Where did the public money go?</span>
                  <span className="text-slate-500">Digital payment reconciliation connecting treasury debits to vendor escrow.</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Was expenditure reasonably priced?</span>
                  <span className="text-slate-500">Benchmark comparison with PWD Schedule of Rates and GeM market medians.</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Was promised work delivered?</span>
                  <span className="text-slate-500">Physical field inspection verifying physical quantities (e.g. 20 fans vs 16 counted).</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">4</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Who held designated authority?</span>
                  <span className="text-slate-500">Responsibility mapping connecting approval, implementation, and payment roles.</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">5</span>
                <div>
                  <span className="font-semibold text-slate-900 block">What evidence supports the claim?</span>
                  <span className="text-slate-500">12-point evidence checklist tracking M-Books, invoices, and site photos.</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">6</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Was misconduct resolved?</span>
                  <span className="text-slate-500">Citizen grievance tracking with immutable public status logs.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Score Explanation */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              0–100 AI Risk Prioritisation Metric
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              The 0–100 risk score does <strong>not</strong> measure the probability that an individual is corrupt. It is an internal audit triage metric derived from:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
              <li><strong>Magnitude of Discrepancy (40%):</strong> Percentage variance over reference benchmark.</li>
              <li><strong>Evidence Gaps (30%):</strong> Missing statutory records (e.g. M-Book, GST invoice match).</li>
              <li><strong>Delivery Variance (20%):</strong> Physical unit count mismatch reported by inspection officers.</li>
              <li><strong>Corroborating Citizen Reports (10%):</strong> Verified citizen feedback on site.</li>
            </ul>
          </div>

          {/* Fictional Demonstration Notice */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block mb-1">Demonstration Disclaimer Notice</span>
              This portal is a technology prototype for demonstrating public accountability concepts. All projects, institutions, officers, invoices, and transaction references shown are fictional and synthetic.
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
