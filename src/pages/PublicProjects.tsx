import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import { Project } from '../types';
import {
  FolderKanban,
  Search,
  Filter,
  ArrowUpRight,
  School,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';

export const PublicProjects: React.FC = () => {
  const {
    projects,
    setSelectedProjectId,
    setActivePage,
    selectedState,
    setSelectedState,
    selectedDepartment,
    setSelectedDepartment,
    searchQuery,
    setSearchQuery,
    exportToCsv,
    allStates,
    t
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (selectedState !== 'All' && p.state !== selectedState) return false;
      if (selectedDepartment !== 'All' && p.departmentId !== selectedDepartment) return false;
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.contractorName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, selectedState, selectedDepartment, statusFilter, searchQuery]);

  const handleOpenDetail = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePage('project-detail');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <FolderKanban className="w-3.5 h-3.5 text-teal-600" />
            <span>Public Projects Directory</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-teal-700">All 36 States & UTs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Monitored Civic Infrastructure Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse public schemes, approved budgets, reported spending, and evidence audit statuses across states.
          </p>
        </div>

        <button
          onClick={() => exportToCsv('projects')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export All Projects (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center gap-3 text-xs shadow-md">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by project name, ID, district or contractor..."
            className="w-full pl-9 pr-3 py-2 glass-input rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="glass-input rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none cursor-pointer max-w-[200px]"
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

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="glass-input rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Under Review">Under Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending Audit">Pending Audit</option>
          <option value="Delivery Disputed">Delivery Disputed</option>
        </select>

        <span className="text-slate-400 font-mono ml-auto">
          {filtered.length} Projects Found
        </span>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => {
          const isCentralSchoolCase = p.id === 'JD-UP-2026-001';

          return (
            <div
              key={p.id}
              className={`glass-panel rounded-3xl p-6 border transition-all flex flex-col justify-between hover:shadow-xl ${
                isCentralSchoolCase
                  ? 'border-amber-400 ring-2 ring-amber-400/20 bg-amber-50/30'
                  : 'border-white/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {p.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      p.riskScore >= 70
                        ? 'bg-rose-100 text-rose-800'
                        : p.riskScore >= 40
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Risk Score: {p.riskScore}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 line-clamp-2 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {p.district}, {p.state} • {p.scheme}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Approved Budget:</span>
                    <span className="font-bold text-slate-800">{formatINR(p.approvedBudget)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Reported Spent:</span>
                    <span className="font-bold text-amber-700">{formatINR(p.reportedExpenditure)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Reference Benchmark:</span>
                    <span className="font-bold text-teal-700">{formatINR(p.illustrativeReferenceCost)}</span>
                  </div>
                  {p.potentialDiscrepancy > 0 && (
                    <div className="pt-1 border-t border-slate-200 flex justify-between text-amber-900 font-bold">
                      <span>Potential Discrepancy:</span>
                      <span>+{formatINR(p.potentialDiscrepancy)}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 line-clamp-2">
                  <strong className="text-slate-700">Contractor:</strong> {p.contractorName}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    p.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700'
                      : p.status === 'Under Review'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.status}
                </span>

                <button
                  onClick={() => handleOpenDetail(p.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all ${
                    isCentralSchoolCase
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{isCentralSchoolCase ? 'Inspect ₹1.2L Case' : 'View Project'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
