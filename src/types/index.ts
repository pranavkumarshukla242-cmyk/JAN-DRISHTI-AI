export type UserRole =
  | 'citizen'
  | 'admin'
  | 'finance'
  | 'auditor'
  | 'investigator'
  | 'platform_admin';

export type NavigationPage =
  | 'landing'
  | 'overview'
  | 'projects'
  | 'project-detail'
  | 'money-trail'
  | 'ai-risk'
  | 'responsibility'
  | 'procurement'
  | 'delivery'
  | 'complaints'
  | 'audit'
  | 'reports'
  | 'data-sources'
  | 'settings'
  | 'not-found';

export interface ProjectComponent {
  name: string;
  description: string;
  amountClaimed: number;
  referenceCost: number;
  difference: number;
  materialsCost: number;
  labourCost: number;
  transportTaxCost: number;
  status: 'verified' | 'discrepancy' | 'pending';
}

export interface Project {
  id: string;
  name: string;
  state: string;
  district: string;
  locality: string;
  departmentId: string;
  scheme: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Under Review' | 'Completed' | 'Pending Audit' | 'Delivery Disputed';
  approvedBudget: number;
  contractValue: number;
  reportedExpenditure: number;
  recordedPayments: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
  illustrativeReferenceCost: number;
  potentialDiscrepancy: number;
  riskScore: number;
  evidenceStatus: 'Complete' | 'Partial' | 'Missing Documents' | 'Discrepancy Flagged';
  responsibleAgency: string;
  approvingAuthorityRole: string;
  implementingRole: string;
  inspectionRole: string;
  paymentAuthRole: string;
  complaintAuthorityRole: string;
  components?: ProjectComponent[];
  contractorName: string;
}

export interface Department {
  id: string;
  name: string;
  jurisdiction: string;
  parentOrganisation: string;
  budgetAllocated: number;
  budgetSpent: number;
  activeProjects: number;
}

export interface PersonOrRole {
  id: string;
  displayName: string;
  roleTitle: string;
  organisationId: string;
  departmentName: string;
  responsibilities: string[];
  accessRole: UserRole;
  isFictional: boolean;
}

export interface Supplier {
  id: string;
  fictionalName: string;
  registrationReference: string;
  category: string;
  district: string;
  state: string;
  verificationStatus: 'Verified GST' | 'Provisional' | 'Under Verification' | 'Flagged';
  contractsCount: number;
  totalAwarded: number;
}

export interface Contract {
  id: string;
  projectId: string;
  supplierId: string;
  supplierName: string;
  tenderId: string;
  contractValue: number;
  procurementMethod: string;
  scope: string;
  startDate: string;
  endDate: string;
  amendmentsCount: number;
  amendmentNotes: string[];
  status: 'Active' | 'Fulfilled' | 'Under Audit' | 'Terminated';
}

export interface Invoice {
  id: string;
  contractId: string;
  projectId: string;
  invoiceNumber: string;
  invoiceDate: string;
  vendorName: string;
  subtotal: number;
  taxes: number;
  total: number;
  verificationStatus: 'Matched' | 'Unreconciled' | 'Duplicate Alert' | 'Under Review';
  lineItems: {
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
  }[];
}

export interface Payment {
  id: string;
  projectId: string;
  contractId: string;
  invoiceId: string;
  reference: string;
  amount: number;
  date: string;
  recipientId: string;
  recipientName: string;
  payerAgency: string;
  status: 'Recorded' | 'Pending Reconciliation' | 'Documentation Missing' | 'Verified Against Source' | 'Under Review';
  paymentPurpose: string;
  sourceSystem: string;
  verificationStatus: 'Verified Record' | 'Discrepancy' | 'Pending';
}

export interface DeliveryRecord {
  id: string;
  projectId: string;
  itemOrWork: string;
  expectedQuantity: number;
  reportedQuantity: number;
  verifiedQuantity: number;
  unit: string;
  inspectionStatus: 'Verified' | 'Mismatch' | 'Pending Inspection' | 'Defective Work';
  inspectionDate: string;
  inspectorRole: string;
  evidenceIds: string[];
  notes: string;
}

export interface EvidenceItem {
  id: string;
  projectId: string;
  title: string;
  type: 'Contract' | 'Invoice' | 'Measurement Sheet' | 'Delivery Receipt' | 'Inspection Report' | 'Site Photo' | 'Citizen Submission';
  source: string;
  submittedAt: string;
  submittedByRole: string;
  verificationStatus: 'pending' | 'received' | 'verified' | 'disputed';
  description: string;
  fileReference?: string;
}

export interface Complaint {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  category: 'Incomplete work' | 'Poor quality' | 'Suspected overbilling' | 'Missing supplies' | 'Delayed project' | 'Incorrect project status' | 'Suspected duplicate billing' | 'Other public-service issue';
  title: string;
  description: string;
  observationDate: string;
  submittedAt: string;
  status: 'Submitted' | 'Acknowledged' | 'Under Initial Review' | 'Evidence Requested' | 'Assigned for Verification' | 'Under Investigation' | 'Action Recorded' | 'Resolved' | 'Closed with Explanation';
  assignedAuthorityRole: string;
  complainantContactType: 'Anonymous Demo' | 'Confidential Email' | 'SMS Alerts';
  publicUpdates: {
    date: string;
    status: string;
    note: string;
  }[];
}

export interface RiskFlag {
  id: string;
  projectId: string;
  projectName: string;
  category: 'Cost Estimation' | 'Invoice Analysis' | 'Anomaly Detection' | 'Delivery Verification' | 'Relationship Analysis' | 'Complaint Clustering' | 'Evidence Gap';
  severity: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  reason: string;
  calculation: string;
  supportingRecords: string[];
  missingEvidence: string[];
  recommendation: string;
  reviewStatus: 'Pending Review' | 'In Progress' | 'Documents Requested' | 'Inspection Scheduled' | 'Escalated' | 'Closed with Rationale';
  assignedReviewerRole: string;
}

export interface ReviewCase {
  id: string;
  riskFlagId: string;
  projectId: string;
  assignedReviewerRole: string;
  status: 'New' | 'Under Investigation' | 'Evidence Requested' | 'Inspection Scheduled' | 'Escalated' | 'Resolved' | 'Closed Unresolved';
  findings: string;
  notes: {
    id: string;
    authorRole: string;
    timestamp: string;
    note: string;
  }[];
  checklist: {
    id: string;
    item: string;
    status: 'pending' | 'received' | 'verified' | 'disputed';
    updatedAt: string;
  }[];
  closureReason?: string;
  closureTimestamp?: string;
}

export interface AuditEvent {
  id: string;
  entityType: 'Case' | 'Project' | 'Complaint' | 'Evidence' | 'Payment';
  entityId: string;
  eventType: string;
  timestamp: string;
  actorRole: string;
  previousState: string;
  newState: string;
  reason: string;
}

export interface DataSource {
  id: string;
  name: string;
  dataType: string;
  connectionMode: 'Simulated' | 'Imported Demo Data' | 'Not Connected';
  lastImportTime: string;
  recordCount: number;
  validationStatus: 'Verified Format' | 'Warning: Incomplete' | 'Healthy Sync';
  completeness: number;
  knownLimitations: string;
  responsibleDataSteward: string;
}
