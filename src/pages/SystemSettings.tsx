import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fictionalRoles } from '../data/seedData';
import {
  Sliders,
  RotateCcw,
  Shield,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Save
} from 'lucide-react';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const SystemSettings: React.FC = () => {
  const {
    toleranceThreshold,
    setToleranceThreshold,
    currentUserRole,
    setCurrentUserRole,
    resetDemoData,
    showToast
  } = useApp();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [localTolerance, setLocalTolerance] = useState(toleranceThreshold);

  const handleSaveTolerance = (e: React.FormEvent) => {
    e.preventDefault();
    setToleranceThreshold(localTolerance);
    showToast('success', 'Settings Saved', `Illustrative anomaly tolerance set to ${localTolerance}%`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <Sliders className="w-3.5 h-3.5 text-teal-600" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Settings & Parameters
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Configure automated cost anomaly thresholds, manage role privileges, and reset synthetic seed state.
          </p>
        </div>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demonstration State</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Variance Tolerance Setting */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              Illustrative Discrepancy Tolerance
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sets the threshold percentage at which an expenditure claim difference above reference benchmarks triggers an automated review recommendation.
          </p>

          <form onSubmit={handleSaveTolerance} className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Tolerance Setting:</span>
              <span className="font-mono font-bold text-teal-800 text-base">{localTolerance}%</span>
            </div>

            <input
              type="range"
              min="1"
              max="25"
              value={localTolerance}
              onChange={e => setLocalTolerance(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />

            <div className="p-3 glass-panel-subtle rounded-xl border border-slate-200/80 text-[11px] text-slate-700">
              Default demo setting is <strong>5%</strong>. A tighter tolerance flags more minor material price shifts; a wider tolerance flags only substantial structural discrepancies.
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Parameter</span>
            </button>
          </form>
        </div>

        {/* Demo Role Switcher Matrix */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Active Demonstration Perspective
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Switch between public roles to experience specific workflow journeys and access privileges:
          </p>

          <div className="space-y-2 pt-1 max-h-72 overflow-y-auto pr-1">
            {fictionalRoles.map(role => {
              const isSelected = currentUserRole === role.accessRole;

              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setCurrentUserRole(role.accessRole);
                    showToast('info', 'Role Changed', `Viewing as ${role.displayName}`);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-teal-50/90 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                      : 'glass-panel-subtle border-slate-200/80 hover:bg-white/95'
                  }`}
                >
                  <div className={`mt-0.5 p-1 rounded-lg ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{role.displayName}</span>
                      {isSelected && <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-1.5 py-0.2 rounded border border-teal-200">Active</span>}
                    </div>
                    <span className="text-[11px] text-slate-600 block">{role.roleTitle}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Demo Reset */}
      <ConfirmDialog
        isOpen={confirmResetOpen}
        title="Reset All Demonstration Records?"
        message="This will clear your local storage modifications, reset all evidence checklists, wipe newly added complaints, and restore the initial seed state for all fictional projects."
        confirmLabel="Reset Everything"
        isDestructive={true}
        onConfirm={resetDemoData}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
};
