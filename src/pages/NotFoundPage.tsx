import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, ArrowLeft, Home, Search, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <Eye className="w-8 h-8" />
        </div>

        <div>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            HTTP 404
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Record Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            The requested accountability module, case docket, or public project path does not exist in the current directory index.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center text-xs">
          <button
            onClick={() => setActivePage('overview')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
          <button
            onClick={() => setActivePage('landing')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
