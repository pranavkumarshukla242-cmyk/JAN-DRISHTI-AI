import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  Camera,
  School,
  FileCheck,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const DeliveryVerification: React.FC = () => {
  const {
    deliveryRecords,
    projects,
    setSelectedProjectId,
    setActivePage,
    showToast
  } = useApp();

  const [selectedRecord, setSelectedRecord] = useState(deliveryRecords[0]);

  // Central school delivery records
  const schoolRecords = deliveryRecords.filter(d => d.projectId === 'JD-UP-2026-001');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>On-Site Physical Delivery Reconciliation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Delivery Verification & Physical Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Compare contracted bills of quantities (BoQ) with reported progress and geo-tagged physical inspection counts.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProjectId('JD-UP-2026-001');
            setActivePage('project-detail');
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <School className="w-4 h-4" />
          <span>Examine School Fan Mismatch</span>
        </button>
      </div>

      {/* Critical Case Callout: 20 Fans Contracted vs 16 Fans Verified */}
      <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>Physical Delivery Anomaly: School Fans (20 Contracted vs 16 Verified Mounted)</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Division 3 physical on-site inspection verified only <strong>16 installed ceiling fans</strong> across 4 classrooms. 4 units were billed on invoice <em>APEX/25-26/104</em> but remain unmounted. In addition, <strong>390 books</strong> were counted against <strong>450 billed</strong>. The platform does not label this as proven theft; it places a hold on retention funds pending complete physical handover.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="text-slate-400 block text-[11px]">Contracted Quantity</span>
            <span className="font-bold text-slate-900 text-base">20 Units (Fans)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="text-slate-400 block text-[11px]">Billed on Invoice</span>
            <span className="font-bold text-amber-700 text-base">20 Units</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="text-slate-400 block text-[11px]">Physically Counted</span>
            <span className="font-bold text-teal-700 text-base">16 Mounted Fans</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="text-slate-400 block text-[11px]">Delivery Deficit</span>
            <span className="font-bold text-rose-700 text-base">−4 Fans (−20%)</span>
          </div>
        </div>
      </div>

      {/* Delivery Records Inspection Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">Field Delivery Records</span>
          <span className="font-mono text-slate-500">{deliveryRecords.length} Items Inspected</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-white text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Record ID</th>
                <th className="py-3 px-4 font-bold">Work / Item Description</th>
                <th className="py-3 px-4 font-bold">Project ID</th>
                <th className="py-3 px-4 font-bold">Contracted</th>
                <th className="py-3 px-4 font-bold">Billed</th>
                <th className="py-3 px-4 font-bold">Physically Verified</th>
                <th className="py-3 px-4 font-bold">Inspection Status</th>
                <th className="py-3 px-4 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {deliveryRecords.map(d => {
                const isSelected = selectedRecord.id === d.id;

                return (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedRecord(d)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-teal-50/60' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {d.id}
                    </td>
                    <td className="py-3 px-4 text-slate-900 font-semibold">{d.itemOrWork}</td>
                    <td className="py-3 px-4 font-mono text-teal-700 whitespace-nowrap">{d.projectId}</td>
                    <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {d.expectedQuantity} {d.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-700 whitespace-nowrap">
                      {d.reportedQuantity}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {d.verifiedQuantity}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          d.inspectionStatus === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {d.inspectionStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedRecord(d);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Inspection Record Details & Photo Placeholders */}
      {selectedRecord && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono text-slate-400 font-bold block">
                Delivery Record: {selectedRecord.id}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedRecord.itemOrWork}</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Inspected by: <strong className="text-slate-800">{selectedRecord.inspectorRole}</strong> ({selectedRecord.inspectionDate})
              </p>
            </div>

            <button
              onClick={() => {
                showToast('success', 'Independent Audit Scheduled', 'Field verification team dispatched');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Order Independent Re-Inspection
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Field Inspector Observations:
            </h4>
            <p className="text-slate-600 leading-relaxed font-mono">{selectedRecord.notes}</p>
          </div>

          {/* Photo and Metadata Placeholders */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-teal-600" />
              Geo-Tagged Inspection Evidence Preview
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="h-32 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 flex-col gap-2">
                  <Camera className="w-8 h-8" />
                  <span className="text-[11px] font-mono">Geo-tag: 26.8467° N, 80.9462° E</span>
                </div>
                <div className="text-xs">
                  <strong className="text-slate-900 block">Site Inspection Photo 1 (Classroom 3B):</strong>
                  <span className="text-slate-500 text-[11px]">Ceiling fans 1–4 verified operational and wired to main breaker.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-2">
                <div className="h-32 bg-rose-100 rounded-xl flex items-center justify-center text-rose-400 flex-col gap-2">
                  <AlertTriangle className="w-8 h-8 text-rose-500" />
                  <span className="text-[11px] font-mono text-rose-700 font-bold">Uninstalled Mounting Hook Photo</span>
                </div>
                <div className="text-xs">
                  <strong className="text-rose-950 block">Site Inspection Photo 2 (Classroom 4A):</strong>
                  <span className="text-rose-800 text-[11px]">Empty ceiling hook; missing 4th fan cited by citizen complaint.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
