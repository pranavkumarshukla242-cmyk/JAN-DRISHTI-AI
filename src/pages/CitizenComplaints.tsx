import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Complaint } from '../types';
import { CITIZEN_ISSUE_SECTORS, CitizenIssueSector } from '../data/indianGeoAndLanguages';
import {
  MessageSquareWarning,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  Filter,
  School,
  Lock,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  FileText,
  Camera,
  Upload,
  AlertTriangle,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { NationalEmblem } from '../components/common/NationalEmblem';
import { NationalFlag } from '../components/common/NationalFlag';

export const CitizenComplaints: React.FC = () => {
  const {
    complaints,
    projects,
    submitComplaint,
    setSelectedProjectId,
    setActivePage,
    exportToCsv,
    allStates,
    selectedState,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'submit' | 'track' | 'browse'>('submit');

  // Submit form state
  const [selectedStateName, setSelectedStateName] = useState('Uttar Pradesh');
  const [selectedDistrictName, setSelectedDistrictName] = useState('Lucknow');
  const [selectedSectorId, setSelectedSectorId] = useState('education');
  const [selectedTemplateIssue, setSelectedTemplateIssue] = useState('');
  
  const [isUncataloguedWork, setIsUncataloguedWork] = useState(false);
  const [selectedLinkedProject, setSelectedLinkedProject] = useState('JD-UP-2026-001');

  const [formData, setFormData] = useState({
    title: 'Missing 4 ceiling fans and uninstalled electrical cabling in school rooms',
    category: 'Suspected overbilling' as Complaint['category'],
    locality: 'Chinhat Block, Composite Vidyalaya Site',
    description: 'Physical inspection on ground showed only 16 ceiling fans installed in 4 classrooms, while contractor billed for 20 fans. Also, dining counter lacks sanctioned stainless grade certification.',
    observationDate: new Date().toISOString().slice(0, 10),
    contactType: 'Confidential Email' as Complaint['complainantContactType'],
    hasEvidenceAttachment: true,
    evidenceNote: 'Attached site photo of empty ceiling hook in Room 4A and SMC receipt',
    consentAccepted: true
  });

  const [submittedComplaintId, setSubmittedComplaintId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Tracking search state
  const [trackQueryId, setTrackQueryId] = useState('JD-CMP-2026-081');
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(complaints[0]);

  // Browse filters
  const [browseState, setBrowseState] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [browseSearch, setBrowseSearch] = useState('');

  // Selected State object for dynamic districts
  const currentStateObj = allStates.find(s => s.name === selectedStateName) || allStates[0];

  const handleStateSelectChange = (stName: string) => {
    setSelectedStateName(stName);
    const stateObj = allStates.find(s => s.name === stName);
    if (stateObj && stateObj.districts.length > 0) {
      setSelectedDistrictName(stateObj.districts[0]);
    }
  };

  const handleSectorSelect = (sector: CitizenIssueSector) => {
    setSelectedSectorId(sector.id);
    if (sector.commonIssues.length > 0) {
      setSelectedTemplateIssue(sector.commonIssues[0]);
      setFormData(prev => ({
        ...prev,
        title: sector.commonIssues[0]
      }));
    }
  };

  const handleTemplateClick = (issue: string) => {
    setSelectedTemplateIssue(issue);
    setFormData(prev => ({
      ...prev,
      title: issue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.consentAccepted) return;

    const chosenProject = projects.find(p => p.id === selectedLinkedProject);
    const projectName = isUncataloguedWork
      ? `Local Public Work (${formData.locality}, ${selectedDistrictName})`
      : chosenProject ? `${chosenProject.name}` : `Public Infrastructure Work (${selectedDistrictName})`;

    const generatedId = submitComplaint({
      projectId: isUncataloguedWork ? 'LOCAL-INQUIRY-2026' : selectedLinkedProject,
      projectName: `${projectName} • ${selectedDistrictName}, ${selectedStateName}`,
      state: selectedStateName,
      district: selectedDistrictName,
      category: formData.category,
      title: formData.title,
      description: `${formData.description}\n[Locality: ${formData.locality}]\n[Evidence note: ${formData.hasEvidenceAttachment ? formData.evidenceNote : 'No attachments'}]`,
      observationDate: formData.observationDate,
      assignedAuthorityRole: chosenProject?.approvingAuthorityRole || 'District Vigilance & Grievance Officer',
      complainantContactType: formData.contactType
    });

    setSubmittedComplaintId(generatedId);
    setTrackQueryId(generatedId);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQueryId.trim()) return;
    const found = complaints.find(c => c.id.toLowerCase() === trackQueryId.trim().toLowerCase());
    setTrackedComplaint(found || null);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredComplaints = complaints.filter(c => {
    if (browseState !== 'All' && c.state !== browseState) return false;
    if (filterCategory !== 'All' && c.category !== filterCategory) return false;
    if (filterStatus !== 'All' && c.status !== filterStatus) return false;
    if (browseSearch) {
      const q = browseSearch.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.projectName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Glassmorphism with National Government Identity */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <NationalEmblem size="md" className="hidden sm:flex w-12 h-12 shadow-md" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 text-xs font-semibold border border-teal-500/30">
                  <MessageSquareWarning className="w-3.5 h-3.5 text-teal-600" />
                  <span>National Citizen Vigilance & Grievance Portal</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-teal-700">All 36 States & UTs</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 text-[11px] font-bold border border-amber-500/20">
                  <NationalFlag size="xs" withBorder={false} withShadow={false} />
                  <span>भारत सरकार / Govt. of India</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>नागरिक शिकायत एवं लोक जवाबदेही मंच | Public Accountability Platform</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                File verified ground-level complaints for any government project or local public work across India. Select your respected sector (Schools, Roads, Water, Health, PDS, etc.), state and district. Every grievance receives a secure, tamper-evident tracking token.
              </p>
            </div>
          </div>

          {/* Tab Navigation Glass Pills */}
          <div className="flex bg-slate-900/10 backdrop-blur-md p-1.5 rounded-2xl gap-1 text-xs font-bold border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'submit'
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/40'
              }`}
            >
              Log Respected Issue
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'track'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/40'
              }`}
            >
              Track Grievance
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/40'
              }`}
            >
              Browse Public Ledger
            </button>
          </div>
        </div>
      </div>

      {/* Due Process & Whistleblower Protection Banner */}
      <div className="glass-panel-subtle rounded-2xl p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-3 border border-white/60">
        <Lock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 font-bold block mb-0.5">Whistleblower Protection & Non-Accusatory Rule:</strong>
          "Submitting a complaint does not establish that an allegation is true. Complaints are subject to verification and lawful review."
          Complainant identities are strictly shielded; personal email, phone numbers, or residential addresses are never displayed on the public dashboard.
        </div>
      </div>

      {/* TAB 1: SUBMIT COMPLAINT FORM FOR RESPECTED ISSUES */}
      {activeTab === 'submit' && (
        <div className="space-y-6">
          {submittedComplaintId ? (
            <div className="glass-panel rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Grievance Registered Successfully</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your report has been ingested into the national accountability ledger and routed to the designated <strong>{selectedDistrictName} District Vigilance Officer</strong>.
              </p>
              
              <div className="p-4 glass-panel-subtle rounded-2xl font-mono text-lg font-extrabold text-slate-900 flex items-center justify-between border border-teal-500/30">
                <span className="text-teal-900">{submittedComplaintId}</span>
                <button
                  onClick={() => handleCopyId(submittedComplaintId)}
                  className="p-2 rounded-xl hover:bg-teal-50 text-teal-700 flex items-center gap-1 text-xs font-semibold"
                  title="Copy Token ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl text-left text-xs text-slate-600 space-y-1">
                <div><strong>State:</strong> {selectedStateName} • <strong>District:</strong> {selectedDistrictName}</div>
                <div><strong>Category:</strong> {formData.category}</div>
                <div><strong>Status:</strong> Submitted (Assigned for initial documentary verification)</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSubmittedComplaintId(null);
                    setActiveTab('track');
                  }}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Status In Real Time</span>
                </button>
                <button
                  onClick={() => {
                    setSubmittedComplaintId(null);
                    setActiveTab('browse');
                  }}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Browse All Public Issues
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sector Category Picker (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="glass-panel rounded-2xl p-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Step 1: Choose Your Respected Sector
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Select the domain of public work you wish to report:
                  </p>

                  <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                    {CITIZEN_ISSUE_SECTORS.map(sec => {
                      const isSelected = selectedSectorId === sec.id;
                      return (
                        <div
                          key={sec.id}
                          onClick={() => handleSectorSelect(sec)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-teal-900 text-white border-teal-400 shadow-md ring-2 ring-teal-400/20'
                              : 'glass-panel-subtle text-slate-800 hover:bg-white/90 border-slate-200/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs leading-snug">{sec.name}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />}
                          </div>
                          <p className={`text-[10px] line-clamp-2 leading-relaxed ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                            {sec.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Complaint Form (8 cols) */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Step 2: File Factual Observation
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter details for your location across any Indian state or district:
                    </p>
                  </div>

                  {/* Common Template Quick-Fill Pills */}
                  {selectedSectorId && (
                    <div className="p-3.5 glass-panel-subtle rounded-2xl border border-teal-500/20 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                        Quick Templates for Selected Sector (Click to auto-populate):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {CITIZEN_ISSUE_SECTORS.find(s => s.id === selectedSectorId)?.commonIssues.map((tmpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleTemplateClick(tmpl)}
                            className={`text-[11px] px-2.5 py-1 rounded-xl transition-all text-left ${
                              selectedTemplateIssue === tmpl
                                ? 'bg-teal-700 text-white font-bold shadow-sm'
                                : 'bg-white/80 text-slate-700 hover:bg-teal-50 border border-slate-200/60'
                            }`}
                          >
                            {tmpl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Geographic Location: All 36 States & Districts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>State / Union Territory (All 36 Covered):</span>
                      </label>
                      <select
                        value={selectedStateName}
                        onChange={e => handleStateSelectChange(e.target.value)}
                        className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                      >
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
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-slate-800 block">
                        District (Populated for {selectedStateName}):
                      </label>
                      <select
                        value={selectedDistrictName}
                        onChange={e => setSelectedDistrictName(e.target.value)}
                        className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                      >
                        {currentStateObj.districts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Locality & Landmark */}
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-slate-800 block">
                      Specific Locality / Block / Gram Panchayat / Ward / School Landmark:
                    </label>
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={e => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. Ward 14, Chinhat Block, Primary School Campus or NH-48 Km Stone 42"
                      className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Project Linking or Local Inquiry */}
                  <div className="p-3.5 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">Project Registry Link:</span>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={isUncataloguedWork}
                          onChange={e => setIsUncataloguedWork(e.target.checked)}
                          className="accent-teal-600 rounded"
                        />
                        <span>Uncatalogued Local Public Work</span>
                      </label>
                    </div>

                    {!isUncataloguedWork && (
                      <select
                        value={selectedLinkedProject}
                        onChange={e => setSelectedLinkedProject(e.target.value)}
                        className="w-full p-2 glass-input rounded-xl text-xs text-slate-800 cursor-pointer"
                      >
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.id} — {p.name} ({p.district}, {p.state})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Issue Category & Observation Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-slate-800 block">Issue Category:</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="Suspected overbilling">Suspected overbilling</option>
                        <option value="Incomplete work">Incomplete work</option>
                        <option value="Poor quality">Poor quality</option>
                        <option value="Missing supplies">Missing supplies</option>
                        <option value="Delayed project">Delayed project</option>
                        <option value="Incorrect project status">Incorrect project status</option>
                        <option value="Suspected duplicate billing">Suspected duplicate billing</option>
                        <option value="Other public-service issue">Other public-service issue</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-slate-800 block">Date of Observation:</label>
                      <input
                        type="date"
                        value={formData.observationDate}
                        onChange={e => setFormData({ ...formData, observationDate: e.target.value })}
                        className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Complaint Title */}
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-slate-800 block">Observation Title / Grievance Summary:</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. 4 ceiling fans missing from classrooms despite full payment voucher"
                      className="w-full p-2.5 glass-input rounded-xl text-xs text-slate-800 font-semibold focus:outline-none"
                      required
                    />
                  </div>

                  {/* Factual Description */}
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-slate-800 block">Detailed Ground Description:</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you observed on site: missing items, broken materials, uninstalled machinery, or discrepancy with official notice boards..."
                      rows={3}
                      className="w-full p-3 glass-input rounded-xl text-xs text-slate-800 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Whistleblower Protection Mode */}
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-slate-800 block">Whistleblower Identity Mode:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { key: 'Anonymous Demo', title: '100% Anonymous Token', desc: 'No email or phone recorded' },
                        { key: 'Confidential Email', title: 'Confidential Email', desc: 'Encrypted status alerts only' },
                        { key: 'SMS Alerts', title: 'SMS Notice (Simulated)', desc: 'Mobile milestone alerts' }
                      ].map(mode => (
                        <div
                          key={mode.key}
                          onClick={() => setFormData({ ...formData, contactType: mode.key as any })}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                            formData.contactType === mode.key
                              ? 'bg-teal-50 border-teal-500 font-bold text-teal-900 shadow-sm'
                              : 'glass-panel-subtle text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block">{mode.title}</span>
                          <span className="text-[10px] text-slate-500 block font-normal">{mode.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Attachment Simulated Box */}
                  <div className="p-3.5 glass-panel-subtle rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-teal-600" />
                        <span>Supporting Visual / Documentary Evidence (Simulated Upload):</span>
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={formData.hasEvidenceAttachment}
                          onChange={e => setFormData({ ...formData, hasEvidenceAttachment: e.target.checked })}
                          className="accent-teal-600 rounded"
                        />
                        <span>Attach Evidence</span>
                      </label>
                    </div>

                    {formData.hasEvidenceAttachment && (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={formData.evidenceNote}
                          onChange={e => setFormData({ ...formData, evidenceNote: e.target.value })}
                          placeholder="Describe attachment: e.g. Geo-tagged photo of empty ceiling hook / School handover receipt copy"
                          className="w-full p-2 glass-input rounded-xl text-xs text-slate-800"
                        />
                        <div className="p-2 bg-teal-50/70 rounded-xl border border-teal-200/80 text-[11px] text-teal-900 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Simulated Attachment Ready: Metadata timestamped with current session.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Statutory Consent */}
                  <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent-box"
                      checked={formData.consentAccepted}
                      onChange={e => setFormData({ ...formData, consentAccepted: e.target.checked })}
                      className="mt-0.5 accent-teal-600 rounded cursor-pointer"
                      required
                    />
                    <label htmlFor="consent-box" className="text-[11px] text-slate-600 cursor-pointer leading-relaxed">
                      I confirm that these observations represent factual observations made in public interest. I understand that submitting a report initiates a formal review under applicable administrative accountability guidelines.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!formData.consentAccepted || !formData.title || !formData.description}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-teal-700/25 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Grievance to {selectedDistrictName} Vigilance Queue</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TRACK STATUS */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <form onSubmit={handleTrackSearch} className="glass-panel rounded-2xl p-4 flex items-center gap-3 shadow-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={trackQueryId}
              onChange={e => setTrackQueryId(e.target.value)}
              placeholder="Enter Complaint Token (e.g. JD-CMP-2026-081)..."
              className="flex-1 bg-transparent text-xs text-slate-900 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Search Ledger
            </button>
          </form>

          {trackedComplaint ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-sm">
                      {trackedComplaint.id}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {trackedComplaint.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{trackedComplaint.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono">
                    Location: {trackedComplaint.district}, {trackedComplaint.state} • {trackedComplaint.projectName}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-xs font-mono text-slate-400 block">Investigation Status</span>
                  <span className="font-mono text-sm font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 inline-block mt-0.5">
                    {trackedComplaint.status}
                  </span>
                </div>
              </div>

              <div className="p-4 glass-panel-subtle rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <strong className="text-slate-900 block uppercase tracking-wider text-[11px]">
                  Public Report Text:
                </strong>
                <p className="leading-relaxed whitespace-pre-line">{trackedComplaint.description}</p>
              </div>

              {/* Resolution Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Verification & Action Timeline
                </h4>
                <div className="space-y-3">
                  {trackedComplaint.publicUpdates.map((u, i) => (
                    <div key={i} className="p-3.5 glass-panel-subtle rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          <span className="font-bold text-slate-900">{u.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{u.note}</p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">
                        {u.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center glass-panel rounded-3xl text-slate-500 text-xs">
              No complaint found matching token "{trackQueryId}". Please check reference number.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BROWSE PUBLIC LEDGER */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center gap-3 text-xs shadow-md">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={browseSearch}
                onChange={e => setBrowseSearch(e.target.value)}
                placeholder="Search by ID, keyword, district, or project..."
                className="w-full pl-9 pr-3 py-1.5 glass-input rounded-xl text-slate-900 focus:outline-none"
              />
            </div>

            <select
              value={browseState}
              onChange={e => setBrowseState(e.target.value)}
              className="glass-input rounded-xl px-3 py-1.5 font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[200px]"
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

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="glass-input rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Suspected overbilling">Suspected overbilling</option>
              <option value="Incomplete work">Incomplete work</option>
              <option value="Poor quality">Poor quality</option>
              <option value="Delayed project">Delayed project</option>
              <option value="Missing supplies">Missing supplies</option>
            </select>

            <button
              onClick={() => exportToCsv('complaints')}
              className="ml-auto text-xs font-bold text-teal-700 hover:underline"
            >
              Export CSV
            </button>
          </div>

          <div className="space-y-3">
            {filteredComplaints.map(c => {
              const isSchool = c.projectId === 'JD-UP-2026-001';

              return (
                <div
                  key={c.id}
                  className={`glass-panel rounded-3xl p-5 transition-all shadow-sm ${
                    isSchool ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/30' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                        {c.id}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        {c.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      {c.district}, {c.state} • {c.submittedAt}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">{c.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-slate-500 font-mono text-[11px]">
                      Project: <strong className="text-slate-800">{c.projectName}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                        {c.status}
                      </span>
                      <button
                        onClick={() => {
                          setTrackedComplaint(c);
                          setActiveTab('track');
                        }}
                        className="text-xs font-bold text-teal-700 hover:underline"
                      >
                        Inspect Timeline →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
