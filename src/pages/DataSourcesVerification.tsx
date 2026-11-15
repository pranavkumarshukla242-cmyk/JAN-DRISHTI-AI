import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  FileCheck,
  Server,
  Layers,
  Activity
} from 'lucide-react';

export const DataSourcesVerification: React.FC = () => {
  const { dataSources, auditEvents, showToast } = useApp();

  const handleTestConnector = (name: string) => {
    showToast('info', 'Connector Health Check', `Simulated handshake with ${name} returned 200 OK.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold mb-2 border border-teal-500/30">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>Data Ingestion & Integrity Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Data Sources & Provenance Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Simulated and imported demonstration registries connecting treasury scrolls, e-procurement tenders, and mobile inspection dockets.
          </p>
        </div>

        <div className="p-3.5 glass-panel-amber rounded-2xl border border-amber-300 text-xs text-amber-950 self-start sm:self-auto">
          <strong>Demonstration Status:</strong>
          All connectors operate on synthetic sample data. No live production government API is claimed.
        </div>
      </div>

      {/* Ingestion Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map(src => (
          <div
            key={src.id}
            className="glass-panel rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-800">{src.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {src.connectionMode}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 leading-snug">{src.name}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{src.dataType}</p>

              <div className="p-3 glass-panel-subtle rounded-2xl border border-slate-200/60 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Record Count:</span>
                  <span className="font-bold text-slate-900">{src.recordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Completeness:</span>
                  <span className="font-bold text-teal-800">{src.completeness}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Last Sync (UTC):</span>
                  <span className="text-slate-800">{src.lastImportTime.slice(0, 10)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600">
                <strong className="text-slate-900">Known Limitation:</strong> {src.knownLimitations}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Steward: {src.responsibleDataSteward}
              </span>
              <button
                onClick={() => handleTestConnector(src.name)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm"
              >
                Test Ping
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Data Validation & Hygiene Proofs */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          Automated Data Validation & Anomaly Filters
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The ingestion pipeline executes defensive schema validation on all incoming public records before indexing:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 block font-bold">Duplicate Identifier Check:</strong>
            <p className="text-slate-600">Cross-checks invoice identifiers across projects to prevent double-billing of identical hardware packages.</p>
          </div>
          <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 block font-bold">Arithmetic Balance Check:</strong>
            <p className="text-slate-600">Ensures subtotal + statutory GST matches invoice total without silent round-off distortions.</p>
          </div>
          <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 block font-bold">Tax & Escrow Validation:</strong>
            <p className="text-slate-600">Matches vendor GSTIN registration and verified recipient account before flagging disbursements as reconciled.</p>
          </div>
        </div>
      </div>

      {/* Tamper-Evident Audit Dossier Stream */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Tamper-Evident System Event Stream</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {auditEvents.length} Recorded Proofs
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Demonstration append-only activity log. Every action taken in this session is signed with timestamp and role title.
        </p>

        <div className="space-y-2 pt-2 max-h-64 overflow-y-auto pr-1">
          {auditEvents.map(evt => (
            <div
              key={evt.id}
              className="p-3 glass-panel-subtle rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-800">
                    {evt.entityType}
                  </span>
                  <span className="font-bold text-slate-900">{evt.eventType}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{evt.reason}</p>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <span className="font-mono text-[10px] text-slate-500 block">{evt.timestamp}</span>
                <span className="text-slate-800 font-semibold text-[11px]">{evt.actorRole}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
