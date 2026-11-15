import React, { useState } from 'react';
import { Project, Department } from '../../types';
import { ALL_INDIAN_STATES_AND_UTS, IndianRegion } from '../../data/indianGeoAndLanguages';

export const formatINR = (val: number): string => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const BudgetVsExpenditureChart: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const maxBudget = Math.max(...projects.map(p => p.approvedBudget), 1);

  return (
    <div className="space-y-4">
      {projects.slice(0, 5).map(p => {
        const approvedPct = Math.min(100, Math.round((p.approvedBudget / maxBudget) * 100));
        const spentPct = Math.min(100, Math.round((p.reportedExpenditure / maxBudget) * 100));
        const refPct = Math.min(100, Math.round((p.illustrativeReferenceCost / maxBudget) * 100));

        return (
          <div key={p.id} className="p-3.5 glass-panel-subtle rounded-2xl border border-white/60 hover:border-teal-400/50 transition-all shadow-sm">
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-semibold text-slate-800 truncate max-w-[240px] sm:max-w-xs">{p.name}</span>
              <span className="font-mono text-slate-500 font-medium">{p.id}</span>
            </div>
            
            <div className="space-y-1.5">
              {/* Approved Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Approved Budget</span>
                  <span className="font-mono font-medium text-slate-700">{formatINR(p.approvedBudget)}</span>
                </div>
                <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${approvedPct}%` }} />
                </div>
              </div>

              {/* Reported Spent Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Claimed Expenditure</span>
                  <span className="font-mono font-medium text-amber-700">{formatINR(p.reportedExpenditure)}</span>
                </div>
                <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.potentialDiscrepancy > 0 ? 'bg-amber-500' : 'bg-teal-600'}`}
                    style={{ width: `${spentPct}%` }}
                  />
                </div>
              </div>

              {/* Reference Cost Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Reference Benchmark</span>
                  <span className="font-mono font-medium text-teal-700">{formatINR(p.illustrativeReferenceCost)}</span>
                </div>
                <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500/80 rounded-full" style={{ width: `${refPct}%` }} />
                </div>
              </div>
            </div>

            {p.potentialDiscrepancy > 0 && (
              <div className="mt-2 pt-1.5 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                <span className="text-amber-800 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Potential Discrepancy for Review
                </span>
                <span className="font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                  +{formatINR(p.potentialDiscrepancy)}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const DepartmentBreakdownChart: React.FC<{ departments: Department[] }> = ({ departments }) => {
  const totalAlloc = departments.reduce((acc, d) => acc + d.budgetAllocated, 0);

  return (
    <div className="space-y-3">
      {departments.map((dept, idx) => {
        const share = Math.round((dept.budgetAllocated / totalAlloc) * 100);
        const utilization = Math.round((dept.budgetSpent / dept.budgetAllocated) * 100);
        const colors = [
          'bg-indigo-600',
          'bg-teal-600',
          'bg-emerald-600',
          'bg-cyan-600',
          'bg-amber-600'
        ];

        return (
          <div key={dept.id} className="p-3.5 glass-panel-subtle rounded-2xl border border-white/60 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">{dept.name}</span>
              <span className="font-mono text-slate-500 font-medium">{share}% allocation</span>
            </div>
            <div className="h-2 w-full bg-slate-200/60 rounded-full overflow-hidden mb-1.5">
              <div className={`h-full rounded-full ${colors[idx % colors.length]}`} style={{ width: `${share}%` }} />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
              <span>Spent: {formatINR(dept.budgetSpent)}</span>
              <span>Allocated: {formatINR(dept.budgetAllocated)} ({utilization}% utilized)</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const MonthlyTrendsChart: React.FC = () => {
  const months = ['Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'];
  const claims = [12.4, 18.2, 28.5, 34.0, 48.6, 62.3]; // Crores
  const verified = [11.8, 17.5, 26.2, 31.8, 43.1, 54.8]; // Crores

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-4 text-xs mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-slate-600">Claimed (₹ Cr)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-teal-600" />
          <span className="text-slate-600">Verified Payment (₹ Cr)</span>
        </div>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-l border-slate-200">
        {months.map((m, idx) => {
          const claimHeight = Math.round((claims[idx] / 70) * 140);
          const verifiedHeight = Math.round((verified[idx] / 70) * 140);

          return (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-1.5 h-36">
                <div
                  className="w-4 bg-amber-500/80 rounded-t hover:bg-amber-600 transition-all cursor-pointer relative group"
                  style={{ height: `${claimHeight}px` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded whitespace-nowrap z-10 shadow">
                    ₹{claims[idx]} Cr
                  </div>
                </div>
                <div
                  className="w-4 bg-teal-600 rounded-t hover:bg-teal-700 transition-all cursor-pointer relative group"
                  style={{ height: `${verifiedHeight}px` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded whitespace-nowrap z-10 shadow">
                    ₹{verified[idx]} Cr
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-500">{m}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IndiaSchematicMap: React.FC<{
  projects: Project[];
  onSelectState: (state: string) => void;
  selectedState: string;
}> = ({ projects, onSelectState, selectedState }) => {
  const [mapSearch, setMapSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'State' | 'Union Territory'>('All');

  const filteredRegions = ALL_INDIAN_STATES_AND_UTS.filter(st => {
    if (filterType !== 'All' && st.type !== filterType) return false;
    if (mapSearch) {
      const q = mapSearch.toLowerCase();
      return st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q) || st.capital.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="glass-panel-dark text-white rounded-3xl p-6 relative overflow-hidden border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            National Geographic Accountability Hub (All 36 States & UTs)
          </h4>
          <p className="text-xs text-slate-400">
            Interactive spatial registry across all 28 States and 8 Union Territories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectState('All')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
              selectedState === 'All'
                ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold shadow-md'
                : 'border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            All India View
          </button>
        </div>
      </div>

      {/* Filter and Search Bar for all 36 States */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <input
          type="text"
          value={mapSearch}
          onChange={e => setMapSearch(e.target.value)}
          placeholder="Filter any of 36 States/UTs (e.g. Kerala, Delhi, Assam)..."
          className="flex-1 min-w-[200px] px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
        />

        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/10 gap-1 text-[11px]">
          <button
            onClick={() => setFilterType('All')}
            className={`px-2.5 py-1 rounded-lg ${filterType === 'All' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            All (36)
          </button>
          <button
            onClick={() => setFilterType('State')}
            className={`px-2.5 py-1 rounded-lg ${filterType === 'State' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            States (28)
          </button>
          <button
            onClick={() => setFilterType('Union Territory')}
            className={`px-2.5 py-1 rounded-lg ${filterType === 'Union Territory' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            UTs (8)
          </button>
        </div>
      </div>

      {/* 36 States/UTs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {filteredRegions.map(st => {
          const stateProjects = projects.filter(p => p.state === st.name);
          const flagCount = stateProjects.filter(p => p.potentialDiscrepancy > 0).length;
          const isSelected = selectedState === st.name;

          return (
            <div
              key={st.code}
              onClick={() => onSelectState(isSelected ? 'All' : st.name)}
              className={`p-2.5 rounded-2xl border cursor-pointer transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-teal-500/30 border-teal-400 ring-2 ring-teal-400/40 shadow-lg'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/30 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] px-1.5 py-0.2 bg-white/10 text-teal-300 rounded font-bold">
                    {st.code}
                  </span>
                  {flagCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <div className="font-bold text-xs text-white truncate leading-tight">{st.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{st.capital}</div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{stateProjects.length > 0 ? `${stateProjects.length} Pkg` : '0 Pkg'}</span>
                {flagCount > 0 ? (
                  <span className="text-amber-300 font-bold">{flagCount} Alert</span>
                ) : (
                  <span className="text-emerald-400">Active</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
