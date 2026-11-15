import {
  Project,
  Department,
  PersonOrRole,
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

export const initialDepartments: Department[] = [
  {
    id: 'dept-edu',
    name: 'Department of School Education & Literacy',
    jurisdiction: 'State & District Primary Education',
    parentOrganisation: 'Ministry of Education (State Node)',
    budgetAllocated: 52000000,
    budgetSpent: 44200000,
    activeProjects: 48
  },
  {
    id: 'dept-pwd',
    name: 'Public Works Department (PWD)',
    jurisdiction: 'State Highways, Rural Roads & Buildings',
    parentOrganisation: 'Ministry of Road Transport & Public Works',
    budgetAllocated: 125000000,
    budgetSpent: 98000000,
    activeProjects: 82
  },
  {
    id: 'dept-health',
    name: 'Department of Health & Family Welfare',
    jurisdiction: 'District Hospitals & Primary Health Centres (PHCs)',
    parentOrganisation: 'Ministry of Health',
    budgetAllocated: 84000000,
    budgetSpent: 62000000,
    activeProjects: 36
  },
  {
    id: 'dept-jal',
    name: 'Jal Nigam & Rural Water Sanitation',
    jurisdiction: 'Rural Water Supply & Potable Pipelines',
    parentOrganisation: 'Ministry of Jal Shakti (State Node)',
    budgetAllocated: 95000000,
    budgetSpent: 79000000,
    activeProjects: 54
  },
  {
    id: 'dept-energy',
    name: 'Renewable Energy & Urban Infrastructure',
    jurisdiction: 'Municipal Streetlighting & Solar Grids',
    parentOrganisation: 'Ministry of Power & Renewable Energy',
    budgetAllocated: 38000000,
    budgetSpent: 28500000,
    activeProjects: 29
  }
];

export const initialProjects: Project[] = [
  {
    id: 'JD-UP-2026-001',
    name: 'Government School Infrastructure and Supplies Upgrade',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    locality: 'Chinhat Block, Fictional Composite Vidyalaya',
    departmentId: 'dept-edu',
    scheme: 'Samagra Shiksha Abhiyan (Demonstration Node)',
    objective: 'Construction of student dining canteen, playground apparatus, electrical fans, study furniture, and library curriculum books.',
    startDate: '2025-11-15',
    endDate: '2026-03-31',
    status: 'Under Review',
    approvedBudget: 900000,
    contractValue: 900000,
    reportedExpenditure: 900000,
    recordedPayments: 780000,
    estimatedCostLow: 750000,
    estimatedCostHigh: 810000,
    illustrativeReferenceCost: 780000,
    potentialDiscrepancy: 120000,
    riskScore: 78,
    evidenceStatus: 'Discrepancy Flagged',
    responsibleAgency: 'District Education Project Directorate, Lucknow',
    approvingAuthorityRole: 'Chief District Education Officer (CDEO)',
    implementingRole: 'Assistant Engineer (School Infrastructure)',
    inspectionRole: 'Junior Quality Inspector (Division 3)',
    paymentAuthRole: 'Divisional Accounts Officer (Treasury Node)',
    complaintAuthorityRole: 'State Public Grievance Cell (Education)',
    contractorName: 'Apex Shiksha Infra & Supplies Pvt Ltd (Fictional)',
    components: [
      {
        name: 'New Canteen Infrastructure',
        description: 'Brickwork dining shelter, stainless food counter, wash basins, and tiled floor area (320 sq.ft)',
        amountClaimed: 400000,
        referenceCost: 350000,
        difference: 50000,
        materialsCost: 240000,
        labourCost: 80000,
        transportTaxCost: 30000,
        status: 'discrepancy'
      },
      {
        name: 'Playground, Electrical Equipment, Fans, Chairs & Tables',
        description: '20 heavy-duty ceiling fans, 60 dual desks, swings/see-saw kit, LED fixtures, and wiring',
        amountClaimed: 400000,
        referenceCost: 350000,
        difference: 50000,
        materialsCost: 260000,
        labourCost: 55000,
        transportTaxCost: 35000,
        status: 'discrepancy'
      },
      {
        name: 'Books & Reference Library Set',
        description: 'NCERT aligned supplementary readers, science charts, encyclopaedias, and catalogued reference sets',
        amountClaimed: 100000,
        referenceCost: 80000,
        difference: 20000,
        materialsCost: 70000,
        labourCost: 4000,
        transportTaxCost: 6000,
        status: 'discrepancy'
      }
    ]
  },
  {
    id: 'JD-MH-2026-014',
    name: 'Rural Road Resurfacing & Drainage Package',
    state: 'Maharashtra',
    district: 'Pune',
    locality: 'Baramati Taluka, Rural Connectivity Segment 4B',
    departmentId: 'dept-pwd',
    scheme: 'Pradhan Mantri Gram Sadak Yojana (Demonstration Node)',
    objective: 'Bituminous surfacing of 4.8 km village feeder road, paired with side drain culverts.',
    startDate: '2025-09-01',
    endDate: '2026-04-15',
    status: 'In Progress',
    approvedBudget: 45000000,
    contractValue: 43800000,
    reportedExpenditure: 31200000,
    recordedPayments: 31200000,
    estimatedCostLow: 41500000,
    estimatedCostHigh: 44500000,
    illustrativeReferenceCost: 42800000,
    potentialDiscrepancy: 0,
    riskScore: 22,
    evidenceStatus: 'Complete',
    responsibleAgency: 'Executive Engineer Division, PWD Pune',
    approvingAuthorityRole: 'Superintending Engineer (PWD Western Circle)',
    implementingRole: 'Assistant Executive Engineer',
    inspectionRole: 'Third-Party Quality Assurance Consultant',
    paymentAuthRole: 'Senior Divisional Accounts Officer',
    complaintAuthorityRole: 'District Collectorate Grievance Portal',
    contractorName: 'Sahyadri Roadways & Infrastructure Ltd (Fictional)'
  },
  {
    id: 'JD-RJ-2026-089',
    name: 'Primary Health Centre Diagnostic Equipment Procurement',
    state: 'Rajasthan',
    district: 'Jaipur',
    locality: 'Chaksu Block Community Health Facility',
    departmentId: 'dept-health',
    scheme: 'National Health Mission (State Capital Equipment)',
    objective: 'Supply of biochemistry blood analyser, portable ultrasound machine, and ECG monitoring units.',
    startDate: '2025-10-10',
    endDate: '2026-02-28',
    status: 'Pending Audit',
    approvedBudget: 8500000,
    contractValue: 8420000,
    reportedExpenditure: 8420000,
    recordedPayments: 8420000,
    estimatedCostLow: 7400000,
    estimatedCostHigh: 7900000,
    illustrativeReferenceCost: 7650000,
    potentialDiscrepancy: 770000,
    riskScore: 64,
    evidenceStatus: 'Partial',
    responsibleAgency: 'Rajasthan Medical Services Corporation (Simulated)',
    approvingAuthorityRole: 'Managing Director, Medical Procurement',
    implementingRole: 'Biomedical Equipment Officer',
    inspectionRole: 'Chief Medical & Health Officer (CMHO)',
    paymentAuthRole: 'Financial Advisor & Joint Director',
    complaintAuthorityRole: 'Arogya Citizen Vigilance Cell',
    contractorName: 'Marwar Meditech Solutions (Fictional)'
  },
  {
    id: 'JD-BR-2026-042',
    name: 'Drinking Water Pipeline Installation & Overhead Tank',
    state: 'Bihar',
    district: 'Patna',
    locality: 'Danapur Rural Sector, Ward 12 Cluster',
    departmentId: 'dept-jal',
    scheme: 'Har Ghar Nal Se Jal (Demonstration Node)',
    objective: 'Laying 11.2 km ductile iron feeder pipes and 100,000 litre capacity overhead reservoir.',
    startDate: '2025-08-01',
    endDate: '2026-05-30',
    status: 'In Progress',
    approvedBudget: 21000000,
    contractValue: 20500000,
    reportedExpenditure: 14800000,
    recordedPayments: 14800000,
    estimatedCostLow: 19800000,
    estimatedCostHigh: 21200000,
    illustrativeReferenceCost: 20400000,
    potentialDiscrepancy: 0,
    riskScore: 18,
    evidenceStatus: 'Complete',
    responsibleAgency: 'Public Health Engineering Department (PHED Patna)',
    approvingAuthorityRole: 'Chief Engineer (Rural Water)',
    implementingRole: 'Executive Engineer (Danapur Division)',
    inspectionRole: 'Assistant Quality Inspector',
    paymentAuthRole: 'Treasury Officer (Patna Rural)',
    complaintAuthorityRole: 'Jal Seva Citizen Line',
    contractorName: 'Ganga Hydrocon Utilities Pvt Ltd (Fictional)'
  },
  {
    id: 'JD-KA-2026-105',
    name: 'Public Smart Streetlight & Solar Grid Installation',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    locality: 'Doddaballapur Taluka Main Arterial Road',
    departmentId: 'dept-energy',
    scheme: 'Atal Jyoti Yojana (Demonstration Node)',
    objective: 'Erection of 320 smart LED solar street poles with centralised energy telemetry.',
    startDate: '2025-12-01',
    endDate: '2026-04-30',
    status: 'Delivery Disputed',
    approvedBudget: 6500000,
    contractValue: 6350000,
    reportedExpenditure: 4900000,
    recordedPayments: 4900000,
    estimatedCostLow: 5800000,
    estimatedCostHigh: 6200000,
    illustrativeReferenceCost: 6050000,
    potentialDiscrepancy: 300000,
    riskScore: 59,
    evidenceStatus: 'Missing Documents',
    responsibleAgency: 'Karnataka Renewable Energy Development Agency (Simulated)',
    approvingAuthorityRole: 'General Manager (Solar Projects)',
    implementingRole: 'Divisional Project Engineer',
    inspectionRole: 'Third-Party Electrical Inspector',
    paymentAuthRole: 'Accounts Officer (Urban Grids)',
    complaintAuthorityRole: 'BESCOM Janasnehi Portal',
    contractorName: 'Deccan Solartech Electrics (Fictional)'
  },
  {
    id: 'JD-UP-2026-031',
    name: 'District Hospital Medical Oxygen Manifold & Pipeline',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    locality: 'Pandeypur Divisional Hospital Complex',
    departmentId: 'dept-health',
    scheme: 'Emergency Health System Strengthening (State Node)',
    objective: 'Extension of centralised medical gas piping system to 80 emergency trauma beds.',
    startDate: '2025-07-15',
    endDate: '2025-12-20',
    status: 'Completed',
    approvedBudget: 14000000,
    contractValue: 13650000,
    reportedExpenditure: 13650000,
    recordedPayments: 13650000,
    estimatedCostLow: 13200000,
    estimatedCostHigh: 14100000,
    illustrativeReferenceCost: 13500000,
    potentialDiscrepancy: 0,
    riskScore: 12,
    evidenceStatus: 'Complete',
    responsibleAgency: 'Directorate of Medical Health Services, UP',
    approvingAuthorityRole: 'Director General (Health Services)',
    implementingRole: 'Chief Medical Superintendent (CMS)',
    inspectionRole: 'Technical Verification Board',
    paymentAuthRole: 'Chief Treasury Officer Varanasi',
    complaintAuthorityRole: 'Varanasi Integrated Grievance Portal',
    contractorName: 'Kashi Biomedical & Cryo Systems (Fictional)'
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    fictionalName: 'Apex Shiksha Infra & Supplies Pvt Ltd',
    registrationReference: '09AAACA1234F1Z5 (Fictional Demo)',
    category: 'Educational Infrastructure & Civil Works',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    verificationStatus: 'Under Verification',
    contractsCount: 3,
    totalAwarded: 2450000
  },
  {
    id: 'sup-002',
    fictionalName: 'Sahyadri Roadways & Infrastructure Ltd',
    registrationReference: '27AAACS5678B1Z2 (Fictional Demo)',
    category: 'Highways & PWD Works',
    district: 'Pune',
    state: 'Maharashtra',
    verificationStatus: 'Verified GST',
    contractsCount: 7,
    totalAwarded: 118000000
  },
  {
    id: 'sup-003',
    fictionalName: 'Marwar Meditech Solutions',
    registrationReference: '08AAACM9876C1Z9 (Fictional Demo)',
    category: 'Hospital Diagnostics & Clinical Systems',
    district: 'Jaipur',
    state: 'Rajasthan',
    verificationStatus: 'Verified GST',
    contractsCount: 4,
    totalAwarded: 22400000
  },
  {
    id: 'sup-004',
    fictionalName: 'Ganga Hydrocon Utilities Pvt Ltd',
    registrationReference: '10AAACG4321D1Z1 (Fictional Demo)',
    category: 'Water Pipelines & Civil Reservoirs',
    district: 'Patna',
    state: 'Bihar',
    verificationStatus: 'Verified GST',
    contractsCount: 6,
    totalAwarded: 89000000
  },
  {
    id: 'sup-005',
    fictionalName: 'Deccan Solartech Electrics',
    registrationReference: '29AAACD3456E1Z4 (Fictional Demo)',
    category: 'Solar Lighting & Electrical Grids',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    verificationStatus: 'Flagged',
    contractsCount: 2,
    totalAwarded: 9500000
  }
];

export const initialContracts: Contract[] = [
  {
    id: 'CNT-2025-081',
    projectId: 'JD-UP-2026-001',
    supplierId: 'sup-001',
    supplierName: 'Apex Shiksha Infra & Supplies Pvt Ltd (Fictional)',
    tenderId: 'TND-UP-EDU-2025-412',
    contractValue: 900000,
    procurementMethod: 'Open E-Tender (Single Envelope)',
    scope: 'Civil dining shelter canteen construction (320 sq ft), school electrical fans, desks, playground setup, and library reference books.',
    startDate: '2025-11-20',
    endDate: '2026-03-31',
    amendmentsCount: 1,
    amendmentNotes: ['Amendment 1: Reallocated ₹20,000 between electrical fixtures and civil dining floor tiles upon contractor request.'],
    status: 'Under Audit'
  },
  {
    id: 'CNT-2025-022',
    projectId: 'JD-MH-2026-014',
    supplierId: 'sup-002',
    supplierName: 'Sahyadri Roadways & Infrastructure Ltd (Fictional)',
    tenderId: 'TND-MH-PWD-2025-119',
    contractValue: 43800000,
    procurementMethod: 'Two-Cover E-Procurement',
    scope: 'Bituminous surfacing, wet mix macadam, roadside storm drainage and road signage.',
    startDate: '2025-09-10',
    endDate: '2026-04-15',
    amendmentsCount: 0,
    amendmentNotes: [],
    status: 'Active'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-2026-901',
    contractId: 'CNT-2025-081',
    projectId: 'JD-UP-2026-001',
    invoiceNumber: 'APEX/25-26/104',
    invoiceDate: '2026-02-14',
    vendorName: 'Apex Shiksha Infra & Supplies Pvt Ltd',
    subtotal: 762712,
    taxes: 137288,
    total: 900000,
    verificationStatus: 'Unreconciled',
    lineItems: [
      {
        description: 'Canteen Structure: Brickwork, dining shelter, stainless food counter, wash basins',
        quantity: 1,
        unit: 'Lump Sum Job',
        rate: 400000,
        amount: 400000
      },
      {
        description: 'School Equipment: 20 ceiling fans, 60 dual study desks, swings kit, electrical cabling',
        quantity: 1,
        unit: 'Package Lot',
        rate: 400000,
        amount: 400000
      },
      {
        description: 'Library Resources: NCERT supplementary reader book catalogue and reference sets',
        quantity: 1,
        unit: 'Lot',
        rate: 100000,
        amount: 100000
      }
    ]
  }
];

export const initialPayments: Payment[] = [
  // Payments for JD-UP-2026-001 totaling exactly ₹7,80,000 against claimed ₹9,00,000
  {
    id: 'PAY-2026-041',
    projectId: 'JD-UP-2026-001',
    contractId: 'CNT-2025-081',
    invoiceId: 'INV-2026-901',
    reference: 'SBI-PFMS-TR-99881023 (Fictional)',
    amount: 350000,
    date: '2026-02-28',
    recipientId: 'sup-001-canteen',
    recipientName: 'Apex Shiksha Infra (Canteen Works Sub-Account)',
    payerAgency: 'Treasury Office, Lucknow District Education Node',
    status: 'Recorded',
    paymentPurpose: 'Canteen construction milestone release (Official Recorded Payment)',
    sourceSystem: 'State Integrated Financial Management System (e-Kosh Demo)',
    verificationStatus: 'Verified Record'
  },
  {
    id: 'PAY-2026-042',
    projectId: 'JD-UP-2026-001',
    contractId: 'CNT-2025-081',
    invoiceId: 'INV-2026-901',
    reference: 'SBI-PFMS-TR-99881024 (Fictional)',
    amount: 350000,
    date: '2026-03-05',
    recipientId: 'sup-001-equip',
    recipientName: 'Apex Shiksha Infra (Electrical & Furniture Sub-Account)',
    payerAgency: 'Treasury Office, Lucknow District Education Node',
    status: 'Recorded',
    paymentPurpose: 'Playground apparatus, electrical fans, and classroom desks (Official Recorded Payment)',
    sourceSystem: 'State Integrated Financial Management System (e-Kosh Demo)',
    verificationStatus: 'Verified Record'
  },
  {
    id: 'PAY-2026-043',
    projectId: 'JD-UP-2026-001',
    contractId: 'CNT-2025-081',
    invoiceId: 'INV-2026-901',
    reference: 'SBI-PFMS-TR-99881025 (Fictional)',
    amount: 80000,
    date: '2026-03-12',
    recipientId: 'sup-001-books',
    recipientName: 'Apex Shiksha Infra (Educational Books Sub-Account)',
    payerAgency: 'Treasury Office, Lucknow District Education Node',
    status: 'Recorded',
    paymentPurpose: 'Supplementary library books & educational charts (Official Recorded Payment)',
    sourceSystem: 'State Integrated Financial Management System (e-Kosh Demo)',
    verificationStatus: 'Verified Record'
  },
  // Other projects payments
  {
    id: 'PAY-2026-088',
    projectId: 'JD-MH-2026-014',
    contractId: 'CNT-2025-022',
    invoiceId: 'INV-2026-304',
    reference: 'RBI-NEFT-MH-88771120',
    amount: 15600000,
    date: '2026-01-20',
    recipientId: 'sup-002',
    recipientName: 'Sahyadri Roadways & Infrastructure Ltd',
    payerAgency: 'Treasury Office Pune',
    status: 'Verified Against Source',
    paymentPurpose: 'Running Account Bill 2: Sub-base macadam and side drains',
    sourceSystem: 'Mahakosh e-Treasury Node',
    verificationStatus: 'Verified Record'
  },
  {
    id: 'PAY-2026-119',
    projectId: 'JD-RJ-2026-089',
    contractId: 'CNT-2025-045',
    invoiceId: 'INV-2026-552',
    reference: 'PNB-RTGS-RJ-44331190',
    amount: 8420000,
    date: '2026-02-18',
    recipientId: 'sup-003',
    recipientName: 'Marwar Meditech Solutions',
    payerAgency: 'Rajasthan Treasury Jaipur',
    status: 'Recorded',
    paymentPurpose: 'Full supply payment for diagnostic biochemical and ultrasound units',
    sourceSystem: 'PayManager Rajasthan Demo',
    verificationStatus: 'Verified Record'
  }
];

export const initialDeliveryRecords: DeliveryRecord[] = [
  {
    id: 'DEL-2026-001',
    projectId: 'JD-UP-2026-001',
    itemOrWork: 'High-Efficiency Ceiling Fans (Classrooms)',
    expectedQuantity: 20,
    reportedQuantity: 20,
    verifiedQuantity: 16,
    unit: 'Units (Ceiling Fans)',
    inspectionStatus: 'Mismatch',
    inspectionDate: '2026-03-18',
    inspectorRole: 'Junior Quality Inspector (Division 3)',
    evidenceIds: ['EVD-004', 'EVD-007'],
    notes: 'Physical on-site inspection verified only 16 installed fans across 4 classrooms. 4 units reported as in storage awaiting mounting brackets.'
  },
  {
    id: 'DEL-2026-002',
    projectId: 'JD-UP-2026-001',
    itemOrWork: 'Dual Study Desks & Benches',
    expectedQuantity: 60,
    reportedQuantity: 60,
    verifiedQuantity: 60,
    unit: 'Pairs (Desk + Bench)',
    inspectionStatus: 'Verified',
    inspectionDate: '2026-03-18',
    inspectorRole: 'Junior Quality Inspector (Division 3)',
    evidenceIds: ['EVD-004'],
    notes: 'All 60 dual study desks delivered and physically counted in functional condition.'
  },
  {
    id: 'DEL-2026-003',
    projectId: 'JD-UP-2026-001',
    itemOrWork: 'New Canteen Dining Shelter Structure',
    expectedQuantity: 320,
    reportedQuantity: 320,
    verifiedQuantity: 320,
    unit: 'Sq. Ft (Built Shelter)',
    inspectionStatus: 'Verified',
    inspectionDate: '2026-03-18',
    inspectorRole: 'Junior Quality Inspector (Division 3)',
    evidenceIds: ['EVD-004', 'EVD-005'],
    notes: 'Shelter structure complete. Flooring tiled. However, water connection to stainless food counter pending municipal hookup.'
  },
  {
    id: 'DEL-2026-004',
    projectId: 'JD-UP-2026-001',
    itemOrWork: 'Library Supplementary Books & Catalogues',
    expectedQuantity: 450,
    reportedQuantity: 450,
    verifiedQuantity: 390,
    unit: 'Book Volumes',
    inspectionStatus: 'Mismatch',
    inspectionDate: '2026-03-18',
    inspectorRole: 'Junior Quality Inspector (Division 3)',
    evidenceIds: ['EVD-006'],
    notes: 'Physical book inventory tallied 390 volumes against 450 billed on invoice. Vendor cited publisher back-order for 60 science reference editions.'
  }
];

export const initialEvidence: EvidenceItem[] = [
  {
    id: 'EVD-001',
    projectId: 'JD-UP-2026-001',
    title: 'Work Order & Approved Specification Schedule',
    type: 'Contract',
    source: 'E-Procurement Portal (GeM State Mirror Demo)',
    submittedAt: '2025-11-20',
    submittedByRole: 'Chief District Education Officer (CDEO)',
    verificationStatus: 'verified',
    description: 'Signed contractual specification sheet detailing civil construction, electrical specs (BEE 5-star fans), desk dimensions, and textbook list.'
  },
  {
    id: 'EVD-002',
    projectId: 'JD-UP-2026-001',
    title: 'Supplier Cumulative Bill APEX/25-26/104',
    type: 'Invoice',
    source: 'Contractor Portal Upload',
    submittedAt: '2026-02-14',
    submittedByRole: 'Vendor Accounts Executive (Apex Infra)',
    verificationStatus: 'disputed',
    description: 'Claimed total of ₹9,00,000 for canteen civil work, classroom fittings, and library books.'
  },
  {
    id: 'EVD-003',
    projectId: 'JD-UP-2026-001',
    title: 'Treasury Payment Disbursement Records (3 Vouchers)',
    type: 'Measurement Sheet',
    source: 'District Treasury Node (PFMS Gateway)',
    submittedAt: '2026-03-14',
    submittedByRole: 'Divisional Accounts Officer',
    verificationStatus: 'verified',
    description: 'Three verified treasury transfer advices showing ₹3.5L, ₹3.5L, and ₹0.8L credited to designated vendor escrow (Total: ₹7,80,000).'
  },
  {
    id: 'EVD-004',
    projectId: 'JD-UP-2026-001',
    title: 'Division 3 Physical Inspection Report & Site Photographs',
    type: 'Inspection Report',
    source: 'Mobile Inspection App (Jan-Nirikshan Demo)',
    submittedAt: '2026-03-18',
    submittedByRole: 'Junior Quality Inspector (Division 3)',
    verificationStatus: 'verified',
    description: 'Site geo-tagged inspection photos confirming 16 fans installed (4 unmounted), 60 desks present, canteen structure built.'
  },
  {
    id: 'EVD-005',
    projectId: 'JD-UP-2026-001',
    title: 'Canteen Plinth & Stainless Counter Geo-tagged Site Photo',
    type: 'Site Photo',
    source: 'Field Verification Tablet',
    submittedAt: '2026-03-18',
    submittedByRole: 'Junior Quality Inspector (Division 3)',
    verificationStatus: 'verified',
    description: 'Photograph of newly erected 320 sq.ft dining pavilion and washing area at composite school.'
  },
  {
    id: 'EVD-006',
    projectId: 'JD-UP-2026-001',
    title: 'School Headmaster Handover & Acceptance Receipt',
    type: 'Delivery Receipt',
    source: 'School Management Committee (SMC)',
    submittedAt: '2026-03-20',
    submittedByRole: 'Acting Head Teacher (Chinhat Vidyalaya)',
    verificationStatus: 'received',
    description: 'Provisional handover note acknowledging receipt with a specific rider noting 4 uninstalled fans and 60 pending science books.'
  },
  {
    id: 'EVD-007',
    projectId: 'JD-UP-2026-001',
    title: 'Citizen Grievance Submission with Classroom Photo',
    type: 'Citizen Submission',
    source: 'CivicLens Public Portal',
    submittedAt: '2026-03-22',
    submittedByRole: 'Parent-Teacher Association Representative',
    verificationStatus: 'verified',
    description: 'Photograph demonstrating uninstalled electrical cabling and absent fans in classroom 4A.'
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 'JD-CMP-2026-081',
    projectId: 'JD-UP-2026-001',
    projectName: 'Government School Infrastructure and Supplies Upgrade (Lucknow)',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    category: 'Suspected overbilling',
    title: 'Canteen shelter rate appears significantly above local PWD schedule; 4 ceiling fans missing',
    description: 'The school notice board lists expenditure claim of ₹9,00,000 for the upgrade. Local civil contractor estimate for the 320 sq.ft shed is under ₹3.5L. In addition, only 16 fans were installed in classes; two rooms still have empty hooks. Requesting independent verification.',
    observationDate: '2026-03-21',
    submittedAt: '2026-03-22 14:15:00',
    status: 'Assigned for Verification',
    assignedAuthorityRole: 'Chief District Education Officer (CDEO)',
    complainantContactType: 'Confidential Email',
    publicUpdates: [
      {
        date: '2026-03-22 14:15:00',
        status: 'Submitted',
        note: 'Complaint registered by citizen. Verification ID issued.'
      },
      {
        date: '2026-03-23 10:30:00',
        status: 'Acknowledged',
        note: 'System matched complaint with Project JD-UP-2026-001.'
      },
      {
        date: '2026-03-24 16:00:00',
        status: 'Assigned for Verification',
        note: 'Referred to Senior Audit Reviewer for physical inventory and invoice reconciliation.'
      }
    ]
  },
  {
    id: 'JD-CMP-2026-077',
    projectId: 'JD-KA-2026-105',
    projectName: 'Public Smart Streetlight & Solar Grid Installation (Bengaluru Rural)',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    category: 'Incomplete work',
    title: 'Solar streetlights dark on western bypass section',
    description: 'Over 40 solar streetlight poles along the Doddaballapur bypass have been erected without solar panels or batteries, leaving the road in complete darkness at night.',
    observationDate: '2026-03-15',
    submittedAt: '2026-03-16 09:40:00',
    status: 'Evidence Requested',
    assignedAuthorityRole: 'Divisional Project Engineer',
    complainantContactType: 'Anonymous Demo',
    publicUpdates: [
      {
        date: '2026-03-16 09:40:00',
        status: 'Submitted',
        note: 'Complaint recorded regarding incomplete solar installation.'
      },
      {
        date: '2026-03-17 11:20:00',
        status: 'Evidence Requested',
        note: 'Vendor instructed to provide pole-wise commissioning telemetry logs.'
      }
    ]
  },
  {
    id: 'JD-CMP-2026-064',
    projectId: 'JD-RJ-2026-089',
    projectName: 'Primary Health Centre Diagnostic Equipment Procurement (Jaipur)',
    state: 'Rajasthan',
    district: 'Jaipur',
    category: 'Delayed project',
    title: 'Biochemistry analyser delivered but locked in storage due to missing training',
    description: 'Equipment arrived two months ago but patients are still sent to private clinics for basic blood panels because technician calibration and operational handover has not occurred.',
    observationDate: '2026-03-01',
    submittedAt: '2026-03-03 16:45:00',
    status: 'Action Recorded',
    assignedAuthorityRole: 'Chief Medical & Health Officer (CMHO)',
    complainantContactType: 'SMS Alerts',
    publicUpdates: [
      {
        date: '2026-03-03 16:45:00',
        status: 'Submitted',
        note: 'Complaint received regarding idle diagnostic equipment.'
      },
      {
        date: '2026-03-08 14:00:00',
        status: 'Action Recorded',
        note: 'Vendor issued warning; mandatory on-site operator training scheduled for upcoming week.'
      }
    ]
  }
];

export const initialRiskFlags: RiskFlag[] = [
  {
    id: 'RF-2026-001',
    projectId: 'JD-UP-2026-001',
    projectName: 'Government School Infrastructure and Supplies Upgrade (Lucknow)',
    category: 'Cost Estimation',
    severity: 'high',
    riskScore: 78,
    reason: 'Claimed expenditure of ₹9,00,000 exceeds illustrative reference benchmark of ₹7,80,000 by ₹1,20,000 (15.38% above reference, 13.33% of claim), exceeding the 5% tolerance threshold.',
    calculation: '₹9,00,000 (Claimed) − ₹7,80,000 (Illustrative Reference Cost) = ₹1,20,000 Potential Discrepancy.',
    supportingRecords: ['Invoice APEX/25-26/104', 'Treasury Vouchers PAY-041/042/043', 'PWD Schedule of Rates 2025-26'],
    missingEvidence: ['Detailed contractor measurement sheet for canteen foundation', 'Receipt vouchers for 4 uninstalled ceiling fans', 'Publisher invoice for 60 pending books'],
    recommendation: 'Initiate formal documentary review. Request itemised contractor rate breakdown, verify tax invoices, and conduct physical audit of remaining inventory.',
    reviewStatus: 'In Progress',
    assignedReviewerRole: 'Senior State Auditor'
  },
  {
    id: 'RF-2026-002',
    projectId: 'JD-UP-2026-001',
    projectName: 'Government School Infrastructure and Supplies Upgrade (Lucknow)',
    category: 'Delivery Verification',
    severity: 'medium',
    riskScore: 65,
    reason: 'Physical delivery mismatch: 20 ceiling fans contracted and billed; inspection confirmed only 16 installed (4 units pending installation). 450 library books billed; only 390 catalogued.',
    calculation: 'Contract: 20 Fans | Inspected: 16 Fans | Variance: −4 Fans (−20% physical deficit). Books: 450 billed | 390 verified | Variance: −60 books.',
    supportingRecords: ['Delivery Record DEL-2026-001', 'Inspection Report EVD-004', 'SMC Provisional Receipt EVD-006'],
    missingEvidence: ['Physical verification receipt for 4 stored fans', 'Publisher delivery docket for 60 pending volumes'],
    recommendation: 'Verify physical presence in school custody before releasing remaining retention funds.',
    reviewStatus: 'In Progress',
    assignedReviewerRole: 'Junior Quality Inspector (Division 3)'
  },
  {
    id: 'RF-2026-003',
    projectId: 'JD-RJ-2026-089',
    projectName: 'Primary Health Centre Diagnostic Equipment Procurement (Jaipur)',
    category: 'Cost Estimation',
    severity: 'medium',
    riskScore: 64,
    reason: 'Biochemistry analyser unit procurement rate billed at ₹34,00,000 against state GEM benchmark rate of ₹29,50,000.',
    calculation: 'Billed: ₹34,00,000 | Reference: ₹29,50,000 | Discrepancy: ₹4,50,000.',
    supportingRecords: ['GeM Benchmark Ref GM-2025-MED-881'],
    missingEvidence: ['Specification justification for premium analyser module'],
    recommendation: 'Verify if contract included 5-year comprehensive annual maintenance contract (CAMC) explaining differential.',
    reviewStatus: 'Pending Review',
    assignedReviewerRole: 'Biomedical Equipment Officer'
  },
  {
    id: 'RF-2026-004',
    projectId: 'JD-KA-2026-105',
    projectName: 'Public Smart Streetlight & Solar Grid Installation (Bengaluru Rural)',
    category: 'Evidence Gap',
    severity: 'medium',
    riskScore: 59,
    reason: 'Absence of statutory Third-Party Electrical Safety Inspection Certificate prior to 70% payment release.',
    calculation: '₹49,00,000 disbursed without signed Form 8A electrical safety clearance.',
    supportingRecords: ['Bank Payment Advice PNB-0992'],
    missingEvidence: ['Form 8A Electrical Inspectorate Certificate', 'Central Telemetry Commissioning Log'],
    recommendation: 'Halt remaining milestone payment until independent electrical inspector submits sign-off.',
    reviewStatus: 'Inspection Scheduled',
    assignedReviewerRole: 'Third-Party Electrical Inspector'
  }
];

export const initialReviewCases: ReviewCase[] = [
  {
    id: 'RC-2026-001',
    riskFlagId: 'RF-2026-001',
    projectId: 'JD-UP-2026-001',
    assignedReviewerRole: 'Senior State Auditor',
    status: 'Under Investigation',
    findings: 'Official claimed expenditure is ₹9,00,000. Verified treasury payments sum to ₹7,80,000 across 3 disbursements. Illustrative reference cost calculated via PWD Schedule of Rates and local market benchmarks is ₹7,80,000, leaving an apparent ₹1,20,000 differential between the claimed ₹9,00,000 and the reference estimate. Contractor claims difference covers regional transport surge and special high-grade stainless food counter. Verification ongoing.',
    notes: [
      {
        id: 'NOT-001',
        authorRole: 'Senior State Auditor',
        timestamp: '2026-03-23 11:00:00',
        note: 'Opened formal case file based on automated cost discrepancy alert RF-2026-001 and citizen complaint JD-CMP-2026-081. Contacted Executive Engineer for tender measurement book.'
      },
      {
        id: 'NOT-002',
        authorRole: 'Chief District Education Officer (CDEO)',
        timestamp: '2026-03-24 15:30:00',
        note: 'Submitted contractor written explanation. Vendor states stainless counter was upgraded from Grade 201 to Grade 304 food-grade stainless steel at headmaster oral request.'
      },
      {
        id: 'NOT-003',
        authorRole: 'Senior State Auditor',
        timestamp: '2026-03-25 10:15:00',
        note: 'Informed CDEO that unapproved oral variations are not admissible without approved written change order. Issued request for material mill test certificates and original manufacturer invoices.'
      }
    ],
    checklist: [
      {
        id: 'CHK-01',
        item: 'Approved scope and quantities schedule',
        status: 'verified',
        updatedAt: '2026-03-23 11:30:00'
      },
      {
        id: 'CHK-02',
        item: 'Signed contract and formal variation amendments',
        status: 'disputed',
        updatedAt: '2026-03-24 15:35:00'
      },
      {
        id: 'CHK-03',
        item: 'Original supplier tax invoices (GSTIN verified)',
        status: 'received',
        updatedAt: '2026-03-24 16:00:00'
      },
      {
        id: 'CHK-04',
        item: 'Supplier quotations and market price benchmarks',
        status: 'verified',
        updatedAt: '2026-03-25 09:20:00'
      },
      {
        id: 'CHK-05',
        item: 'Goods delivery receipts and gate entry passes',
        status: 'disputed',
        updatedAt: '2026-03-25 10:00:00'
      },
      {
        id: 'CHK-06',
        item: 'Civil measurement sheets (M-Book entry)',
        status: 'pending',
        updatedAt: '2026-03-23 11:30:00'
      },
      {
        id: 'CHK-07',
        item: 'Work-quality inspection report with geo-tagged media',
        status: 'verified',
        updatedAt: '2026-03-24 12:00:00'
      },
      {
        id: 'CHK-08',
        item: 'Applicable GST tax return reconciliation',
        status: 'received',
        updatedAt: '2026-03-25 14:00:00'
      },
      {
        id: 'CHK-09',
        item: 'Independent physical verification report',
        status: 'pending',
        updatedAt: '2026-03-23 11:30:00'
      },
      {
        id: 'CHK-10',
        item: 'Treasury payment disbursement vouchers',
        status: 'verified',
        updatedAt: '2026-03-23 12:00:00'
      },
      {
        id: 'CHK-11',
        item: 'Contractor written justification for variance',
        status: 'received',
        updatedAt: '2026-03-24 15:30:00'
      },
      {
        id: 'CHK-12',
        item: 'Reviewer final audit findings & closure recommendation',
        status: 'pending',
        updatedAt: '2026-03-23 11:30:00'
      }
    ]
  }
];

export const initialAuditEvents: AuditEvent[] = [
  {
    id: 'AUD-001',
    entityType: 'Case',
    entityId: 'RC-2026-001',
    eventType: 'AI Discrepancy Flag Generated',
    timestamp: '2026-03-22 08:30:00',
    actorRole: 'System (AI Engine)',
    previousState: 'None',
    newState: 'Flagged (Score 78)',
    reason: 'Cost comparison rule triggered: Claimed ₹9,00,000 exceeds benchmark ₹7,80,000 by ₹1,20,000 (15.38% variance > 5% threshold).'
  },
  {
    id: 'AUD-002',
    entityType: 'Complaint',
    entityId: 'JD-CMP-2026-081',
    eventType: 'Citizen Complaint Ingested',
    timestamp: '2026-03-22 14:15:00',
    actorRole: 'Citizen (PTA Representative)',
    previousState: 'None',
    newState: 'Submitted',
    reason: 'Citizen reported overbilling perception and missing 4 fans at school site.'
  },
  {
    id: 'AUD-003',
    entityType: 'Case',
    entityId: 'RC-2026-001',
    eventType: 'Reviewer Assignment',
    timestamp: '2026-03-23 11:00:00',
    actorRole: 'State Audit Director',
    previousState: 'New',
    newState: 'Assigned to Senior State Auditor',
    reason: 'Assigned priority audit due to combined AI anomaly and corroborating citizen complaint.'
  },
  {
    id: 'AUD-004',
    entityType: 'Evidence',
    entityId: 'EVD-004',
    eventType: 'Inspection Verification Recorded',
    timestamp: '2026-03-24 12:00:00',
    actorRole: 'Junior Quality Inspector (Division 3)',
    previousState: 'Unverified',
    newState: 'Verified with Mismatch',
    reason: 'On-site count confirmed 16 of 20 fans installed and 390 of 450 books in library.'
  },
  {
    id: 'AUD-005',
    entityType: 'Case',
    entityId: 'RC-2026-001',
    eventType: 'Additional Documentation Demanded',
    timestamp: '2026-03-25 10:15:00',
    actorRole: 'Senior State Auditor',
    previousState: 'Under Investigation',
    newState: 'Evidence Requested',
    reason: 'Demanded signed M-Book and manufacturer test certificates for stainless steel grade upgrade.'
  }
];

export const initialDataSources: DataSource[] = [
  {
    id: 'SRC-01',
    name: 'State Integrated Financial Management System (e-Kosh)',
    dataType: 'Treasury payment vouchers & electronic debit records',
    connectionMode: 'Simulated',
    lastImportTime: '2026-03-25 04:00:00 UTC',
    recordCount: 18420,
    validationStatus: 'Healthy Sync',
    completeness: 99.4,
    knownLimitations: 'Direct bank release timestamps can be lagged by up to 24 hours behind treasury scroll generation.',
    responsibleDataSteward: 'State Treasury Directorate'
  },
  {
    id: 'SRC-02',
    name: 'State E-Procurement Portal (GeM State Integration Node)',
    dataType: 'Tenders, bids, contracts, vendor registrations & amendments',
    connectionMode: 'Imported Demo Data',
    lastImportTime: '2026-03-24 22:30:00 UTC',
    recordCount: 3450,
    validationStatus: 'Verified Format',
    completeness: 94.1,
    knownLimitations: 'Physical amendment annexures uploaded as scanned PDFs lack automatic OCR field validation.',
    responsibleDataSteward: 'State Procurement Cell'
  },
  {
    id: 'SRC-03',
    name: 'Jan-Nirikshan Mobile Field Inspection Gateway',
    dataType: 'Geo-tagged site photographs, inspector signatures, M-Book extracts',
    connectionMode: 'Simulated',
    lastImportTime: '2026-03-25 08:15:00 UTC',
    recordCount: 8910,
    validationStatus: 'Healthy Sync',
    completeness: 88.5,
    knownLimitations: 'Low connectivity rural zones batch upload inspections retrospectively with offline timestamps.',
    responsibleDataSteward: 'Departmental Quality Control Wings'
  },
  {
    id: 'SRC-04',
    name: 'CPWD / State PWD Schedule of Rates (SoR 2025-26)',
    dataType: 'Standard civil, electrical, and labor item price benchmarks',
    connectionMode: 'Imported Demo Data',
    lastImportTime: '2026-01-01 00:00:00 UTC',
    recordCount: 14200,
    validationStatus: 'Verified Format',
    completeness: 97.8,
    knownLimitations: 'Rates represent statutory benchmark averages and do not factor emergency freight or hyper-local material spikes.',
    responsibleDataSteward: 'Chief Engineer Technical Audit'
  },
  {
    id: 'SRC-05',
    name: 'National Public Grievance Portal (CPGRAMS / Jan-Sunwai Mirror)',
    dataType: 'Citizen grievance submissions, location tags, attachments',
    connectionMode: 'Simulated',
    lastImportTime: '2026-03-25 09:00:00 UTC',
    recordCount: 1240,
    validationStatus: 'Healthy Sync',
    completeness: 92.0,
    knownLimitations: 'Complainant identity redactions are performed automatically to preserve whistle-blower anonymity.',
    responsibleDataSteward: 'Public Grievance Directorate'
  }
];

export const fictionalRoles: PersonOrRole[] = [
  {
    id: 'usr-cit',
    displayName: 'Citizen Observer',
    roleTitle: 'Public Citizen / Whistleblower / Vigilance Observer',
    organisationId: 'Civil Society',
    departmentName: 'Public Domain',
    responsibilities: ['Explore open public projects', 'Track money trail', 'Submit citizen complaints', 'Track complaint updates', 'Export transparency reports'],
    accessRole: 'citizen',
    isFictional: true
  },
  {
    id: 'usr-aud',
    displayName: 'Rajesh Verma (Senior State Auditor)',
    roleTitle: 'Senior Deputy Accountant General (Audit)',
    organisationId: 'State Audit Office',
    departmentName: 'State Audit & Accounts Department',
    responsibilities: ['Investigate flagged discrepancies', 'Update evidence checklist', 'Assign technical reviewers', 'Request contractor documentation', 'Record reasoned audit decisions'],
    accessRole: 'auditor',
    isFictional: true
  },
  {
    id: 'usr-fin',
    displayName: 'Sunita Mehra (Finance Officer)',
    roleTitle: 'Divisional Accounts Officer',
    organisationId: 'Treasury & Finance Node',
    departmentName: 'Department of Finance & Accounts',
    responsibilities: ['Reconcile treasury payments against claims', 'Track bank clearance status', 'Verify invoice taxes', 'Flag unrecorded payment variances'],
    accessRole: 'finance',
    isFictional: true
  },
  {
    id: 'usr-adm',
    displayName: 'Anil Saxena (Project Administrator)',
    roleTitle: 'Chief District Education Officer (CDEO)',
    organisationId: 'District Administration',
    departmentName: 'Department of School Education & Literacy',
    responsibilities: ['Supervise project milestones', 'Approve contract variations', 'Verify inspection dockets', 'Address citizen complaints', 'Provide documentary clarifications'],
    accessRole: 'admin',
    isFictional: true
  },
  {
    id: 'usr-inv',
    displayName: 'Vikramaditya Rao (Vigilance Investigator)',
    roleTitle: 'Superintendent of Police (State Vigilance Directorate)',
    organisationId: 'State Vigilance Bureau',
    departmentName: 'Anti-Corruption & Vigilance Cell',
    responsibilities: ['Investigate escalated cases', 'Examine relationship collusion risk', 'Audit procurement tenders', 'Cross-examine bank reconciliation trail'],
    accessRole: 'investigator',
    isFictional: true
  },
  {
    id: 'usr-sys',
    displayName: 'Meera Krishnan (Platform Administrator)',
    roleTitle: 'Principal Technical Architect & System Admin',
    organisationId: 'National Informatics Directorate',
    departmentName: 'Civic Tech & System Infrastructure',
    responsibilities: ['Configure risk tolerance thresholds', 'Manage data source sync', 'Maintain tamper-evident logs', 'Reset demonstration state'],
    accessRole: 'platform_admin',
    isFictional: true
  }
];
