/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ConfirmDialog } from './components/common/ConfirmDialog';

import { LandingPage } from './pages/LandingPage';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { PublicProjects } from './pages/PublicProjects';
import { SchoolCaseDetail } from './pages/SchoolCaseDetail';
import { MoneyTrail } from './pages/MoneyTrail';
import { AIRiskAnalysis } from './pages/AIRiskAnalysis';
import { ResponsibilityMap } from './pages/ResponsibilityMap';
import { ProcurementContracts } from './pages/ProcurementContracts';
import { DeliveryVerification } from './pages/DeliveryVerification';
import { CitizenComplaints } from './pages/CitizenComplaints';
import { AuditInvestigation } from './pages/AuditInvestigation';
import { ReportsTransparency } from './pages/ReportsTransparency';
import { DataSourcesVerification } from './pages/DataSourcesVerification';
import { SystemSettings } from './pages/SystemSettings';
import { NotFoundPage } from './pages/NotFoundPage';

const AppShell: React.FC = () => {
  const { activePage, resetDemoData } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Dynamic Page Title
  useEffect(() => {
    const titles: Record<string, string> = {
      landing: 'CivicLens AI – National Public Accountability Platform',
      overview: 'Executive Dashboard – CivicLens AI',
      projects: 'Public Projects Directory – CivicLens AI',
      'project-detail': 'School Case Investigation – CivicLens AI',
      'money-trail': 'Money Trail & Digital Payment Reconciliation – CivicLens AI',
      'ai-risk': 'AI Risk Analysis & Anomaly Engine – CivicLens AI',
      responsibility: 'Responsibility & Authority Map – CivicLens AI',
      procurement: 'Procurement & Contracts Oversight – CivicLens AI',
      delivery: 'Delivery Verification & Physical Audit – CivicLens AI',
      complaints: 'Citizen Grievance & Public Feedback – CivicLens AI',
      audit: 'Audit & Investigation Workspace – CivicLens AI',
      reports: 'Reports & Public Transparency – CivicLens AI',
      'data-sources': 'Data Sources & Verification – CivicLens AI',
      settings: 'System Settings – CivicLens AI',
      'not-found': 'Page Not Found – CivicLens AI'
    };
    document.title = titles[activePage] || 'CivicLens AI – National Public Accountability Platform';
  }, [activePage]);

  // Handle Landing Page full-screen view
  if (activePage === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-white">
        <Navbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenResetDialog={() => setResetDialogOpen(true)}
        />
        <main className="flex-1">
          <LandingPage />
        </main>
        <Footer />
        <ToastContainer />
        <ConfirmDialog
          isOpen={resetDialogOpen}
          title="Reset Demo Records?"
          message="This will restore all fictional projects, evidence records, and payment logs to their initial default state."
          confirmLabel="Reset Demonstration"
          isDestructive={true}
          onConfirm={resetDemoData}
          onCancel={() => setResetDialogOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative text-slate-900 overflow-x-hidden selection:bg-teal-500 selection:text-white">
      {/* Dynamic Glassmorphic Ambient Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/15 rounded-full blur-[90px]" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/12 rounded-full blur-[90px]" />
        <div className="absolute top-2/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/12 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 right-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.12]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenResetDialog={() => setResetDialogOpen(true)}
        />

        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar
            isMobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />

          <main className="flex-1 py-6 lg:px-8 max-w-full overflow-x-hidden min-w-0">
            {activePage === 'overview' && <OverviewDashboard />}
            {activePage === 'projects' && <PublicProjects />}
            {activePage === 'project-detail' && <SchoolCaseDetail />}
            {activePage === 'money-trail' && <MoneyTrail />}
            {activePage === 'ai-risk' && <AIRiskAnalysis />}
            {activePage === 'responsibility' && <ResponsibilityMap />}
            {activePage === 'procurement' && <ProcurementContracts />}
            {activePage === 'delivery' && <DeliveryVerification />}
            {activePage === 'complaints' && <CitizenComplaints />}
            {activePage === 'audit' && <AuditInvestigation />}
            {activePage === 'reports' && <ReportsTransparency />}
            {activePage === 'data-sources' && <DataSourcesVerification />}
            {activePage === 'settings' && <SystemSettings />}
            {activePage === 'not-found' && <NotFoundPage />}
          </main>
        </div>

        <Footer />
        <ToastContainer />

        <ConfirmDialog
          isOpen={resetDialogOpen}
          title="Reset All Demonstration Records?"
          message="This will restore all fictional projects, evidence records, complaints, and payments to their initial state."
          confirmLabel="Reset Demonstration"
          isDestructive={true}
          onConfirm={resetDemoData}
          onCancel={() => setResetDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
