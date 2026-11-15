import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  NavigationPage,
  Project,
  Department,
  Supplier,
  Contract,
  Invoice,
  Payment,
  DeliveryRecord,
  EvidenceItem,
  Complaint,
  RiskFlag,
  ReviewCase,
  AuditEvent,
  DataSource
} from '../types';
import {
  initialProjects,
  initialDepartments,
  initialSuppliers,
  initialContracts,
  initialInvoices,
  initialPayments,
  initialDeliveryRecords,
  initialEvidence,
  initialComplaints,
  initialRiskFlags,
  initialReviewCases,
  initialAuditEvents,
  initialDataSources,
  fictionalRoles
} from '../data/seedData';
import {
  UI_TRANSLATIONS,
  INDIAN_LANGUAGES,
  ALL_INDIAN_STATES_AND_UTS,
  IndianRegion,
  LanguageOption
} from '../data/indianGeoAndLanguages';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (deptId: string) => void;
  financialYear: string;
  setFinancialYear: (fy: string) => void;
  toleranceThreshold: number;
  setToleranceThreshold: (val: number) => void;

  // Language & Localization
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  allStates: IndianRegion[];
  availableLanguages: LanguageOption[];

  // Data
  projects: Project[];
  departments: Department[];
  suppliers: Supplier[];
  contracts: Contract[];
  invoices: Invoice[];
  payments: Payment[];
  deliveryRecords: DeliveryRecord[];
  evidence: EvidenceItem[];
  complaints: Complaint[];
  riskFlags: RiskFlag[];
  reviewCases: ReviewCase[];
  auditEvents: AuditEvent[];
  dataSources: DataSource[];

  // Mutations
  updateCaseChecklist: (caseId: string, itemId: string, status: 'pending' | 'received' | 'verified' | 'disputed') => void;
  assignCaseReviewer: (caseId: string, reviewerRole: string) => void;
  addCaseNote: (caseId: string, note: string) => void;
  updateCaseStatus: (caseId: string, status: ReviewCase['status'], closureReason?: string) => void;
  submitComplaint: (data: Omit<Complaint, 'id' | 'submittedAt' | 'status' | 'publicUpdates'>) => string;
  updateComplaintStatus: (complaintId: string, status: Complaint['status'], note: string) => void;
  requestMissingDocuments: (caseId: string, documentName: string) => void;
  scheduleIndependentInspection: (caseId: string, inspectionDetails: string) => void;
  resetDemoData: () => void;
  
  // UI helpers
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  exportToCsv: (type: 'projects' | 'payments' | 'complaints' | 'discrepancies') => void;
}

const STORAGE_KEY_PREFIX = 'civiclens_';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('auditor');
  const [activePage, setActivePage] = useState<NavigationPage>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('JD-UP-2026-001');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('RC-2026-001');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [toleranceThreshold, setToleranceThreshold] = useState<number>(5);

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('civiclens_language') || localStorage.getItem('jan_drishti_language');
      return saved ? JSON.parse(saved) : 'en';
    } catch {
      return 'en';
    }
  });

  const t = (key: string, fallback?: string): string => {
    return UI_TRANSLATIONS[currentLanguage]?.[key] || UI_TRANSLATIONS['en']?.[key] || fallback || key;
  };

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // State with LocalStorage Persistence
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [projects, setProjects] = useState<Project[]>(() => loadState('projects', initialProjects));
  const [departments] = useState<Department[]>(initialDepartments);
  const [suppliers] = useState<Supplier[]>(initialSuppliers);
  const [contracts] = useState<Contract[]>(initialContracts);
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [payments, setPayments] = useState<Payment[]>(() => loadState('payments', initialPayments));
  const [deliveryRecords, setDeliveryRecords] = useState<DeliveryRecord[]>(() => loadState('deliveryRecords', initialDeliveryRecords));
  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => loadState('evidence', initialEvidence));
  const [complaints, setComplaints] = useState<Complaint[]>(() => loadState('complaints', initialComplaints));
  const [riskFlags, setRiskFlags] = useState<RiskFlag[]>(() => loadState('riskFlags', initialRiskFlags));
  const [reviewCases, setReviewCases] = useState<ReviewCase[]>(() => loadState('reviewCases', initialReviewCases));
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => loadState('auditEvents', initialAuditEvents));
  const [dataSources] = useState<DataSource[]>(initialDataSources);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'projects', JSON.stringify(projects));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'payments', JSON.stringify(payments));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'deliveryRecords', JSON.stringify(deliveryRecords));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'evidence', JSON.stringify(evidence));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'complaints', JSON.stringify(complaints));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'riskFlags', JSON.stringify(riskFlags));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'reviewCases', JSON.stringify(reviewCases));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'auditEvents', JSON.stringify(auditEvents));
    } catch (e) {
      console.warn('Failed to sync to localStorage', e);
    }
  }, [projects, payments, deliveryRecords, evidence, complaints, riskFlags, reviewCases, auditEvents]);

  // Record an audit event
  const addAuditEventInternal = (
    entityType: AuditEvent['entityType'],
    entityId: string,
    eventType: string,
    previousState: string,
    newState: string,
    reason: string
  ) => {
    const activeRoleObj = fictionalRoles.find(r => r.accessRole === currentUserRole);
    const newEvent: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`,
      entityType,
      entityId,
      eventType,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorRole: activeRoleObj?.roleTitle || currentUserRole,
      previousState,
      newState,
      reason
    };
    setAuditEvents(prev => [newEvent, ...prev]);
  };

  // Case checklist update
  const updateCaseChecklist = (
    caseId: string,
    itemId: string,
    status: 'pending' | 'received' | 'verified' | 'disputed'
  ) => {
    let itemTitle = '';
    let oldStatus = 'pending';

    setReviewCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const updatedList = c.checklist.map(item => {
          if (item.id === itemId) {
            itemTitle = item.item;
            oldStatus = item.status;
            return {
              ...item,
              status,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
            };
          }
          return item;
        });
        return { ...c, checklist: updatedList };
      })
    );

    addAuditEventInternal(
      'Case',
      caseId,
      'Checklist Item Updated',
      `${itemTitle}: ${oldStatus}`,
      `${itemTitle}: ${status}`,
      `Reviewer updated evidence verification mark to ${status}`
    );

    showToast('info', 'Checklist Updated', `Item marked as ${status.toUpperCase()}`);
  };

  // Assign Reviewer
  const assignCaseReviewer = (caseId: string, reviewerRole: string) => {
    let oldRole = '';
    setReviewCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          oldRole = c.assignedReviewerRole;
          return { ...c, assignedReviewerRole: reviewerRole };
        }
        return c;
      })
    );

    setRiskFlags(prev =>
      prev.map(rf => {
        const matchingCase = reviewCases.find(c => c.id === caseId);
        if (matchingCase && matchingCase.riskFlagId === rf.id) {
          return { ...rf, assignedReviewerRole: reviewerRole };
        }
        return rf;
      })
    );

    addAuditEventInternal(
      'Case',
      caseId,
      'Reviewer Assigned',
      oldRole || 'Unassigned',
      reviewerRole,
      `Case assigned to designated role: ${reviewerRole}`
    );

    showToast('success', 'Reviewer Assigned', `Case assigned to ${reviewerRole}`);
  };

  // Add Case Note
  const addCaseNote = (caseId: string, noteText: string) => {
    const activeRoleObj = fictionalRoles.find(r => r.accessRole === currentUserRole);
    const authorRole = activeRoleObj?.roleTitle || currentUserRole;

    const newNote = {
      id: `NOT-${Date.now().toString().slice(-4)}`,
      authorRole,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      note: noteText
    };

    setReviewCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          return { ...c, notes: [newNote, ...c.notes] };
        }
        return c;
      })
    );

    addAuditEventInternal(
      'Case',
      caseId,
      'Review Note Appended',
      'Previous Log',
      'Note Added',
      noteText.slice(0, 80) + (noteText.length > 80 ? '...' : '')
    );

    showToast('success', 'Note Recorded', 'Audit note successfully attached to case dossier');
  };

  // Update Case Status
  const updateCaseStatus = (caseId: string, status: ReviewCase['status'], closureReason?: string) => {
    let oldStatus: ReviewCase['status'] = 'New';

    setReviewCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          oldStatus = c.status;
          return {
            ...c,
            status,
            closureReason: closureReason || c.closureReason,
            closureTimestamp: closureReason ? new Date().toISOString().replace('T', ' ').substring(0, 19) : c.closureTimestamp
          };
        }
        return c;
      })
    );

    // Update corresponding risk flag review status
    setRiskFlags(prev =>
      prev.map(rf => {
        const found = reviewCases.find(c => c.id === caseId);
        if (found && found.riskFlagId === rf.id) {
          const mappedReviewStatus: RiskFlag['reviewStatus'] =
            status === 'Resolved' || status === 'Closed Unresolved'
              ? 'Closed with Rationale'
              : status === 'Escalated'
              ? 'Escalated'
              : status === 'Inspection Scheduled'
              ? 'Inspection Scheduled'
              : status === 'Evidence Requested'
              ? 'Documents Requested'
              : 'In Progress';
          return { ...rf, reviewStatus: mappedReviewStatus };
        }
        return rf;
      })
    );

    addAuditEventInternal(
      'Case',
      caseId,
      'Case Status Transition',
      oldStatus,
      status,
      closureReason || `Status shifted to ${status} following official review`
    );

    showToast('success', 'Case Status Updated', `Case transitioned from ${oldStatus} to ${status}`);
  };

  // Request Missing Documents
  const requestMissingDocuments = (caseId: string, documentName: string) => {
    updateCaseStatus(caseId, 'Evidence Requested', `Formally demanded submission of: ${documentName}`);
    addCaseNote(caseId, `Official Notice Issued: Contractor and Implementing Officer requested to produce: ${documentName} within 7 working days.`);
    showToast('info', 'Document Request Dispatched', `Demand notice for "${documentName}" dispatched to agency`);
  };

  // Schedule Independent Inspection
  const scheduleIndependentInspection = (caseId: string, inspectionDetails: string) => {
    updateCaseStatus(caseId, 'Inspection Scheduled', `Scheduled independent technical audit: ${inspectionDetails}`);
    addCaseNote(caseId, `Inspection Notice: Third-party technical team deputed for physical verification. Details: ${inspectionDetails}`);
    showToast('success', 'Inspection Scheduled', 'Independent quality & quantity verification scheduled');
  };

  // Submit Complaint
  const submitComplaint = (data: Omit<Complaint, 'id' | 'submittedAt' | 'status' | 'publicUpdates'>): string => {
    const randomNum = Math.floor(Math.random() * 899 + 100);
    const newId = `JD-CMP-2026-${randomNum}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newComplaint: Complaint = {
      ...data,
      id: newId,
      submittedAt: timestamp,
      status: 'Submitted',
      publicUpdates: [
        {
          date: timestamp,
          status: 'Submitted',
          note: 'Public grievance logged in system. Anonymised verification token issued.'
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);

    addAuditEventInternal(
      'Complaint',
      newId,
      'Citizen Grievance Ingested',
      'None',
      'Submitted',
      `Citizen registered complaint under category: ${data.category} for project ${data.projectName}`
    );

    showToast('success', 'Complaint Logged Successfully', `Reference ID: ${newId}. Keep this ID for tracking.`);
    return newId;
  };

  // Update Complaint Status
  const updateComplaintStatus = (complaintId: string, status: Complaint['status'], note: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    let oldStatus: Complaint['status'] = 'Submitted';

    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          oldStatus = c.status;
          return {
            ...c,
            status,
            publicUpdates: [
              ...c.publicUpdates,
              {
                date: timestamp,
                status,
                note
              }
            ]
          };
        }
        return c;
      })
    );

    addAuditEventInternal(
      'Complaint',
      complaintId,
      'Complaint Status Updated',
      oldStatus,
      status,
      note
    );

    showToast('info', 'Complaint Status Updated', `Status changed to ${status}`);
  };

  // Reset demo data
  const resetDemoData = () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.error(e);
    }

    setProjects(initialProjects);
    setPayments(initialPayments);
    setDeliveryRecords(initialDeliveryRecords);
    setEvidence(initialEvidence);
    setComplaints(initialComplaints);
    setRiskFlags(initialRiskFlags);
    setReviewCases(initialReviewCases);
    setAuditEvents(initialAuditEvents);
    setSelectedProjectId('JD-UP-2026-001');
    setSelectedCaseId('RC-2026-001');
    setToleranceThreshold(5);

    showToast('info', 'Demonstration Reset', 'All fictional records and review workflows restored to initial state');
  };

  // CSV Export utility
  const exportToCsv = (type: 'projects' | 'payments' | 'complaints' | 'discrepancies') => {
    let csvContent = '';
    let fileName = `civiclens_${type}_${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === 'projects') {
      const headers = ['Project ID', 'Project Name', 'State', 'District', 'Department', 'Approved Budget (INR)', 'Reported Expenditure (INR)', 'Recorded Payments (INR)', 'Reference Cost (INR)', 'Discrepancy (INR)', 'Risk Score', 'Status'];
      const rows = projects.map(p => [
        `"${p.id}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.state}"`,
        `"${p.district}"`,
        `"${p.departmentId}"`,
        p.approvedBudget,
        p.reportedExpenditure,
        p.recordedPayments,
        p.illustrativeReferenceCost,
        p.potentialDiscrepancy,
        p.riskScore,
        `"${p.status}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (type === 'payments') {
      const headers = ['Payment ID', 'Project ID', 'Invoice ID', 'Reference', 'Amount (INR)', 'Date', 'Recipient', 'Payer Agency', 'Status', 'Verification'];
      const rows = payments.map(p => [
        `"${p.id}"`,
        `"${p.projectId}"`,
        `"${p.invoiceId}"`,
        `"${p.reference}"`,
        p.amount,
        `"${p.date}"`,
        `"${p.recipientName.replace(/"/g, '""')}"`,
        `"${p.payerAgency.replace(/"/g, '""')}"`,
        `"${p.status}"`,
        `"${p.verificationStatus}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (type === 'complaints') {
      const headers = ['Complaint ID', 'Project ID', 'State', 'District', 'Category', 'Title', 'Date Submitted', 'Status', 'Assigned Authority'];
      const rows = complaints.map(c => [
        `"${c.id}"`,
        `"${c.projectId}"`,
        `"${c.state}"`,
        `"${c.district}"`,
        `"${c.category}"`,
        `"${c.title.replace(/"/g, '""')}"`,
        `"${c.submittedAt}"`,
        `"${c.status}"`,
        `"${c.assignedAuthorityRole}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (type === 'discrepancies') {
      const headers = ['Case ID', 'Project ID', 'Project Name', 'Category', 'Claimed Amount (INR)', 'Reference Benchmark (INR)', 'Difference (INR)', 'Risk Score', 'Review Status'];
      const rows = riskFlags.map(rf => {
        const prj = projects.find(p => p.id === rf.projectId);
        return [
          `"${rf.id}"`,
          `"${rf.projectId}"`,
          `"${rf.projectName.replace(/"/g, '""')}"`,
          `"${rf.category}"`,
          prj?.reportedExpenditure || 0,
          prj?.illustrativeReferenceCost || 0,
          prj?.potentialDiscrepancy || 0,
          rf.riskScore,
          `"${rf.reviewStatus}"`
        ];
      });
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'CSV Report Exported', `Generated ${fileName} with public demonstration data`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        activePage,
        setActivePage,
        selectedProjectId,
        setSelectedProjectId,
        selectedCaseId,
        setSelectedCaseId,
        searchQuery,
        setSearchQuery,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        selectedDepartment,
        setSelectedDepartment,
        financialYear,
        setFinancialYear,
        toleranceThreshold,
        setToleranceThreshold,
        currentLanguage,
        setCurrentLanguage,
        t,
        allStates: ALL_INDIAN_STATES_AND_UTS,
        availableLanguages: INDIAN_LANGUAGES,
        projects,
        departments,
        suppliers,
        contracts,
        invoices,
        payments,
        deliveryRecords,
        evidence,
        complaints,
        riskFlags,
        reviewCases,
        auditEvents,
        dataSources,
        updateCaseChecklist,
        assignCaseReviewer,
        addCaseNote,
        updateCaseStatus,
        submitComplaint,
        updateComplaintStatus,
        requestMissingDocuments,
        scheduleIndependentInspection,
        resetDemoData,
        toasts,
        showToast,
        removeToast,
        exportToCsv
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
