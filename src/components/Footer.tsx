'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertCircle, X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer only on active CBT exam test simulator routes
  const isExamRoute = pathname?.startsWith('/exam');

  // Policy / Disclaimer modal state
  const [activeModal, setActiveModal] = useState<'PRIVACY' | 'TERMS' | 'DISCLAIMER' | 'REFUND' | 'ERRATA' | null>(null);

  if (isExamRoute) {
    return null;
  }

  return (
    <>
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs py-4 px-4 sm:px-6 lg:px-8 relative z-20 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          {/* Complete 2026 Copyright line */}
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            © 2026 Police SI Exam Preparation Platform. All rights reserved.
          </p>

          {/* Links with Disclaimer placed beside Terms */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-slate-600 dark:text-slate-300 font-medium">
            <button
              type="button"
              onClick={() => setActiveModal('PRIVACY')}
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Privacy
            </button>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <button
              type="button"
              onClick={() => setActiveModal('TERMS')}
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Terms
            </button>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            {/* Disclaimer button beside Terms */}
            <button
              type="button"
              onClick={() => setActiveModal('DISCLAIMER')}
              className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-bold transition-colors"
            >
              Disclaimer
            </button>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <button
              type="button"
              onClick={() => setActiveModal('REFUND')}
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Refunds
            </button>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <button
              type="button"
              onClick={() => setActiveModal('ERRATA')}
              className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Errata
            </button>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL: DISCLAIMER & POLICIES                                              */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-4">
            
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'DISCLAIMER' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Platform Disclaimer</h3>
                    <p className="text-[11px] text-slate-500">Official Institutional Disclosure</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    <strong>Independent Preparation Platform:</strong> This platform is an independent educational training service and test preparation portal.
                  </p>
                  <p>
                    We are <strong>not affiliated with, endorsed by, sponsored by, or operated by</strong> the Telangana State Level Police Recruitment Board (TSLPRB), the Andhra Pradesh State Level Police Recruitment Board (AP SLPRB), or any state or central government department.
                  </p>
                  <p>
                    All recruitment notifications, syllabi, previous question papers, and physical qualification benchmarks referenced on this site are sourced from public domain government gazettes (e.g. TSLPRB Rc No. 42 and AP SLPRB Rc No. 161). Candidates must refer to official board websites (<span className="font-mono text-amber-700">tslprb.in</span> and <span className="font-mono text-amber-700">slprb.ap.gov.in</span>) for formal notifications and exam hall tickets.
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'PRIVACY' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Privacy Policy</h3>
                    <p className="text-[11px] text-slate-500">Data Protection & Candidate Privacy</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed max-h-64 overflow-y-auto">
                  <p>Candidate mock attempt data, hall ticket numbers, and phone numbers are encrypted with industry-standard protocols. We do not sell or transfer your personal data to third-party commercial marketing agencies.</p>
                  <p>Your performance scores, speed analytics, and test submission timestamps are used solely to generate your comparative state percentile rankings and personal error log diagnostics.</p>
                </div>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'TERMS' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Terms of Service</h3>
                    <p className="text-[11px] text-slate-500">Test Integrity & Account Rules</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed max-h-64 overflow-y-auto">
                  <p>Access to timed CBT mock test questions, question palettes, and evaluation rubrics is granted for personal academic preparation only.</p>
                  <p>Automated scraping, unauthorized bulk re-distribution of test series question sheets, or fraudulent multi-session account sharing violates our fair-use policy and may result in immediate access revocation.</p>
                </div>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'REFUND' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">7-Day Refund Policy</h3>
                    <p className="text-[11px] text-slate-500">Candidate Money-Back Guarantee</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>We provide a 100% money-back guarantee within 7 calendar days of purchasing the Police SI 1-Year Pro Pass if fewer than 2 full-length grand mock tests have been completed.</p>
                  <p>To request a refund, submit a ticket via the Help & Support desk in your profile menu with your payment transaction ID. Refunds are processed back to the original source method within 3–5 banking days.</p>
                </div>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'ERRATA' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Content Corrections & Errata</h3>
                    <p className="text-[11px] text-slate-500">Official Key Verification</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>Our mock questions and solutions are prepared by experienced police exam educators and cross-checked against final published answer keys from TSLPRB and AP SLPRB.</p>
                  <p>If you observe any discrepancy in a question, translation, or numerical key, please report it via the Help & Support menu or inside the exam question review panel. Our academic cell reviews all flagged items within 24 hours.</p>
                </div>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
