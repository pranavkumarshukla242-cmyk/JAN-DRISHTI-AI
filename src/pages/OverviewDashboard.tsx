import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  formatINR,
  BudgetVsExpenditureChart,
  DepartmentBreakdownChart,
  MonthlyTrendsChart,
  IndiaSchematicMap
} from '../components/common/SpatialCharts';
import {
  ShieldAlert,
  AlertTriangle,
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  MessageSquareWarning,
  Eye,
  Building,
  School,
  Download,
  Activity
} from 'lucide-react';
import { NationalEmblem } from '../components/common/NationalEmblem';
import { NationalFlag } from '../components/common/NationalFlag';

export const OverviewDashboard: React.FC = () => {
  const {
    projects,
    departments,
    riskFlags,
    complaints,
    auditEvents,
    setActivePage,
    setSelectedProjectId,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedDepartment,
    setSelectedDepartment,
    financialYear,
    searchQuery,
    setSearchQuery,
    exportToCsv,
    allStates,
    t
  } = useApp();

  const [riskFilter, setRiskFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Under Review' | 'In Progress' | 'Completed' | 'Disputed'>('All');

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (selectedState !== 'All' && p.state !== selectedState) return false;
      if (selectedDistrict !== 'All' && p.district !== selectedDistrict) return false;
      if (selectedDepartment !== 'All' && p.departmentId !== selectedDepartment) return false;
      if (riskFilter === 'High' && p.riskScore < 70) return false;
      if (riskFilter === 'Medium' && (p.riskScore < 40 || p.riskScore >= 70)) return false;
      if (riskFilter === 'Low' && p.riskScore >= 40) return false;
      if (statusFilter === 'Under Review' && p.status !== 'Under Review' && p.status !== 'Pending Audit') return false;
      if (statusFilter === 'In Progress' && p.status !== 'In Progress') return false;
      if (statusFilter === 'Completed' && p.status !== 'Completed') return false;
      if (statusFilter === 'Disputed' && p.status !== 'Delivery Disputed') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesLoc = p.district.toLowerCase().includes(q) || p.state.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesLoc) return false;
      }
      return true;
    });
  }, [projects, selectedState, selectedDistrict, selectedDepartment, riskFilter, statusFilter, searchQuery]);

  // Aggregate metrics
  const totalApproved = filteredProjects.reduce((acc, p) => acc + p.approvedBudget, 0);
  const totalReportedSpent = filteredProjects.reduce((acc, p) => acc + p.reportedExpenditure, 0);
  const totalReferenceCost = filteredProjects.reduce((acc, p) => acc + p.illustrativeReferenceCost, 0);
  const totalDiscrepancies = filteredProjects.reduce((acc, p) => acc + p.potentialDiscrepancy, 0);
  const underReviewCount = filteredProjects.filter(p => p.status === 'Under Review' || p.status === 'Pending Audit' || p.status === 'Delivery Disputed').length;
  const verifiedCount = filteredProjects.filter(p => p.evidenceStatus === 'Complete').length;
  const highPriorityCasesCount = riskFlags.filter(rf => rf.severity === 'high').length;
  const pendingComplaintsCount = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed with Explanation').length;

  const handleOpenCase = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePage('project-detail');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Header with Official Government of India Identity */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <NationalEmblem size="md" className="hidden sm:flex w-12 h-12 shadow-md" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-900 text-xs font-semibold border border-teal-500/30">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span>{t('overview', 'National Public Accountability Overview')}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-slate-700">{financialYear}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 text-[11px] font-bold border border-amber-500/20">
                  <NationalFlag size="xs" withBorder={false} withShadow={false} />
                  <span>भारत सरकार / Govt. of India</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span>Public Accountability Platform</span>
                <span className="text-slate-400 text-lg font-normal hidden md:inline">|</span>
                <span className="text-slate-800 text-xl sm:text-2xl font-bold hidden md:inline">Executive Accountability Hub</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                Empowering citizens, auditors, and administrators across all 36 States & UTs. Connecting central & state treasury releases, public procurement, physical geotagged inspections, and community grievances.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => exportToCsv('projects')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleOpenCase('JD-UP-2026-001')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <School className="w-3.5 h-3.5" />
              <span>Inspect ₹1.2L School Anomaly</span>
            </button>
          </div>
        </div>

        {/* Dynamic Filter Controls Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Department filter */}
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            className="glass-input rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          {/* All 36 States/UTs filter */}
          <select
            value={selectedState}
            onChange={e => {
              setSelectedState(e.target.value);
              setSelectedDistrict('All');
            }}
            className="glass-input rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer max-w-[200px]"
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

          {/* Risk Level filter */}
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value as any)}
            className="glass-input rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Risk Tiers</option>
            <option value="High">High Risk (Score 70+)</option>
            <option value="Medium">Medium Risk (40–69)</option>
            <option value="Low">Low Risk (&lt;40)</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="glass-input rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Project Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Disputed">Delivery Disputed</option>
          </select>

          {(selectedState !== 'All' || selectedDepartment !== 'All' || riskFilter !== 'All' || statusFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedState('All');
                setSelectedDistrict('All');
                setSelectedDepartment('All');
                setRiskFilter('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="text-xs text-rose-600 font-semibold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 8 Primary Summary Metric Cards (Glassmorphism) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>Approved Allocation</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {formatINR(totalApproved)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Total statutory budget ceiling</div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>Recorded Expenditure</span>
            <CircleDollarSignIcon className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {formatINR(totalReportedSpent)}
          </div>
          <div className="mt-1 text-[11px] text-teal-700 font-medium">Claimed by implementing units</div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>Monitored Projects</span>
            <FolderKanban className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {filteredProjects.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Tracked in live demonstration</div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>Projects Under Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-700 font-mono">
            {underReviewCount}
          </div>
          <div className="mt-1 text-[11px] text-amber-800">Pending audit or verification</div>
        </div>

        {/* Card 5 */}
        <div className="glass-panel-amber rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-900 font-medium mb-1">
            <span>Unresolved Discrepancies</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-950 font-mono">
            {formatINR(totalDiscrepancies)}
          </div>
          <div className="mt-1 text-[11px] text-amber-800 font-medium">Claims vs reference estimates</div>
        </div>

        {/* Card 6 */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>Complaints Awaiting Action</span>
            <MessageSquareWarning className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-rose-700 font-mono">
            {pendingComplaintsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Citizen grievances queued</div>
        </div>

        {/* Card 7 */}
        <div className="glass-panel-teal rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-teal-900 font-medium mb-1">
            <span>Verified Field Delivery</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-950 font-mono">
            {verifiedCount}
          </div>
          <div className="mt-1 text-[11px] text-teal-800 font-medium">100% evidence validated</div>
        </div>

        {/* Card 8 */}
        <div className="glass-panel-rose rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-rose-900 font-medium mb-1">
            <span>High-Priority Review Queue</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-rose-950 font-mono">
            {highPriorityCasesCount}
          </div>
          <div className="mt-1 text-[11px] text-rose-800 font-medium">Score &gt;70 requires auditor action</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Approved vs Recorded Expenditure */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Approved Allocation vs Expenditure</h3>
              <p className="text-xs text-slate-500">Benchmark comparison of public funds across active works</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              INR Breakdown
            </span>
          </div>
          <BudgetVsExpenditureChart projects={filteredProjects} />
        </div>

        {/* Chart 2: Expenditure by Department */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Departmental Allocation & Utilization</h3>
              <p className="text-xs text-slate-500">Monitoring fiscal absorption against approved departmental envelopes</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
              Active Nodes
            </span>
          </div>
          <DepartmentBreakdownChart departments={departments} />
        </div>
      </div>

      {/* Monthly Expenditure & Trends + Geographic Schematic Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Expenditure Run-rate</h3>
              <p className="text-xs text-slate-500">Claimed vs Verified disbursements</p>
            </div>
          </div>
          <MonthlyTrendsChart />
        </div>

        <div className="lg:col-span-2">
          <IndiaSchematicMap
            projects={projects}
            selectedState={selectedState}
            onSelectState={st => setSelectedState(st)}
          />
        </div>
      </div>

      {/* Priority Cases for Human Review Table */}
      <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">Priority Cases Requiring Human Review</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Discrepancies flagged by automated rule benchmarks. Click any case to open the audit workspace.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredProjects.length} projects
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Case / Project ID</th>
                <th className="py-3 px-4 font-bold">Project Name & Location</th>
                <th className="py-3 px-4 font-bold">Claimed Amount</th>
                <th className="py-3 px-4 font-bold">Reference Benchmark</th>
                <th className="py-3 px-4 font-bold">Discrepancy</th>
                <th className="py-3 px-4 font-bold">Risk Score</th>
                <th className="py-3 px-4 font-bold">Evidence Status</th>
                <th className="py-3 px-4 font-bold">Review Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProjects.map(p => {
                const isCentralSchoolCase = p.id === 'JD-UP-2026-001';

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isCentralSchoolCase ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {p.id}
                      {isCentralSchoolCase && (
                        <span className="block text-[9px] text-amber-700 uppercase tracking-wider font-extrabold mt-0.5">
                          Central Case
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{p.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {p.district}, {p.state}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {formatINR(p.reportedExpenditure)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-teal-700 whitespace-nowrap">
                      {formatINR(p.illustrativeReferenceCost)}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {p.potentialDiscrepancy > 0 ? (
                        <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          +{formatINR(p.potentialDiscrepancy)}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                          p.riskScore >= 70
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : p.riskScore >= 40
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {p.riskScore} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          p.evidenceStatus === 'Complete'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.evidenceStatus === 'Discrepancy Flagged'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p.evidenceStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-slate-700">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenCase(p.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-all ${
                          isCentralSchoolCase
                            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <span>Inspect Case</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity & Tamper-Evident Event Stream */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Recent Platform Activity & Audit Stream</h3>
          </div>
          <button
            onClick={() => setActivePage('audit')}
            className="text-xs text-teal-700 font-bold hover:underline"
          >
            View Complete Audit Log →
          </button>
        </div>

        <div className="space-y-3">
          {auditEvents.slice(0, 4).map(evt => (
            <div
              key={evt.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-bold">
                    {evt.entityType}: {evt.entityId}
                  </span>
                  <span className="font-bold text-slate-900">{evt.eventType}</span>
                </div>
                <p className="text-[11px] text-slate-600">{evt.reason}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-right sm:text-right">
                <div className="text-[11px]">
                  <span className="text-slate-400 block font-mono">{evt.timestamp}</span>
                  <span className="text-slate-700 font-semibold">{evt.actorRole}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function CircleDollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 6v2m0 8v2" />
    </svg>
  );
}
