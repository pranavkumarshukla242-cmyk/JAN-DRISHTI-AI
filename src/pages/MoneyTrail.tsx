import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import { Payment } from '../types';
import {
  CircleDollarSign,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  School,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';

export const MoneyTrail: React.FC = () => {
  const {
    payments,
    projects,
    setSelectedProjectId,
    setActivePage,
    exportToCsv
  } = useApp();

  const [filterProject, setFilterProject] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = payments.filter(p => {
    if (filterProject !== 'All' && p.projectId !== filterProject) return false;
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    return true;
  });

  const totalFilteredDisbursed = filteredPayments.reduce((acc, p) => acc + p.amount, 0);

  // Central school case payment stats
  const schoolPayments = payments.filter(p => p.projectId === 'JD-UP-2026-001');
  const schoolPaidTotal = schoolPayments.reduce((acc, p) => acc + p.amount, 0); // 7,80,000
  const schoolClaimTotal = 900000;
  const schoolUnreconciled = schoolClaimTotal - schoolPaidTotal; // 1,20,000

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <CircleDollarSign className="w-3.5 h-3.5 text-teal-600" />
            <span>Digital Payment Traceability & Reconciliation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Public Rupee Money Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Reconciles statutory budgets, contracts, vendor invoices, treasury disbursements, and recorded recipient accounts.
          </p>
        </div>

        <button
          onClick={() => exportToCsv('payments')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Payments CSV</span>
        </button>
      </div>

      {/* Fundamental Core Principle Banner */}
      <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200/90 text-xs text-teal-950 leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 text-teal-900 font-bold">Traceability Principle:</strong>
          "Digital payment traceability establishes a financial record, not the legitimacy of the underlying transaction."
          Payment records are a hypothetical reconciliation scenario. An unreconciled balance indicates a gap between claimed expenditure and bank advice, not automatic proof of corruption or theft.
        </div>
      </div>

      {/* Central Case Dedicated Reconciliation Callout (₹1.2L Unreconciled) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-sm bg-gradient-to-br from-amber-50/20 to-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Central Case Reconciliation: JD-UP-2026-001 (School Infrastructure Upgrade)
            </h3>
          </div>
          <button
            onClick={() => {
              setSelectedProjectId('JD-UP-2026-001');
              setActivePage('project-detail');
            }}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline self-start sm:self-auto"
          >
            Open School Audit Workspace →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-900 text-white rounded-2xl">
          <div>
            <span className="text-[11px] text-slate-400 block">Reported Claim</span>
            <span className="text-xl font-extrabold font-mono text-amber-400">
              {formatINR(schoolClaimTotal)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Supplier Bill APEX/25-26/104</span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block">Recorded Treasury Releases</span>
            <span className="text-xl font-extrabold font-mono text-teal-400">
              {formatINR(schoolPaidTotal)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">3 PFMS Vouchers (₹3.5L + ₹3.5L + ₹80k)</span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block">Unreconciled Difference</span>
            <span className="text-xl font-extrabold font-mono text-amber-300">
              {formatINR(schoolUnreconciled)}
            </span>
            <span className="text-[10px] text-amber-300 block mt-0.5">13.33% Claim Variance</span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block">Audit Status</span>
            <span className="text-xs font-bold font-mono px-2 py-1 rounded bg-amber-500/20 text-amber-300 inline-block mt-1">
              Pending Contractor M-Book
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Senior Auditor verification active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">1. Canteen Works Release</span>
            <span className="font-bold font-mono text-slate-900 text-sm">₹3,50,000</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Ref: SBI-PFMS-TR-99881023</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">2. Playground & Electrical Equipment</span>
            <span className="font-bold font-mono text-slate-900 text-sm">₹3,50,000</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Ref: SBI-PFMS-TR-99881024</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">3. Library NCERT Books</span>
            <span className="font-bold font-mono text-slate-900 text-sm">₹80,000</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Ref: SBI-PFMS-TR-99881025</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Payments:</span>
        </div>

        <select
          value={filterProject}
          onChange={e => setFilterProject(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-teal-500"
        >
          <option value="All">All Monitored Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.id} – {p.name.slice(0, 30)}...</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-teal-500"
        >
          <option value="All">All Verification Statuses</option>
          <option value="Recorded">Recorded</option>
          <option value="Verified Against Source">Verified Against Source</option>
          <option value="Pending Reconciliation">Pending Reconciliation</option>
          <option value="Documentation Missing">Documentation Missing</option>
        </select>

        <span className="text-slate-400 font-mono ml-auto">
          Total Disbursed: <strong className="text-slate-800">{formatINR(totalFilteredDisbursed)}</strong>
        </span>
      </div>

      {/* Payments Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Transaction Reference</th>
                <th className="py-3 px-4 font-bold">Project ID</th>
                <th className="py-3 px-4 font-bold">Invoice Reference</th>
                <th className="py-3 px-4 font-bold">Payment Purpose</th>
                <th className="py-3 px-4 font-bold">Recorded Recipient</th>
                <th className="py-3 px-4 font-bold">Payer Agency</th>
                <th className="py-3 px-4 font-bold">Amount (INR)</th>
                <th className="py-3 px-4 font-bold">Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPayments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {p.reference}
                  </td>
                  <td className="py-3 px-4 font-mono text-teal-700 whitespace-nowrap">
                    {p.projectId}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {p.invoiceId}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">{p.paymentPurpose}</td>
                  <td className="py-3 px-4 text-slate-800">{p.recipientName}</td>
                  <td className="py-3 px-4 text-slate-500">{p.payerAgency}</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-700 whitespace-nowrap">
                    {formatINR(p.amount)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">{p.date}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedPayment(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider block">
                  Treasury Voucher Detail
                </span>
                <h3 className="text-base font-bold text-white font-mono">{selectedPayment.reference}</h3>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">Disbursed Amount</span>
                  <span className="text-base font-extrabold font-mono text-teal-700">
                    {formatINR(selectedPayment.amount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Transfer Date</span>
                  <span className="font-mono font-bold text-slate-800">{selectedPayment.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <strong className="text-slate-900 block">Payment Purpose:</strong>
                  <span className="text-slate-600">{selectedPayment.paymentPurpose}</span>
                </div>
                <div>
                  <strong className="text-slate-900 block">Recorded Recipient:</strong>
                  <span className="text-slate-600">{selectedPayment.recipientName}</span>
                </div>
                <div>
                  <strong className="text-slate-900 block">Disbursing Agency:</strong>
                  <span className="text-slate-600">{selectedPayment.payerAgency}</span>
                </div>
                <div>
                  <strong className="text-slate-900 block">Source System:</strong>
                  <span className="text-slate-600">{selectedPayment.sourceSystem}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                Demonstration Record Notice: This electronic transaction voucher is generated from synthetic simulated treasury data.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
