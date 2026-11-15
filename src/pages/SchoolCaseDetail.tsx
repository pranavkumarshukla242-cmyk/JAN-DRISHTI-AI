import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import { fictionalRoles } from '../data/seedData';
import {
  School,
  AlertTriangle,
  Scale,
  CheckCircle2,
  Clock,
  Sliders,
  FileText,
  UserCheck,
  Send,
  ShieldAlert,
  ArrowLeft,
  XCircle,
  HelpCircle,
  FileCheck,
  Building,
  Paperclip,
  Activity,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { NationalFlag } from '../components/common/NationalFlag';

export const SchoolCaseDetail: React.FC = () => {
  const {
    projects,
    selectedProjectId,
    reviewCases,
    payments,
    evidence,
    deliveryRecords,
    auditEvents,
    setActivePage,
    toleranceThreshold,
    setToleranceThreshold,
    updateCaseChecklist,
    assignCaseReviewer,
    addCaseNote,
    updateCaseStatus,
    requestMissingDocuments,
    scheduleIndependentInspection,
    currentUserRole
  } = useApp();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const activeCase = reviewCases.find(c => c.projectId === project.id) || reviewCases[0];

  const [activeTab, setActiveTab] = useState<'breakdown' | 'evidence' | 'reconciliation' | 'actions' | 'audit-log'>('breakdown');
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState(activeCase?.assignedReviewerRole || 'Senior State Auditor');

  // Modal dialog states
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docNameInput, setDocNameInput] = useState('');
  
  const [inspectionModalOpen, setInspectionModalOpen] = useState(false);
  const [inspectionNotesInput, setInspectionNotesInput] = useState('');

  const [closureModalOpen, setClosureModalOpen] = useState(false);
  const [closureType, setClosureType] = useState<'Resolved' | 'Closed Unresolved'>('Resolved');
  const [closureReasonInput, setClosureReasonInput] = useState('');

  // Calculations
  const claimedTotal = project.reportedExpenditure; // 9,00,000
  const referenceTotal = project.illustrativeReferenceCost; // 7,80,000
  const discrepancy = project.potentialDiscrepancy; // 1,20,000
  const discrepancyPercentOfClaim = ((discrepancy / claimedTotal) * 100).toFixed(2); // 13.33%
  const discrepancyPercentOfRef = ((discrepancy / referenceTotal) * 100).toFixed(2); // 15.38%

  // Project payments
  const projectPayments = payments.filter(p => p.projectId === project.id);
  const totalRecordedPayments = projectPayments.reduce((acc, p) => acc + p.amount, 0); // 7,80,000
  const unreconciledBalance = claimedTotal - totalRecordedPayments; // 1,20,000

  // Evidence list
  const projectEvidence = evidence.filter(e => e.projectId === project.id);

  // Delivery records
  const projectDelivery = deliveryRecords.filter(d => d.projectId === project.id);

  // Case audit events
  const caseAuditEvents = auditEvents.filter(a => a.entityId === activeCase?.id || a.entityId === project.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addCaseNote(activeCase.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleAssignReviewer = () => {
    assignCaseReviewer(activeCase.id, selectedReviewer);
  };

  const handleRequestDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNameInput.trim()) return;
    requestMissingDocuments(activeCase.id, docNameInput.trim());
    setDocNameInput('');
    setDocModalOpen(false);
  };

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectionNotesInput.trim()) return;
    scheduleIndependentInspection(activeCase.id, inspectionNotesInput.trim());
    setInspectionNotesInput('');
    setInspectionModalOpen(false);
  };

  const handleCloseCaseSubmit = () => {
    if (!closureReasonInput.trim()) return;
    updateCaseStatus(activeCase.id, closureType, closureReasonInput.trim());
    setClosureReasonInput('');
    setClosureModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs">
        <button
          onClick={() => setActivePage('overview')}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to National Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-400">Case Dossier:</span>
          <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
            {activeCase?.id || 'RC-2026-001'}
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-mono text-slate-600">{project.id}</span>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-950 border border-amber-500/30 flex items-center gap-1.5">
                <NationalFlag size="xs" withBorder={false} withShadow={false} />
                <span>भारत सरकार सतर्कता जाँच / Govt. Vigilance Dossier</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Potential Overbilling Detected — ₹1,20,000 Difference
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Risk Score: {project.riskScore}/100
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Status: {activeCase?.status || project.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fictional composite school infrastructure upgrade in <strong>{project.locality}, {project.district}, {project.state}</strong>. Monitored under {project.scheme}.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-mono">
              <span>Department: {project.departmentId}</span>
              <span>•</span>
              <span>Contractor: {project.contractorName}</span>
              <span>•</span>
              <span>Assigned Reviewer: {activeCase?.assignedReviewerRole}</span>
            </div>
          </div>

          {/* Quick Metrics Badge Panel */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2 sm:min-w-[280px]">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Claimed Expenditure</span>
              <span className="font-mono text-amber-400 font-bold text-sm">{formatINR(claimedTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Illustrative Reference</span>
              <span className="font-mono text-teal-400 font-bold text-sm">{formatINR(referenceTotal)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-amber-300">Potential Discrepancy</span>
              <span className="font-mono text-base font-extrabold text-amber-400">
                +{formatINR(discrepancy)} ({discrepancyPercentOfClaim}%)
              </span>
            </div>
          </div>
        </div>

        {/* Prominent Mandatory Non-Accusatory Warning */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-start gap-3">
          <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-0.5">Statutory Audit Due Process Warning:</span>
            "An estimated cost difference is an anomaly, not proof of fraud. Legitimate expenses, specifications, taxes, transport, market conditions, and approved variations must be reviewed before any conclusion is reached."
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
          {[
            { id: 'breakdown', label: '1. Cost Breakdown & Calculations' },
            { id: 'evidence', label: '2. Evidence Checklist & Gaps' },
            { id: 'reconciliation', label: '3. Payment Reconciliation' },
            { id: 'actions', label: '4. Human Review & Actions' },
            { id: 'audit-log', label: '5. Audit Timeline' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-700 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Component Breakdown & Calculations */}
      {activeTab === 'breakdown' && (
        <div className="space-y-6">
          {/* Transparent Arithmetic Panel */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Component-Level Arithmetic & Discrepancy Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Transparent calculation: Claimed expenditure − illustrative reference cost = potential discrepancy
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-mono">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-600">Demo Tolerance:</span>
                <span className="font-bold text-teal-700">{toleranceThreshold}%</span>
              </div>
            </div>

            {/* Configurable Tolerance Setting Bar */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Illustrative Tolerance Threshold Setting:</span>
                <span className="font-mono font-bold text-slate-900">{toleranceThreshold}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={toleranceThreshold}
                onChange={e => setToleranceThreshold(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Current case variance of <strong>{discrepancyPercentOfRef}%</strong> exceeds the {toleranceThreshold}% threshold, triggering automated audit review recommendation. This threshold is an illustrative demonstration setting rather than a universal procurement rule.
              </p>
            </div>

            {/* Component Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Component Name & Description</th>
                    <th className="py-3 px-4 font-bold">Amount Claimed</th>
                    <th className="py-3 px-4 font-bold">Reference Cost</th>
                    <th className="py-3 px-4 font-bold">Variance / Difference</th>
                    <th className="py-3 px-4 font-bold">Materials</th>
                    <th className="py-3 px-4 font-bold">Labour</th>
                    <th className="py-3 px-4 font-bold">Taxes & Freight</th>
                    <th className="py-3 px-4 font-bold">Anomaly Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {project.components?.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-500">{c.description}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                        {formatINR(c.amountClaimed)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                        {formatINR(c.referenceCost)}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          +{formatINR(c.difference)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {formatINR(c.materialsCost)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {formatINR(c.labourCost)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {formatINR(c.transportTaxCost)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                          Exceeds Ref by {((c.difference / c.referenceCost) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-slate-100/80 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td className="py-3.5 px-4">
                      TOTALS (All 3 Components)
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-800">
                      {formatINR(claimedTotal)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-teal-800">
                      {formatINR(referenceTotal)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-900">
                      +{formatINR(discrepancy)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">₹5,70,000</td>
                    <td className="py-3.5 px-4 font-mono">₹1,39,000</td>
                    <td className="py-3.5 px-4 font-mono">₹71,000</td>
                    <td className="py-3.5 px-4 font-mono text-amber-900">
                      13.33% Claim Discrepancy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Assumptions & Basis of Estimate Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-teal-600" />
                Benchmark Estimation Assumptions
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The reference estimate of ₹7,80,000 is provisional and derived from:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li><strong>PWD Schedule of Rates (UP Lucknow Circle 2025-26):</strong> Canteen civil plinth, brickwork, and vitrified anti-skid flooring standard benchmark = ₹3,50,000.</li>
                <li><strong>GeM L1 Electronic Tender Rates:</strong> 20 BEE 5-star ceiling fans (₹2,400/unit), 60 dual study desks (₹2,800/unit), and standard playground swing frame = ₹3,50,000.</li>
                <li><strong>NCERT State Textbook Distribution Catalogue:</strong> Supplementary readers and library compendiums = ₹80,000.</li>
              </ul>
              <div className="mt-3 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200">
                Note: The estimate remains provisional until validated against contractor invoices, certified M-Book measurement entries, and market freight surcharges.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                Contractor Explanation & Pending Justifications
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The contractor, <em>Apex Shiksha Infra & Supplies Pvt Ltd</em>, provided preliminary oral representations during initial inquiry:
              </p>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs text-slate-700 space-y-1.5">
                <p><strong>Canteen (+₹50,000):</strong> Contractor claims high-grade AISI-304 stainless steel food counter was installed instead of Grade 201 due to school hygiene requirements.</p>
                <p><strong>Equipment (+₹50,000):</strong> Contractor asserts freight surge during monsoon and copper electrical wiring price elevation.</p>
                <p><strong>Books (+₹20,000):</strong> Hardcover archival lamination provided for rural durability.</p>
              </div>
              <p className="text-[11px] text-slate-500">
                Auditor finding: Oral claims cannot be sanctioned without formal contract variation amendments and manufacturer tax invoices.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence Checklist & Gaps */}
      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  12-Point Statutory Evidence Verification Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Auditors can inspect records and toggle verification marks (Pending, Received, Verified, Disputed).
                </p>
              </div>
              <div className="text-xs font-mono text-slate-500">
                Verified: {activeCase?.checklist.filter(c => c.status === 'verified').length} / {activeCase?.checklist.length} items
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCase?.checklist.map(item => {
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{item.id}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            item.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'disputed'
                              ? 'bg-rose-100 text-rose-800'
                              : item.status === 'received'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{item.item}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">Updated: {item.updatedAt}</span>
                    </div>

                    {/* Interactive Status Changer Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Change Mark:</span>
                      <div className="flex items-center gap-1">
                        {(['pending', 'received', 'verified', 'disputed'] as const).map(st => (
                          <button
                            key={st}
                            onClick={() => updateCaseChecklist(activeCase.id, item.id, st)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-all ${
                              item.status === st
                                ? 'bg-slate-900 text-white font-bold'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uploaded Records & Documents Preview */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Uploaded Digital Evidence & Metadata Dossier
            </h4>
            <div className="divide-y divide-slate-100">
              {projectEvidence.map(ev => (
                <div key={ev.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-900">{ev.title}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 bg-slate-100 rounded text-slate-600">
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{ev.description}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Source: {ev.source} • Submitter: {ev.submittedByRole} ({ev.submittedAt})
                    </div>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      ev.verificationStatus === 'verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : ev.verificationStatus === 'disputed'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {ev.verificationStatus.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Payment Reconciliation */}
      {activeTab === 'reconciliation' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Treasury Digital Payment Reconciliation
              </h3>
              <p className="text-xs text-slate-500">
                Connecting official expenditure claims, invoices, and verified electronic disbursements.
              </p>
            </div>

            {/* Reconciliation Balance Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-900 text-white rounded-2xl">
              <div>
                <span className="text-[11px] text-slate-400 block">Reported Claim</span>
                <span className="text-xl font-extrabold font-mono text-amber-400">
                  {formatINR(claimedTotal)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Supplier Bill APEX/25-26/104</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Recorded Treasury Payments</span>
                <span className="text-xl font-extrabold font-mono text-teal-400">
                  {formatINR(totalRecordedPayments)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">3 PFMS electronic transfers</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Unreconciled Difference</span>
                <span className="text-xl font-extrabold font-mono text-amber-300">
                  {formatINR(unreconciledBalance)}
                </span>
                <span className="text-[10px] text-amber-400 block mt-0.5">Pending documentary audit</span>
              </div>
            </div>

            {/* Traceability Principle Reminder */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 italic">
              "Digital payment traceability establishes a financial record, not the legitimacy of the underlying transaction."
              <br />
              The unreconciled ₹1,20,000 does not automatically indicate that money was stolen; it highlights an expenditure claim lacking corresponding treasury release advice or substantiating contractor measurement sheet.
            </div>

            {/* Fictional Payment Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Transaction Ref</th>
                    <th className="py-3 px-4 font-bold">Payment Purpose</th>
                    <th className="py-3 px-4 font-bold">Recorded Recipient</th>
                    <th className="py-3 px-4 font-bold">Amount</th>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {projectPayments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {p.reference}
                      </td>
                      <td className="py-3 px-4">{p.paymentPurpose}</td>
                      <td className="py-3 px-4 text-slate-700">{p.recipientName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-700 whitespace-nowrap">
                        {formatINR(p.amount)}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">{p.date}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{p.sourceSystem}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t border-slate-200">
                    <td colSpan={3} className="py-3 px-4 text-slate-800">
                      Total Authorised Payments Released:
                    </td>
                    <td className="py-3 px-4 font-mono text-teal-800">
                      {formatINR(totalRecordedPayments)}
                    </td>
                    <td colSpan={3} className="py-3 px-4 text-slate-500">
                      Difference from ₹9,00,000 claim: ₹1,20,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Delivery Unit Mismatch Callout */}
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Physical Delivery Audit: 4-Unit Fan Mismatch & 60-Book Deficit Flagged</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Contract specifies <strong>20 ceiling fans</strong>. On-site field inspection by Division 3 verified only <strong>16 installed fans</strong> (DEL-2026-001). 4 fans remain uninstalled. In addition, <strong>390 books</strong> were counted against <strong>450 invoiced</strong>. The platform does not assume criminal theft; it blocks final payment release pending physical handover.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Human Review & Actions */}
      {activeTab === 'actions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Reviewer Assignment & Interactive Workflows */}
            <div className="lg:col-span-1 space-y-6">
              {/* Assign Reviewer Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  Assign Authorized Reviewer
                </h4>
                <p className="text-xs text-slate-500">
                  Select certified state auditor or vigilance officer to lead investigation:
                </p>
                <select
                  value={selectedReviewer}
                  onChange={e => setSelectedReviewer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="Senior State Auditor">Senior State Auditor (Rajesh Verma)</option>
                  <option value="Chief District Education Officer (CDEO)">Chief District Education Officer (Anil Saxena)</option>
                  <option value="Divisional Accounts Officer">Divisional Accounts Officer (Sunita Mehra)</option>
                  <option value="Vigilance Investigator">Vigilance Investigator (Vikramaditya Rao)</option>
                  <option value="Third-Party Quality Inspector">Third-Party Quality Inspector (Division 3)</option>
                </select>
                <button
                  onClick={handleAssignReviewer}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Confirm Reviewer Assignment
                </button>
              </div>

              {/* Action Triggers */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Simulated Audit Actions</h4>
                <p className="text-xs text-slate-500">
                  Execute procedural next steps under applicable financial rules:
                </p>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => setDocModalOpen(true)}
                    className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold text-left flex items-center justify-between border border-blue-200 transition-all"
                  >
                    <span>Request Missing Documents</span>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => setInspectionModalOpen(true)}
                    className="w-full py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-xl text-xs font-bold text-left flex items-center justify-between border border-teal-200 transition-all"
                  >
                    <span>Schedule Independent Inspection</span>
                    <ChevronRight className="w-4 h-4 text-teal-600" />
                  </button>

                  <button
                    onClick={() => {
                      updateCaseStatus(activeCase.id, 'Escalated', 'Escalated to State Vigilance Directorate for cross-department scrutiny');
                    }}
                    className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold text-left flex items-center justify-between border border-amber-200 transition-all"
                  >
                    <span>Escalate to State Vigilance Bureau</span>
                    <ChevronRight className="w-4 h-4 text-amber-600" />
                  </button>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <button
                      onClick={() => {
                        setClosureType('Resolved');
                        setClosureModalOpen(true);
                      }}
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Close as Explained (With Written Reason)
                    </button>

                    <button
                      onClick={() => {
                        setClosureType('Closed Unresolved');
                        setClosureModalOpen(true);
                      }}
                      className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Close as Unresolved Discrepancy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Review Notes Log & Add Note Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Case Audit Notes & Inquiry Journal</h4>
                  <p className="text-xs text-slate-500">Every written submission is appended to the immutable case record</p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {activeCase?.notes.length} Recorded Entries
                </span>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Record formal review observation, contractor hearing notes, or measurement sheet findings..."
                  rows={3}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Acting Role: {currentUserRole}
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Append Note to Dossier</span>
                  </button>
                </div>
              </form>

              {/* Notes Journal List */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                {activeCase?.notes.map(note => (
                  <div key={note.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{note.authorRole}</span>
                      <span className="font-mono text-slate-400">{note.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Audit Timeline */}
      {activeTab === 'audit-log' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tamper-Evident Audit Dossier Timeline</h3>
            <p className="text-xs text-slate-500">
              Complete chronological audit trail showing acting roles, timestamps, state transitions, and documented justifications.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {caseAuditEvents.map(evt => (
              <div key={evt.id} className="relative pl-6 pb-2 border-l-2 border-slate-200 space-y-1">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">{evt.eventType}</span>
                  <span className="font-mono text-slate-400 text-[11px]">{evt.timestamp}</span>
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Actor:</span> {evt.actorRole}
                </div>
                <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <span>Transition: </span>
                  <span className="text-slate-700">{evt.previousState}</span> →{' '}
                  <span className="font-bold text-teal-700">{evt.newState}</span>
                </div>
                <p className="text-xs text-slate-700 italic pt-0.5">"{evt.reason}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Missing Document Modal */}
      {docModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <form onSubmit={handleRequestDocSubmit} className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Request Missing Documentary Evidence</h3>
              <p className="text-xs text-slate-500">
                Specify document required from contractor or implementing officer:
              </p>
              <input
                type="text"
                value={docNameInput}
                onChange={e => setDocNameInput(e.target.value)}
                placeholder="e.g. Certified M-Book entry for canteen plinth or Mill Test Certificate"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDocModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Issue Demand Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Inspection Modal */}
      {inspectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <form onSubmit={handleInspectionSubmit} className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Schedule Independent Technical Inspection</h3>
              <p className="text-xs text-slate-500">
                Depute third-party engineering team to conduct physical measurement and count at school:
              </p>
              <textarea
                value={inspectionNotesInput}
                onChange={e => setInspectionNotesInput(e.target.value)}
                placeholder="Specify scope: Count remaining 4 ceiling fans, verify Grade 304 food counter thickness, and audit library books."
                rows={3}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInspectionModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Confirm Inspection Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Closure Modal with Mandatory Written Rationale */}
      {closureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {closureType === 'Resolved' ? 'Close Case as Explained' : 'Close as Unresolved Discrepancy'}
              </h3>
              <p className="text-xs text-slate-600">
                Mandatory Due Process Rule: Closing a case requires a detailed written justification explaining findings and documentary basis.
              </p>
              <textarea
                value={closureReasonInput}
                onChange={e => setClosureReasonInput(e.target.value)}
                placeholder="Write mandatory closure justification here (e.g. Contractor produced GST return and engineer certified variation amendment, or unapproved overbilling referred for financial recovery)..."
                rows={4}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setClosureModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCloseCaseSubmit}
                  disabled={!closureReasonInput.trim()}
                  className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-sm transition-all ${
                    closureType === 'Resolved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                  } disabled:opacity-50`}
                >
                  Record Reasoned Outcome
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
