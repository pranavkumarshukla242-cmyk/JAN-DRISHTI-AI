import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Eye,
  ArrowRight,
  ShieldCheck,
  CircleDollarSign,
  Network,
  CheckCircle2,
  MessageSquareWarning,
  Scale,
  Sparkles,
  ChevronRight,
  FileSearch,
  Search,
  School,
  Lock
} from 'lucide-react';
import { NationalEmblem } from '../components/common/NationalEmblem';
import { NationalFlag } from '../components/common/NationalFlag';

export const LandingPage: React.FC = () => {
  const { setActivePage, setSelectedProjectId, t } = useApp();

  const handleEnterDemo = () => {
    setActivePage('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSchoolCase = () => {
    setSelectedProjectId('JD-UP-2026-001');
    setActivePage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950/80 backdrop-blur-3xl text-white selection:bg-teal-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.25),rgba(255,255,255,0))]" />
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Official Government of India Seal & Masthead */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="inline-flex items-center gap-3.5 px-5 py-2 rounded-2xl glass-panel-dark border border-amber-500/30 shadow-xl mb-4 backdrop-blur-xl">
              <NationalEmblem size="sm" className="w-8 h-8 sm:w-9 sm:h-9" />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide">भारत सरकार</span>
                  <span className="text-slate-600 font-light">|</span>
                  <span className="font-bold text-[11px] sm:text-xs text-amber-300 tracking-wider">GOVERNMENT OF INDIA</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-teal-300 font-medium flex items-center gap-1.5">
                  <NationalFlag size="xs" withBorder={false} withShadow={false} />
                  <span>राष्ट्रीय लोक जवाबदेही मंच | Public Accountability Platform</span>
                </div>
              </div>
            </div>

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-dark border border-teal-500/40 text-teal-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>{t('appSubtitle', 'National Public Accountability Platform')}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">All 36 States & UTs • 12 Languages</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            {t('heroTitle', 'Make Every Public Rupee Accountable.')}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {t('heroSubtitle', 'Connect public funds, government projects, delivery evidence, and institutional responsibility through one AI-powered accountability platform.')}
          </p>

          <div className="mt-3 text-xs sm:text-sm text-amber-200/90 font-serif italic max-w-2xl mx-auto">
            "{t('tagline', 'We don\'t put people under surveillance. We put public responsibility under public visibility.')}"
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnterDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Explore Live Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleOpenSchoolCase}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-bold text-sm flex items-center justify-center gap-2 group transition-all"
            >
              <School className="w-4 h-4 text-amber-400" />
              <span>Inspect ₹1.2L School Case</span>
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm transition-all text-center"
            >
              See How It Works
            </a>
          </div>

          {/* Demonstration Statistics Bar */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹250 Cr</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Monitored Allocations</div>
                <div className="text-[10px] text-teal-400 font-mono mt-0.5">Illustrative Demo Data</div>
              </div>
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1,240</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Tracked Projects</div>
                <div className="text-[10px] text-teal-400 font-mono mt-0.5">Fictional Directory</div>
              </div>
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">86</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Flagged for Review</div>
                <div className="text-[10px] text-amber-300 font-mono mt-0.5">Human Oversight Queue</div>
              </div>
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">312</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Citizen Complaints</div>
                <div className="text-[10px] text-teal-400 font-mono mt-0.5">Grievance Resolutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: The Problem */}
      <section className="py-20 border-b border-slate-800 relative bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">The Systemic Challenge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Public Rupee Traceability Breaks Down
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Traditional public administration creates isolated paper silos. Money is authorized in one department, invoiced in another, inspected locally, and citizen feedback is addressed in isolation—leaving critical accountability gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">01</div>
              <h3 className="text-base font-bold text-white">Inflated Bills & Disconnected Records</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Claims are submitted without automated cross-checks against approved schedules of rates (SoR), previous market tenders, or tax return records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">02</div>
              <h3 className="text-base font-bold text-white">Phantom Delivery & Incomplete Works</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Completion certificates are issued without verified physical evidence or geo-tagged measurement sheets (e.g., 20 fans billed, only 16 actually mounted).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">03</div>
              <h3 className="text-base font-bold text-white">Diffused Responsibility & Unresolved Complaints</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When problems arise, it is unclear which designated role held financial authorization versus inspection duty. Citizen grievances vanish into bureaucratic limbo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: The Four Accountability Trails */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-2">Architectural Framework</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Four Interconnected Accountability Trails
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              CivicLens AI synthesizes four distinct operational records into an integrated accountability fabric.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1. Money Trail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects approved budget allocations, contract awards, contractor invoices, treasury debit vouchers, and verified recipient bank releases.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">2. Responsibility Trail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maps documented roles: approving officer, implementing engineer, quality inspection officer, and treasury disbursement signatory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">3. Delivery Trail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verifies work on the ground against contract specifications using geo-tagged site photographs, measurement books, and material tests.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquareWarning className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">4. Public Feedback Trail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowers local citizens and parent-teacher associations to submit geotagged feedback, track resolution status, and trigger audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: How It Works (7 Steps) */}
      <section id="how-it-works" className="py-20 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-2">Audit Lifecycle</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How The Platform Operates in 7 Disciplined Steps
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              An evidence-based loop from raw financial records to authorized human resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Connect Authorised Records', desc: 'Ingests treasury payment schedules, e-procurement tenders, vendor tax filings, and inspection logs.' },
              { num: '02', title: 'Validate Information Integrity', desc: 'Detects structural flaws, duplicate invoice numbers, missing mandatory fields, and invalid dates.' },
              { num: '03', title: 'Compare Against Benchmarks', desc: 'Matches billed rates with Schedule of Rates (SoR), GeM market medians, and regional indices.' },
              { num: '04', title: 'Verify Physical Delivery', desc: 'Validates on-site physical quantities against contracted items (e.g. 20 fans contracted vs 16 verified).' },
              { num: '05', title: 'Flag Unexplained Discrepancies', desc: 'Generates transparent 0–100 risk score alerts when variance exceeds demonstration tolerance.' },
              { num: '06', title: 'Refer to Human Reviewers', desc: 'Assigns certified state auditors to inspect evidence, demand documents, and conduct hearings.' },
              { num: '07', title: 'Track Corrective Action & Closure', desc: 'Logs tamper-evident reasoned outcomes, recovery orders, or documented justifications.' }
            ].map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
                <span className="font-mono text-sm font-bold text-teal-400 px-2 py-1 bg-teal-950/80 rounded border border-teal-800 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: AI Capabilities */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-2">Engine Modules</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI & Analytical Detection Modules
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Deterministic, explainable rule sets paired with natural language understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module A</div>
              <h4 className="text-base font-bold text-white">Cost Estimation & Variance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculates illustrative reference cost ranges using materials, labor, regional transport adjustments, and statutory tax benchmarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module B</div>
              <h4 className="text-base font-bold text-white">Invoice & Document Forensics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flags duplicate invoice identifiers, line-item arithmetic inconsistencies, missing GST numbers, and unexpected rate shifts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module C</div>
              <h4 className="text-base font-bold text-white">Expenditure Anomaly Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detects rapid contract amendments, split purchases under statutory bidding thresholds, and unrecorded payment variances.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module D</div>
              <h4 className="text-base font-bold text-white">Delivery Reconciliation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Performs cross-reconciliation between billed bills of quantities (BoQ) and physical counts submitted by on-site field inspectors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module E</div>
              <h4 className="text-base font-bold text-white">Relationship & Collusion Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maps repetitive pairings between awarding authorities and winning vendors across projects without prejudging lawful commerce.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wide">Module F</div>
              <h4 className="text-base font-bold text-white">Citizen Grievance Clustering</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Groups citizen reports around specific project IDs, categorizing complaints to highlight systemic local infrastructure failures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section E: Trust, Fairness & Due Process */}
      <section className="py-20 border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built on Constitutional Due Process & Explainable Oversight
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
            CivicLens AI never acts as a black-box accuser or digital judge. An anomaly flag is a request for documentary review, not an indictment. Officers and vendors are granted fair opportunity to present site orders, test certificates, and tax filings.
          </p>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Strict privacy safeguards prevent the public release of unverified allegations or private banking credentials.</span>
          </div>
        </div>
      </section>

      {/* Section F: Closing Statement & Final CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            "Public money should never become invisible after it is allocated."
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Experience the complete prototype with real interactive journeys: investigate the school overbilling discrepancy, reconcile digital payments, and track citizen complaints.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnterDemo}
              className="px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 flex items-center gap-2 group transition-all"
            >
              <span>Launch National Overview Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleOpenSchoolCase}
              className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition-all"
            >
              Examine School Case JD-UP-2026-001
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
