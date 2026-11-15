import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import {
  BarChart3,
  Download,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  School,
  Lock,
  Layers,
  MapPin
} from 'lucide-react';

export const ReportsTransparency: React.FC = () => {
  const {
    projects,
    complaints,
    payments,
    exportToCsv,
    selectedState,
    setSelectedState,
    allStates
  } = useApp();

  const [filterState, setFilterState] = useState(selectedState);

  const filteredProjects = projects.filter(p => {
    if (filterState !== 'All' && p.state !== filterState) return false;
    return true;
  });

  const totalMonitored = filteredProjects.reduce((acc, p) => acc + p.approvedBudget, 0);
  const totalSpent = filteredProjects.reduce((acc, p) => acc + p.reportedExpenditure, 0);
  const totalDiscrepancies = filteredProjects.reduce((acc, p) => acc + p.potentialDiscrepancy, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
            <span>Public Open Data & Transparency Reporting</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-teal-700">All 36 States & UTs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reports & Transparency Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Export machine-readable CSV datasets and inspect authorized public accountability summaries across Indian states.
          </p>
        </div>

        {/* CSV Export Button Cluster */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportToCsv('projects')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Projects CSV</span>
          </button>
          <button
            onClick={() => exportToCsv('discrepancies')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Discrepancies CSV</span>
          </button>
        </div>
      </div>

      {/* State Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" />
          <span className="font-bold text-slate-700">Filter Ledger by State / UT:</span>
          <select
            value={filterState}
            onChange={e => setFilterState(e.target.value)}
            className="glass-input rounded-xl px-3 py-1.5 text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All 36 States & UTs</option>
            <optgroup label="28 States">
              {allStates.filter(s => s.type === 'State').map(s => (
                <option key={s.code} value={s.name}>{s.name}</option>
              ))}
            </optgroup>
            <optgroup label="8 Union Territories">
              {allStates.filter(s => s.type === 'Union Territory').map(s => (
                <option key={s.code} value={s.name}>{s.name} (UT)</option>
              ))}
            </optgroup>
          </select>
        </div>

        <span className="text-[11px] text-slate-500 font-medium">
          Showing {filteredProjects.length} monitored project records
        </span>
      </div>

      {/* Redaction & Privacy Principle */}
      <div className="glass-panel-subtle rounded-2xl p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-3 border border-white/60">
        <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 font-bold block mb-0.5">Authorized Redaction Principle:</strong>
          Public reports disclose aggregate figures, contract awards, and verified inspection findings.
          Personal bank account numbers, IFSC codes, mobile credentials, and unverified allegations are strictly excluded.
        </div>
      </div>

      {/* Aggregate Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-3xl p-5 shadow-lg">
          <span className="text-xs text-slate-500 block font-medium">Approved Statutory Allocations</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-1 block">
            {formatINR(totalMonitored)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Cumulative budget ceiling</span>
        </div>

        <div className="glass-panel-teal rounded-3xl p-5 shadow-lg">
          <span className="text-xs text-teal-800 block font-medium">Reported Expenditure Claims</span>
          <span className="text-2xl font-extrabold font-mono text-teal-950 mt-1 block">
            {formatINR(totalSpent)}
          </span>
          <span className="text-[11px] text-teal-800 mt-1 block">Billed across monitored works</span>
        </div>

        <div className="glass-panel-amber rounded-3xl p-5 shadow-lg">
          <span className="text-xs text-amber-900 block font-medium">Unresolved Discrepancies Under Audit</span>
          <span className="text-2xl font-extrabold font-mono text-amber-950 mt-1 block">
            {formatINR(totalDiscrepancies)}
          </span>
          <span className="text-[11px] text-amber-900 mt-1 block">Including ₹1.2L School Anomaly</span>
        </div>
      </div>

      {/* Projects Expenditure Summary Ledger */}
      <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200/70 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">Project Expenditure & Delivery Ledger</span>
          <button
            onClick={() => exportToCsv('payments')}
            className="text-teal-700 font-bold hover:underline"
          >
            Download Payment Register CSV →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200/70">
              <tr>
                <th className="py-3 px-4 font-bold">Project ID</th>
                <th className="py-3 px-4 font-bold">Project Name</th>
                <th className="py-3 px-4 font-bold">State / District</th>
                <th className="py-3 px-4 font-bold">Approved Budget</th>
                <th className="py-3 px-4 font-bold">Reported Spent</th>
                <th className="py-3 px-4 font-bold">Reference Benchmark</th>
                <th className="py-3 px-4 font-bold">Discrepancy</th>
                <th className="py-3 px-4 font-bold">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProjects.map(p => (
                <tr key={p.id} className="hover:bg-teal-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-900 font-semibold">{p.name}</td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{p.district}, {p.state}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800 whitespace-nowrap">
                    {formatINR(p.approvedBudget)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-900 whitespace-nowrap">
                    {formatINR(p.reportedExpenditure)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-teal-800 whitespace-nowrap">
                    {formatINR(p.illustrativeReferenceCost)}
                  </td>
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                    {p.potentialDiscrepancy > 0 ? (
                      <span className="font-bold text-amber-950 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                        +{formatINR(p.potentialDiscrepancy)}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100/90 text-slate-800 border border-slate-200">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
