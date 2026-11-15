import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskFlag } from '../types';
import {
  Cpu,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  School,
  ArrowUpRight,
  Sparkles,
  Layers,
  Scale
} from 'lucide-react';

export const AIRiskAnalysis: React.FC = () => {
  const {
    riskFlags,
    projects,
    setSelectedProjectId,
    setActivePage
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedFlag, setSelectedFlag] = useState<RiskFlag>(riskFlags[0]);

  const filteredFlags = riskFlags.filter(rf => {
    if (categoryFilter !== 'All' && rf.category !== categoryFilter) return false;
    if (severityFilter !== 'All' && rf.severity !== severityFilter) return false;
    return true;
  });

  const handleOpenProjectWorkspace = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePage('project-detail');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-teal-600" />
            <span>Explainable AI Risk Engine & Audit Triage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Anomaly & Risk Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Deterministic rule-based detection cross-examining costs, invoices, physical delivery, and citizen grievances.
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 max-w-xs self-start sm:self-auto">
          <strong>Illustrative AI Engine:</strong>
          Scores prioritize human review, not probability of corruption or criminal guilt.
        </div>
      </div>

      {/* 7 Core Analytical Engine Modules Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {[
          { key: 'Cost Estimation', title: 'Cost Estimation', desc: 'Claims vs Benchmarks', count: 2 },
          { key: 'Invoice Analysis', title: 'Invoice Forensics', desc: 'Duplicate IDs & Totals', count: 1 },
          { key: 'Anomaly Detection', title: 'Anomaly Engine', desc: 'Split Purchases & Spikes', count: 1 },
          { key: 'Delivery Verification', title: 'Delivery Verification', desc: 'Unit Mismatch (20 vs 16)', count: 1 },
          { key: 'Relationship Analysis', title: 'Relationship Map', desc: 'Supplier-Officer Network', count: 1 },
          { key: 'Complaint Clustering', title: 'Complaint Cluster', desc: 'Repeated Citizen Reports', count: 1 },
          { key: 'Evidence Gap', title: 'Evidence Gaps', desc: 'Missing Statutory M-Books', count: 1 }
        ].map(mod => {
          const isSelected = categoryFilter === mod.key;

          return (
            <button
              key={mod.key}
              onClick={() => setCategoryFilter(isSelected ? 'All' : mod.key)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-teal-900 text-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                {mod.key === 'Cost Estimation' ? 'Module A' : mod.key === 'Invoice Analysis' ? 'Module B' : mod.key === 'Anomaly Detection' ? 'Module C' : mod.key === 'Delivery Verification' ? 'Module D' : mod.key === 'Relationship Analysis' ? 'Module E' : mod.key === 'Complaint Clustering' ? 'Module F' : 'Module G'}
              </div>
              <div className="font-bold text-xs mt-1 leading-snug">{mod.title}</div>
              <div className="text-[10px] opacity-70 mt-0.5 line-clamp-1">{mod.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Workspace: Flagged Cases Queue & Deep Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flag Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">
              Active Risk Flags ({filteredFlags.length})
            </span>
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Severities</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="low">Low Severity</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredFlags.map(rf => {
              const isSelected = selectedFlag.id === rf.id;
              const isCentralSchool = rf.projectId === 'JD-UP-2026-001';

              return (
                <div
                  key={rf.id}
                  onClick={() => setSelectedFlag(rf)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-teal-500 shadow-lg'
                      : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          rf.severity === 'high'
                            ? isSelected ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-800'
                            : isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        Score {rf.riskScore}
                      </span>
                      <span className="text-xs font-mono font-bold opacity-80">{rf.id}</span>
                    </div>

                    <span className="text-[10px] font-mono opacity-70 uppercase tracking-wider">
                      {rf.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                    {rf.projectName}
                  </h4>

                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {rf.reason}
                  </p>

                  <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'}`}>
                    <span>Review: {rf.reviewStatus}</span>
                    {isCentralSchool && (
                      <span className="text-amber-400 font-bold font-mono">₹1.2L Discrepancy</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Inspection Panel (7 cols) */}
        <div className="lg:col-span-7">
          {selectedFlag && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 sticky top-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-bold">
                      {selectedFlag.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {selectedFlag.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {selectedFlag.projectName}
                  </h3>
                </div>

                <button
                  onClick={() => handleOpenProjectWorkspace(selectedFlag.projectId)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto"
                >
                  <span>Open Full Investigation Case</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Anomaly Reason & Transparent Detection Calculation */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Detection Rationale & Rule Trigger
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {selectedFlag.reason}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs font-mono text-teal-800 font-bold bg-white p-2.5 rounded-xl border border-slate-200/70">
                    Formula: {selectedFlag.calculation}
                  </div>
                </div>
              </div>

              {/* Records Examined vs Records Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Records Examined</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                    {selectedFlag.supportingRecords.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Evidence Gaps (Missing Records)</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                    {selectedFlag.missingEvidence.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Auditor Recommendation */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-bold block">
                  AI Action Recommendation for Human Auditor
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedFlag.recommendation}
                </p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>Assigned: {selectedFlag.assignedReviewerRole}</span>
                  <span className="text-amber-400 font-bold">Status: {selectedFlag.reviewStatus}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
