'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock, Phone, Mail, Clock, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Candidate Support Center Banner (PRD Candidate Helpdesk) */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300">
              Official Candidate Support Center
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Need Help with Recruitment Mocks or Ground Milestones?
            </h3>
            <p className="text-xs text-slate-600">
              Our technical help desk assists aspirants with examination portal logins, PET milestone logging, and OTP verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold">Toll-Free Candidate Helpline</span>
                <p className="text-base font-black text-slate-900 font-mono">1800-425-7788</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold">Support Desk Timings</span>
                <p className="text-xs font-bold text-slate-900">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
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
                <span className="font-extrabold text-lg text-slate-900">POLICE SI PLATFORM</span>
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
                  Preliminary Written Test (200 M)
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
                <Link href="/pet-tracker" className="hover:text-amber-700 transition-colors">
                  Physical Milestone Tracker (PET)
                </Link>
              </li>
              <li>
                <Link href="/descriptive" className="hover:text-amber-700 transition-colors">
                  Descriptive Answer Upload
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-amber-700 transition-colors">
                  State-Wide Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-amber-700 font-bold text-amber-800 transition-colors">
                  Candidate Login & Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Target Police Wings */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Target Cadres
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Sub-Inspector (Civil)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Reserve Sub-Inspector (AR)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                SAR CPL (Men)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                TSSP / APSP Battalions
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Police Communications SI
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Police SI Exam & Practice Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Adheres to TSLPRB & AP Police Recruitment Guidelines</span>
            <span className="text-amber-800 font-semibold flex items-center gap-1">
              Built with dedication for Police SI Aspirants
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
