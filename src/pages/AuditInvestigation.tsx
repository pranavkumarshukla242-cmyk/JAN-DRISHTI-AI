import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  School,
  FileCheck,
  Send,
  UserCheck,
  Activity
} from 'lucide-react';

export const AuditInvestigation: React.FC = () => {
  const {
    reviewCases,
    projects,
    setSelectedProjectId,
    setActivePage,
    auditEvents,
    currentUserRole
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState(reviewCases[0]);

  const filteredCases = reviewCases.filter(c => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    return true;
  });

  const matchingProject = projects.find(p => p.id === selectedCase.projectId);

  const handleOpenDossier = (projId: string) => {
    setSelectedProjectId(projId);
    setActivePage('project-detail');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
            <span>Authorized State Audit & Vigilance Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Audit & Investigation Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Formal inquiry docket managing documentary evidence checklists, official queries, and reasoned closure outcomes.
          </p>
        </div>

        <div className="p-3 glass-panel-subtle rounded-2xl text-xs text-slate-800 font-mono self-start sm:self-auto border border-white/60">
          Active Perspective: <strong className="text-teal-800 capitalize">{currentUserRole.replace('_', ' ')}</strong>
        </div>
      </div>

      {/* Case Queue & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Case Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="glass-panel rounded-2xl p-3 shadow-md flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">
              Investigation Cases ({filteredCases.length})
            </span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="glass-input rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Evidence Requested">Evidence Requested</option>
              <option value="Inspection Scheduled">Inspection Scheduled</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed Unresolved">Closed Unresolved</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredCases.map(c => {
              const isSelected = selectedCase.id === c.id;
              const isSchool = c.projectId === 'JD-UP-2026-001';

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-teal-400 shadow-xl ring-2 ring-teal-500/30'
                      : 'glass-panel text-slate-800 hover:bg-white/95 border-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-teal-400">{c.id}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                    Case Project: {c.projectId}
                  </h4>
                  <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {c.findings}
                  </p>

                  <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-200/80 text-slate-500'}`}>
                    <span>Reviewer: {c.assignedReviewerRole}</span>
                    {isSchool && <span className="text-amber-500 font-bold">₹1.2L Priority</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Case Dossier (7 cols) */}
        <div className="lg:col-span-7">
          {selectedCase && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-24">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 font-bold block">
                    Case Dossier: {selectedCase.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {matchingProject?.name || selectedCase.projectId}
                  </h3>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Lead Reviewer: <strong>{selectedCase.assignedReviewerRole}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleOpenDossier(selectedCase.projectId)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Open Full Investigation Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inquiry Findings */}
              <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Audit Findings Summary
                </h4>
                <p className="leading-relaxed text-slate-800">{selectedCase.findings}</p>
              </div>

              {/* Evidence Checklist Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                    Evidence Checklist Status
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    {selectedCase.checklist.filter(c => c.status === 'verified').length} / {selectedCase.checklist.length} Verified
                  </span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedCase.checklist.map(item => (
                    <div
                      key={item.id}
                      className="p-2.5 glass-panel-subtle rounded-xl border border-slate-200/60 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-800 font-medium truncate max-w-xs">{item.item}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : item.status === 'disputed'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : item.status === 'received'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immutable Audit Log Stream for this Case */}
              <div className="pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-600" />
                    Case Audit Activity Stream
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">Immutable Log</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {auditEvents
                    .filter(a => a.entityId === selectedCase.id || a.entityId === selectedCase.projectId)
                    .map(evt => (
                      <div key={evt.id} className="p-2.5 glass-panel-subtle rounded-xl border border-slate-200/60 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900">{evt.eventType}</span>
                          <span className="font-mono text-slate-500">{evt.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 mt-0.5">{evt.reason}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
