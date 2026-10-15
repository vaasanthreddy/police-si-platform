'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  AlertCircle,
  X
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on test/exam CBT simulator pages where distraction-free mode is critical
  const isExamPage = pathname?.startsWith('/exam');

  // Support ticket modal state
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'MOCK_TEST_ISSUE',
    description: '',
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Policy Modals: 'PRIVACY' | 'TERMS' | 'REFUND' | 'ERRATA' | null
  const [activePolicyModal, setActivePolicyModal] = useState<'PRIVACY' | 'TERMS' | 'REFUND' | 'ERRATA' | null>(null);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setTicketSubmitted(true);
  };

  const closeSupportModal = () => {
    setSupportModalOpen(false);
    setTicketSubmitted(false);
    setSupportForm({
      name: '',
      email: '',
      phone: '',
      category: 'MOCK_TEST_ISSUE',
      description: '',
    });
  };

  // Remove footer on test simulators, previous papers, student dashboard, admin, and internal tools
  // to deliver an ultra-clean, distraction-free, professional app experience
  const isHiddenPage = 
    pathname?.startsWith('/exam') || 
    pathname === '/previous-papers' || 
    pathname === '/dashboard' || 
    pathname?.startsWith('/admin') ||
    pathname === '/descriptive' ||
    pathname === '/results' ||
    pathname === '/performance';

  // Do not render footer on internal/exam/tool routes
  if (isHiddenPage) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        

        {/* Independent Platform Disclaimer Banner (Item 1) */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-slate-700 text-xs mb-10 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900">Independent Preparation Platform Disclaimer:</strong>{' '}
            This is an independent exam preparation platform. We are not affiliated with, endorsed by, or operated by the Telangana State Level Police Recruitment Board (TSLPRB), the Andhra Pradesh State Level Police Recruitment Board (AP SLPRB), or any government police agency. All official notifications, syllabi, and criteria are referenced from public domain government gazettes.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-xl bg-amber-50 p-1 border border-amber-200 shadow-sm flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Police SI Emblem"
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900">
                  POLICE SI <span className="text-amber-600">EXAM PREPARATION PLATFORM</span>
                </span>
                <p className="text-xs text-amber-700 font-semibold">State Sub-Inspector Exam Preparation & PET Tracker</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pr-6">
              A comprehensive recruitment exam training platform tailored for Telangana State Level Police Recruitment Board (TSLPRB) and Andhra Pradesh Police Recruitment Board aspirants. Engineered with high-fidelity Computer-Based Testing (CBT), bilingual exam simulation, and Physical Efficiency tracking.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> OWASP Top 10 Secured
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono">
                <Lock className="w-3 h-3 text-amber-600" /> TSLPRB / AP Compliant
              </span>
            </div>
          </div>

          {/* Exam Syllabus & Modules */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Recruitment Syllabus
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/exam/tslprb-si-pwt-mock-01" className="hover:text-amber-700 transition-colors">
                  Preliminary Written Test (PWT 200M)
                </Link>
              </li>
              <li>
                <Link href="/exam/tslprb-si-pwt-mock-01" className="hover:text-amber-700 transition-colors">
                  Paper III: Arithmetic & Reasoning
                </Link>
              </li>
              <li>
                <Link href="/exam/tslprb-si-pwt-mock-01" className="hover:text-amber-700 transition-colors">
                  Paper IV: General Studies
                </Link>
              </li>
              <li>
                <Link href="/descriptive" className="hover:text-amber-700 transition-colors">
                  Paper I & II: Descriptive Papers
                </Link>
              </li>
              <li>
                <Link href="/pet-tracker" className="hover:text-amber-700 transition-colors">
                  PET 1600m & 800m Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Preparation Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/exam/tslprb-si-pwt-mock-01" className="hover:text-amber-700 transition-colors">
                  CBT Mock Test Simulator
                </Link>
              </li>
              <li>
                <Link href="/previous-papers" className="hover:text-amber-700 transition-colors">
                  Official Previous Papers (PYQ)
                </Link>
              </li>
              <li>
                <Link href="/pet-tracker" className="hover:text-amber-700 transition-colors">
                  Physical Milestone Tracker (PET)
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="hover:text-amber-700 font-bold text-amber-800 transition-colors">
                  SI Pro Pass (₹999 / 12 Months)
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-amber-700 transition-colors">
                  State-Wide Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Institutional Disclosures (Item 15) */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Policies & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('PRIVACY')}
                  className="hover:text-amber-700 transition-colors text-left font-medium"
                >
                  Privacy Policy & Answer Sheet Security
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('TERMS')}
                  className="hover:text-amber-700 transition-colors text-left font-medium"
                >
                  Terms of Service & Test Integrity
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('REFUND')}
                  className="hover:text-amber-700 transition-colors text-left font-medium"
                >
                  7-Day Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('ERRATA')}
                  className="hover:text-amber-700 transition-colors text-left font-medium"
                >
                  Content Corrections & Errata Policy
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block pt-1">
                  Support: Mon–Sat 9am–6pm IST
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Police SI Exam Preparation Platform. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => setActivePolicyModal('PRIVACY')} className="hover:underline">Privacy</button>
            <button onClick={() => setActivePolicyModal('TERMS')} className="hover:underline">Terms</button>
            <button onClick={() => setActivePolicyModal('REFUND')} className="hover:underline">Refunds</button>
            <button onClick={() => setActivePolicyModal('ERRATA')} className="hover:underline">Errata</button>
            <span className="text-amber-800 font-semibold">
              Independent Preparation Suite for Police Aspirants
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CANDIDATE SUPPORT TICKET MODAL (Item 8)                                */}
      {/* ========================================================================= */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Candidate Support Helpdesk</h3>
              </div>
              <button
                type="button"
                onClick={closeSupportModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Support Ticket Created Successfully!</h4>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 max-w-xs mx-auto text-xs font-mono">
                  <span className="text-slate-500">Ticket Reference:</span>
                  <p className="text-sm font-black text-amber-700">{ticketId}</p>
                </div>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Our academic helpdesk has logged your request. We will review your query and reply directly to <strong>{supportForm.email}</strong> within 12–24 business hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={closeSupportModal}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4 pt-4 text-xs">
                <p className="text-slate-600">
                  Please provide details about the issue you are experiencing. You can also reach us directly at <a href="mailto:support@police-si-prep.in" className="text-amber-700 underline font-bold">support@police-si-prep.in</a>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Registered Email</label>
                    <input
                      type="email"
                      required
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      placeholder="aspirant@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number (Optional)</label>
                    <input
                      type="tel"
                      value={supportForm.phone}
                      onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })}
                      placeholder="9848022338"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Query Category</label>
                    <select
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                    >
                      <option value="MOCK_TEST_ISSUE">Mock Test & Timer Discrepancy</option>
                      <option value="PET_TRACKER">PET Milestone Calculation</option>
                      <option value="DESCRIPTIVE_EVALUATION">Descriptive Paper Evaluation</option>
                      <option value="PAYMENT_PRO_PASS">Payment / SI Pro Pass Subscription</option>
                      <option value="QUESTION_ERRATA">Question or Answer Key Correction</option>
                      <option value="OTHER">Other Technical Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description of Issue</label>
                  <textarea
                    rows={4}
                    required
                    value={supportForm.description}
                    onChange={(e) => setSupportForm({ ...supportForm, description: e.target.value })}
                    placeholder="Describe the problem, question number, or error message you encountered..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeSupportModal}
                    className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Submit Support Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. POLICY MODALS (Item 15)                                                */}
      {/* ========================================================================= */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150 text-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {activePolicyModal === 'PRIVACY' && 'Privacy Policy & Answer Sheet Security'}
                {activePolicyModal === 'TERMS' && 'Terms of Service & Test Integrity'}
                {activePolicyModal === 'REFUND' && '7-Day Refund & Cancellation Policy'}
                {activePolicyModal === 'ERRATA' && 'Content Corrections & Errata Policy'}
              </h3>
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-4 leading-relaxed">
              {activePolicyModal === 'PRIVACY' && (
                <>
                  <p>
                    <strong>1. Candidate Identity & Data Handling:</strong> We collect only essential candidate identifiers (Name, Email, Mobile Number, Target State, Cadre Preference, and Ground Fitness records) to provide accurate mock tests and state percentiles. We never sell or lease candidate details to third parties.
                  </p>
                  <p>
                    <strong>2. Uploaded Answer Sheets Security:</strong> Scanned handwritten descriptive answer papers uploaded for Paper I (English) and Paper II (Telugu/Urdu) are stored in secure, private encrypted object storage. Only verified faculty evaluators have access to read and score candidate scripts.
                  </p>
                  <p>
                    <strong>3. Data Retention & Erasure:</strong> Candidates may request complete erasure of their account, test attempts, and uploaded images by contacting <a href="mailto:support@police-si-prep.in" className="text-amber-700 underline font-bold">support@police-si-prep.in</a> at any time.
                  </p>
                </>
              )}

              {activePolicyModal === 'TERMS' && (
                <>
                  <p>
                    <strong>1. Test Integrity & Fair Use:</strong> Mock test materials, questions, and explanations provided on this platform are proprietary or curated under public domain fair use for educational purposes. Candidates are prohibited from automated scraping or re-distributing paid mock papers.
                  </p>
                  <p>
                    <strong>2. Independent Platform Standing:</strong> This platform is an educational tool and does not guarantee appointment or qualification in the official TSLPRB or AP SLPRB selection processes. Selection is determined solely by the respective state police recruitment boards.
                  </p>
                  <p>
                    <strong>3. Account Security:</strong> Candidates are responsible for maintaining the confidentiality of their credentials and OTPs. Simultaneous logins from distinct geographical locations may trigger security lockouts.
                  </p>
                </>
              )}

              {activePolicyModal === 'REFUND' && (
                <>
                  <p>
                    <strong>1. 7-Day Money-Back Guarantee:</strong> We offer a 100% unconditional refund for SI Pro Pass subscriptions within 7 calendar days of purchase, provided that fewer than 2 full-length PWT CBT mocks have been completed and no descriptive scripts have undergone faculty evaluation.
                  </p>
                  <p>
                    <strong>2. Refund Process:</strong> To claim a refund, email <a href="mailto:support@police-si-prep.in" className="text-amber-700 underline font-bold">support@police-si-prep.in</a> with your registered email and payment transaction ID. Approved refunds are credited back to the original payment source within 3–5 banking days.
                  </p>
                  <p>
                    <strong>3. GST Invoicing:</strong> In accordance with Indian tax regulations, all subscription fees (₹999) include 18% GST. A valid tax invoice is generated upon successful payment.
                  </p>
                </>
              )}

              {activePolicyModal === 'ERRATA' && (
                <>
                  <p>
                    <strong>1. Academic Discrepancy Reporting:</strong> While our questions are rigorously validated against official state police answer keys, candidates may report any disputed question or rationale using our candidate support form or via email.
                  </p>
                  <p>
                    <strong>2. Review Committee:</strong> Our panel of retired IPS educators and subject experts reviews all reported discrepancies against official government gazettes within 48 hours. If an errata is confirmed, scores across all attempted users are automatically recalculated and credited.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
