import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import {
  FileSpreadsheet,
  Download,
  AlertTriangle,
  CheckCircle2,
  Search,
  School,
  ExternalLink,
  ChevronRight,
  Sliders,
  Scale
} from 'lucide-react';

export const ProcurementContracts: React.FC = () => {
  const {
    contracts,
    projects,
    setSelectedProjectId,
    setActivePage
  } = useApp();

  const [selectedContract, setSelectedContract] = useState(contracts[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
            <span>Public Procurement & Tender Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Procurement & Contracts Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Audit tenders, winning bids, contract milestones, scope amendments, and price variance benchmarks.
          </p>
        </div>

        <div className="p-3.5 glass-panel-amber rounded-2xl text-xs text-amber-950 self-start sm:self-auto border border-amber-300">
          <strong>Fair Procurement Rule:</strong>
          Low bid counts or variations warrant scrutiny, not automatic presumption of wrongdoing.
        </div>
      </div>

      {/* Contracts Table */}
      <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200/70 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">Active Public Work Contracts</span>
          <span className="font-mono text-slate-500">{contracts.length} Monitored Contracts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200/70">
              <tr>
                <th className="py-3 px-4 font-bold">Contract / Tender ID</th>
                <th className="py-3 px-4 font-bold">Project Association</th>
                <th className="py-3 px-4 font-bold">Contractor</th>
                <th className="py-3 px-4 font-bold">Procurement Method</th>
                <th className="py-3 px-4 font-bold">Contract Value</th>
                <th className="py-3 px-4 font-bold">Amendments</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {contracts.map(c => {
                const isSelected = selectedContract.id === c.id;

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedContract(c)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-teal-50/70' : 'hover:bg-teal-50/30'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {c.id}
                      <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{c.tenderId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-teal-800 whitespace-nowrap font-semibold">
                      {c.projectId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800">{c.supplierName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{c.procurementMethod}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatINR(c.contractValue)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {c.amendmentsCount > 0 ? (
                        <span className="font-mono text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 font-bold">
                          {c.amendmentsCount} Variation Note
                        </span>
                      ) : (
                        <span className="text-slate-400">0 Variations</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          c.status === 'Under Audit'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedContract(c);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] shadow-sm transition-all"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Contract Detailed Inspector */}
      {selectedContract && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-xs font-mono text-teal-700 font-bold block">
                Tender Ref: {selectedContract.tenderId}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Contract {selectedContract.id} — {selectedContract.supplierName}
              </h3>
              <p className="text-xs text-slate-600 font-mono mt-1">
                Value: <strong className="text-slate-900">{formatINR(selectedContract.contractValue)}</strong> • Period: {selectedContract.startDate} to {selectedContract.endDate}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProjectId(selectedContract.projectId);
                setActivePage('project-detail');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Inspect Project Workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Contractual Scope of Work
              </h4>
              <p className="text-slate-700 leading-relaxed">{selectedContract.scope}</p>
            </div>

            <div className="p-4 glass-panel-amber rounded-2xl border border-amber-300 space-y-2">
              <h4 className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                Contract Amendment History & Analytical Flag
              </h4>
              {selectedContract.amendmentNotes.length > 0 ? (
                <ul className="space-y-1.5 text-slate-800 list-disc pl-4">
                  {selectedContract.amendmentNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No post-award amendments or financial scope changes registered.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
