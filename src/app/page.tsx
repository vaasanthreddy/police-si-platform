'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Activity, 
  FileText, 
  Languages, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  UserCheck,
  CreditCard,
  PenTool,
  Trophy,
  Archive
} from 'lucide-react';

export default function HomePage() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'pwt' | 'pet' | 'fwe' | 'daily'>('pwt');

  // If user is unauthenticated, redirect to login page with callback
  const getProtectedHref = (targetPath: string) => {
    return user ? targetPath : `/auth?redirect=${encodeURIComponent(targetPath)}`;
  };

  return (
    <div className="space-y-16 py-6 pb-20 font-sans">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center">
        
        {/* State Recruitment Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>OFFICIAL POLICE SI RECRUITMENT & PRACTICE PLATFORM (TSLPRB & AP POLICE)</span>
        </div>

        {/* Central Logo & Heading */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white p-3 border-2 border-amber-400 shadow-xl flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Police SI Emblem Logo"
              width={140}
              height={140}
              className="object-contain filter drop-shadow-md"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">Police Sub-Inspector</span> Preparation & PET Suite
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tailored specifically for Police Sub-Inspector aspirants (Civil, AR, SAR CPL, TSSP) and Constable candidates across Telangana and Andhra Pradesh. Practice timed full-length CBT mocks, track daily physical fitness benchmarks, and receive descriptive paper evaluations.
          </p>

          {/* Action CTAs - strictly without dashboard shortcut links as requested */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Attempt PWT Grand Mock (200 M)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={getProtectedHref('/pet-tracker')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Track Physical Milestones (PET)</span>
            </Link>

            <Link
              href={user ? (role === 'ADMIN' ? '/admin' : '/dashboard') : '/auth'}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>{user ? 'Open Portal Dashboard' : 'Candidate Portal Sign In'}</span>
            </Link>
          </div>
        </div>

        {/* Highlight Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="text-2xl font-black text-amber-700 font-mono">200 Marks</div>
            <p className="text-xs text-slate-500 mt-1">Full 3-Hour PWT & FWE Pattern with Negative Marking</p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="text-2xl font-black text-emerald-700 font-mono">1600m / 800m</div>
            <p className="text-xs text-slate-500 mt-1">Official PET Milestone Tracker for Men & Women</p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="text-2xl font-black text-blue-700 font-mono">Bilingual</div>
            <p className="text-xs text-slate-500 mt-1">Side-by-side English & Telugu question toggle</p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="text-2xl font-black text-purple-700 font-mono">Descriptive</div>
            <p className="text-xs text-slate-500 mt-1">Upload handwritten answer sheets for Paper I & II</p>
          </div>
        </div>
      </section>

      {/* Recruitment Exam Stages (PRD Section 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Complete Three-Stage Recruitment Exam Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Structured in strict adherence to the official TSLPRB & Andhra Pradesh Police Recruitment Board syllabus and qualification phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1: PWT */}
          <div className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono bg-amber-50 px-2 py-1 rounded">Stage 01</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">200 Marks</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Preliminary Written Test (PWT)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Single paper of 3 hours duration containing 200 objective questions covering Arithmetic & Test of Reasoning (100 Questions) and General Studies (100 Questions).
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>200 Questions • 3-Hour Countdown Timer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Negative marking calculation (0.25 penalty)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>English & Telugu bilingual side-by-side mode</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                className="w-full block text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors border border-amber-200 cursor-pointer"
              >
                Attempt PWT CBT Exam
              </Link>
            </div>
          </div>

          {/* Phase 2: PET / PMT */}
          <div className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest font-mono bg-emerald-50 px-2 py-1 rounded">Stage 02</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">Ground Fitness</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Physical Efficiency & Measurement (PET/PMT)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Log book and milestone tracker for qualifying physical measurements (Height/Chest) and performance in official track and field events.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1600m Run for Men (Target: &lt; 7m 15s)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>800m Run for Women (Target: &lt; 5m 20s)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Long Jump & Shot Put qualifying metrics</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href={getProtectedHref('/pet-tracker')}
                className="w-full block text-center py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors border border-emerald-200 cursor-pointer"
              >
                Open PET Tracker Log
              </Link>
            </div>
          </div>

          {/* Phase 3: FWE Mains */}
          <div className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-widest font-mono bg-purple-50 px-2 py-1 rounded">Stage 03</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">4 Papers</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Final Written Examination (FWE)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Comprehensive 4-Paper final examination including descriptive evaluation for languages and objective testing for technical papers.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Paper I: English (Descriptive Essays & Precis)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Paper II: Telugu / Urdu (Descriptive)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Paper III & IV: 200 Questions Objective</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href={getProtectedHref('/descriptive')}
                className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-colors border border-purple-200 cursor-pointer"
              >
                Submit Descriptive Paper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules according to PRD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Platform Features & Functional Modules</h2>
            <p className="text-xs text-slate-600 mt-1">
              Explore key functional engines outlined in the project requirements specification.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('pwt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pwt'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              1. PWT & FWE Exam Engine
            </button>
            <button
              onClick={() => setActiveTab('pet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pet'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              2. Physical Test (PET) Log
            </button>
            <button
              onClick={() => setActiveTab('fwe')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'fwe'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              3. Descriptive Evaluation
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'daily'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              4. Daily Quizzes & Practice
            </button>
          </div>

          {/* Interactive Feature Display */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {activeTab === 'pwt' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">
                    PRD § 3.2 Exam & Practice Engine
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Real CBT Interface with Bilingual Question Support
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Designed to simulate official government CBT examination centers with question navigation palettes (Answered, Marked for Review, Unvisited), negative marking penalties, and real-time Telugu/English language toggling.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800">State SI Pattern</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">200 Marks / 180 Minutes timer</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800">Pause & Resume</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Practice state persistence</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      <span>Take Sample 200M Mock</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 font-sans text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800">Sample Question Preview</span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">TSLPRB SI 2026</span>
                  </div>
                  <p className="font-semibold text-slate-800">
                    Q1. A train running at 72 km/h crosses a 200m long platform in 25 seconds. What is the length of the train?
                  </p>
                  <p className="text-slate-600 text-[11px] bg-white p-2 rounded border border-slate-200">
                    [తెలుగు] గంటకు 72 కిమీ వేగంతో నడిచే ఒక రైలు 200 మీటర్ల పొడవున్న ప్లాట్‌ఫారమ్‌ను 25 సెకన్లలో దాటుతుంది. ఆ రైలు పొడవు ఎంత?
                  </p>
                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="p-2 rounded bg-white border border-slate-200 text-slate-700">A) 250 metres</div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-300 font-bold text-amber-900">B) 300 metres (Correct)</div>
                    <div className="p-2 rounded bg-white border border-slate-200 text-slate-700">C) 350 metres</div>
                    <div className="p-2 rounded bg-white border border-slate-200 text-slate-700">D) 400 metres</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pet' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
                    PRD § 3.3 Physical Efficiency Test (PET)
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Official Physical Qualification Standard Tracker
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Track your daily ground training logs across all mandatory events. Automatically compares your recorded timings against official TSLPRB & AP Police standards for both male and female candidates.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Men: 1600m Run (7m 15s) • Long Jump (4.00m) • Shot Put 7.26kg (6.00m)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Women: 800m Run (5m 20s) • Long Jump (2.50m) • Shot Put 4.00kg (4.00m)</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/pet-tracker')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      <span>Open PET Tracker</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs">Official Benchmark Comparison</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">1600m Run (Men Standard: 7m 15s)</span>
                        <span className="text-emerald-700 font-bold">6m 45s (QUALIFIED)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">Long Jump (Men Standard: 4.00m)</span>
                        <span className="text-amber-700 font-bold">4.20m (PASSED)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fwe' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded">
                    PRD § 3.2 Descriptive Evaluation Module
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Descriptive Essay & Precis Upload for Paper I & II
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Paper I (English) and Paper II (Telugu/Urdu) require descriptive composition, essay writing, letter drafting, and precis writing. Candidates can type their responses or capture and upload photos of handwritten answer scripts.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/descriptive')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      <span>Submit Descriptive Answers</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-purple-50/60 rounded-2xl p-5 border border-purple-200 space-y-3">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                    <PenTool className="w-4 h-4" />
                    <span>Descriptive Topics Active for Evaluation</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900">Essay (Paper I - English):</span>
                    <p className="text-slate-600 text-[11px]">Role of Community Policing in Modern Cybercrime Prevention (300 words)</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900">Precis Writing (Paper II - Regional):</span>
                    <p className="text-slate-600 text-[11px]">శాంతిభద్రతల పరిరక్షణలో నూతన సాంకేతిక పరిజ్ఞానం వినియోగం</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'daily' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
                    PRD § 3.2 Daily Practice Quizzes
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Targeted Topic-Wise 10-20 Question Quizzes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Build daily discipline with bite-sized quizzes across Arithmetic, Reasoning, Telangana Movement, Indian Constitution, and Modern History. Instant explanations and analytics are generated upon completion.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      <span>Start Daily Practice</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900">Arithmetic & Mensuration</span>
                    <p className="text-[11px] text-slate-500 mt-1">20 Qs • Time & Distance, Ratios</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900">Logical Reasoning</span>
                    <p className="text-[11px] text-slate-500 mt-1">20 Qs • Syllogism, Blood Relations</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900">Telangana Movement</span>
                    <p className="text-[11px] text-slate-500 mt-1">15 Qs • Statehood Formation</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900">Indian Polity & IPC</span>
                    <p className="text-[11px] text-slate-500 mt-1">15 Qs • Fundamental Rights</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* State-wide Mock Leaderboard Preview (PRD 3.4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900">State-Wide Mock Test Rankings</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Live rankings across Telangana (TSLPRB) and Andhra Pradesh (AP Police) scheduled mock tests.
              </p>
            </div>
            <Link
              href={getProtectedHref('/leaderboard')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 font-bold text-xs cursor-pointer"
            >
              <span>View Full Leaderboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">R. Srinivas Reddy</p>
                <p className="text-[11px] text-slate-500">TSLPRB SI • Score: 178/200</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-400 text-white font-black flex items-center justify-center text-sm shadow">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">K. Anitha Lakshmi</p>
                <p className="text-[11px] text-slate-500">AP Police SI • Score: 174/200</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-sm shadow">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">M. Vamshi Krishna</p>
                <p className="text-[11px] text-slate-500">TSLPRB SI • Score: 171/200</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Previous Year Question Papers (PYQ Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900">Official Previous Year Question Papers (PYQ Archives)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Authentic solved question papers from TSLPRB & AP Police recruitment boards with negative marking and timer simulator.
              </p>
            </div>
            <Link
              href={getProtectedHref('/previous-papers')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <span>Explore All PYQ Papers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">TSLPRB SI</span>
                  <span className="text-xs font-mono font-bold text-slate-500">Year 2022</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">TSLPRB SI Prelims 2022 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Complete Bilingual Answer Key</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href={getProtectedHref('/exam/pyq-tslprb-si-2022')}
                  className="w-full block text-center py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
                >
                  Attempt 2022 Paper in CBT
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded uppercase">AP Police SI</span>
                  <span className="text-xs font-mono font-bold text-slate-500">Year 2023</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">AP Police SI Prelims 2023 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Verified Solution Rationale</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href={getProtectedHref('/exam/pyq-appolice-si-2023')}
                  className="w-full block text-center py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 cursor-pointer"
                >
                  Attempt 2023 Paper in CBT
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">TSLPRB SI</span>
                  <span className="text-xs font-mono font-bold text-slate-500">Year 2018</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">TSLPRB SI Prelims 2018 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Historical Question Archive</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href={getProtectedHref('/exam/pyq-tslprb-si-2018')}
                  className="w-full block text-center py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 cursor-pointer"
                >
                  Attempt 2018 Paper in CBT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tier Info (PRD 3.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Preparation Access Tiers</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select between free foundational access or upgrade for complete full-length tests and handwritten descriptive grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Free Aspirant Access</h4>
                <div className="text-2xl font-black text-slate-900 mt-2">₹0 <span className="text-xs text-slate-500 font-normal">/ Free Always</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Daily 10-20 Question Subject Quizzes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PET/PMT Physical Training Log Book</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1 Full-Length PWT Practice Mock</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href={user ? '/dashboard' : '/auth'}
                  className="w-full block text-center py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
                >
                  {user ? 'View In Dashboard' : 'Register Free'}
                </Link>
              </div>
            </div>

            {/* Premium Pro Pass */}
            <div className="p-6 rounded-2xl border-2 border-amber-500 bg-amber-50/30 flex flex-col justify-between relative shadow-sm">
              <span className="absolute top-4 right-4 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Recommended
              </span>
              <div>
                <h4 className="text-base font-bold text-slate-900">Full SI Pro Pass</h4>
                <div className="text-2xl font-black text-amber-700 mt-2">₹999 <span className="text-xs text-slate-600 font-normal">/ 1 Year Full Validity</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>All 25+ Full-Length PWT CBT Grand Mocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Descriptive Paper Evaluation with Faculty Feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>State-wide Live Weekend Rankings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Detailed Paper Explanations in English & Telugu</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href={user ? '/dashboard' : '/auth'}
                  className="w-full block text-center py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
                >
                  {user ? 'Pro Pass Active' : 'Get Premium Pro Pass'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
