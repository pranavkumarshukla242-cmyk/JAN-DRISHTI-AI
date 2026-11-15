import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../components/common/SpatialCharts';
import {
  Network,
  Building,
  UserCheck,
  Shield,
  CircleDollarSign,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  School,
  Briefcase
} from 'lucide-react';

interface AuthorityNode {
  id: string;
  title: string;
  roleType: 'Funding Source' | 'Administrative Dept' | 'Implementing Agency' | 'Financial Authorisation' | 'Contractor' | 'Field Inspection' | 'Audit Oversight';
  officerRole: string;
  department: string;
  statutoryDuties: string[];
  associatedProject: string;
  riskStatus: 'Clear' | 'Review Active' | 'Scrutiny Required';
}

export const ResponsibilityMap: React.FC = () => {
  const { setSelectedProjectId, setActivePage } = useApp();

  const nodes: AuthorityNode[] = [
    {
      id: 'node-1',
      title: 'State Ministry of School Education',
      roleType: 'Funding Source',
      officerRole: 'Principal Secretary (Basic Education)',
      department: 'Department of School Education & Literacy',
      statutoryDuties: ['State budget allocation', 'Samagra Shiksha Abhiyan annual work plan approval', 'Policy guidelines'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Clear'
    },
    {
      id: 'node-2',
      title: 'District Project Directorate (Lucknow)',
      roleType: 'Administrative Dept',
      officerRole: 'Chief District Education Officer (CDEO)',
      department: 'District Education Office',
      statutoryDuties: ['Administrative sanction of school upgrades', 'Approval of scope of works', 'Tender publication approval'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Review Active'
    },
    {
      id: 'node-3',
      title: 'School Civil Works Execution Unit',
      roleType: 'Implementing Agency',
      officerRole: 'Assistant Engineer (Infrastructure)',
      department: 'Infrastructure Wing',
      statutoryDuties: ['Site measurement supervision', 'Recording in Measurement Book (M-Book)', 'Contractor progress verification'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Scrutiny Required'
    },
    {
      id: 'node-4',
      title: 'District Treasury & Accounts Node',
      roleType: 'Financial Authorisation',
      officerRole: 'Divisional Accounts Officer',
      department: 'Department of Finance & Treasury',
      statutoryDuties: ['Pre-audit of contractor vouchers', 'PFMS electronic payment debit release', 'GST invoice tax verification'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Clear'
    },
    {
      id: 'node-5',
      title: 'Apex Shiksha Infra & Supplies Pvt Ltd',
      roleType: 'Contractor',
      officerRole: 'Managing Director / Authorized Signatory',
      department: 'Private Commercial Supplier (Fictional)',
      statutoryDuties: ['Delivery of canteen dining shelter', 'Installation of 20 ceiling fans & 60 desks', 'Supply of NCERT books'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Scrutiny Required'
    },
    {
      id: 'node-6',
      title: 'Division 3 Quality Assurance Bureau',
      roleType: 'Field Inspection',
      officerRole: 'Junior Quality Inspector (Division 3)',
      department: 'Independent Quality Control Wing',
      statutoryDuties: ['Physical on-site counting of installed fans', 'Inspection of civil plinth dimensions', 'Verification of delivery receipts'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Review Active'
    },
    {
      id: 'node-7',
      title: 'State Public Accounts & Audit Directorate',
      roleType: 'Audit Oversight',
      officerRole: 'Senior State Auditor',
      department: 'State Audit & Accounts Department',
      statutoryDuties: ['Forensic cost variance analysis', 'Reconciling payments against reference benchmarks', 'Review of citizen complaints'],
      associatedProject: 'JD-UP-2026-001',
      riskStatus: 'Clear'
    }
  ];

  const [selectedNode, setSelectedNode] = useState<AuthorityNode>(nodes[1]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5 text-teal-600" />
            <span>Institutional Responsibility Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Responsibility & Authority Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Documenting statutory chains of custody: Who approved the budget, who signed the contract, who recorded measurements, and who authorized payment.
          </p>
        </div>

        <div className="p-3 bg-slate-100 rounded-2xl text-xs text-slate-700 font-mono self-start sm:self-auto">
          Central Case Node: <strong>JD-UP-2026-001</strong>
        </div>
      </div>

      {/* Interactive Visual Node & Edge Flow Diagram */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-x-auto">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
            Statutory Accountability Chain (School Upgrade JD-UP-2026-001)
          </span>
          <span className="text-xs text-slate-400">
            Click any institutional node to inspect statutory duties
          </span>
        </div>

        <div className="min-w-[840px] flex items-center justify-between py-6 relative">
          {/* Connecting track line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />

          {nodes.map((n, idx) => {
            const isSelected = selectedNode.id === n.id;

            return (
              <div key={n.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setSelectedNode(n)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all shadow-lg ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 ring-4 ring-teal-500/40 scale-110'
                      : n.riskStatus === 'Scrutiny Required'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                      : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-teal-400'
                  }`}
                  title={n.title}
                >
                  <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                </button>

                <div className="mt-3 text-center max-w-[110px]">
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block truncate">
                    {n.roleType}
                  </span>
                  <span className={`text-xs font-bold block truncate mt-0.5 ${isSelected ? 'text-teal-300' : 'text-slate-300'}`}>
                    {n.title.split(' ')[0]}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detailed Inspector */}
      {selectedNode && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-bold uppercase">
                  {selectedNode.roleType}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    selectedNode.riskStatus === 'Scrutiny Required'
                      ? 'bg-rose-100 text-rose-800'
                      : selectedNode.riskStatus === 'Review Active'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedNode.riskStatus}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedNode.title}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Designated Role: <strong className="text-slate-800">{selectedNode.officerRole}</strong> ({selectedNode.department})
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProjectId(selectedNode.associatedProject);
                setActivePage('project-detail');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all self-start sm:self-auto shadow-sm flex items-center gap-1.5"
            >
              <span>Inspect Associated Project Case</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-600" />
                Statutory Accountability & Legal Responsibilities
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                {selectedNode.statutoryDuties.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Due Process Demarcation Principle
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The platform tracks <strong>documented legal delegations</strong> rather than assuming vague hierarchy. Financial approval, physical execution, and independent verification are separated into checks and balances.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
