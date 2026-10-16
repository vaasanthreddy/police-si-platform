'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Archive, 
  Activity, 
  Calendar, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Bell, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  Layers,
  ChevronDown,
  User,
  Info
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Hero carousel slide state (3 visual slides)
  const [heroSlide, setHeroSlide] = useState<number>(0);

  // Stats Section: Selected Feature for the Highlighted 4-Point Box
  // 'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE'
  const [selectedFeature, setSelectedFeature] = useState<'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE'>('MOCK_TESTS');

  // Hero slides data (Solid colors, no gradients)
  const HERO_SLIDES = [
    {
      tag: 'TSLPRB & AP SLPRB SI RECRUITMENT',
      heading: 'Telangana & Andhra Pradesh Police SI Preparation Suite',
      subtitle: 'Complete preparation platform with timed 200-question Computer-Based Tests (CBT), verified syllabus coverage, authentic previous solved papers, and Physical Efficiency Test (PET) tracking.',
      primaryBtnText: 'Start Free Mock Test',
      primaryBtnHref: '/exam/tslprb-si-pwt-mock-01',
      secondaryBtnText: 'Browse Solved Papers',
      secondaryBtnHref: '/previous-papers',
      stage: 'PWT Prelims Stage 1 Active',
    },
    {
      tag: 'OFFICIAL SOLVED ARCHIVES',
      heading: 'Verified Previous Year Question Papers (2018–2023)',
      subtitle: 'Practice authentic questions from TSLPRB 2022, 2018, and AP SLPRB 2023 exams with verified answer keys, detailed bilingual formula derivations, and shortcut arithmetic tricks.',
      primaryBtnText: 'Attempt 2022 Solved Paper',
      primaryBtnHref: '/exam/pyq-tslprb-si-2022',
      secondaryBtnText: 'View All Solved Papers',
      secondaryBtnHref: '/previous-papers',
      stage: 'Authentic Gazette Archives',
    },
    {
      tag: 'ON-GROUND PHYSICAL BENCHMARKS',
      heading: 'Physical Efficiency Test (PET) Milestone Tracker',
      subtitle: 'Log and calibrate daily running timings against official police recruitment cutoffs: 1600m for male candidates (7m 15s) and 800m for female candidates (5m 20s).',
      primaryBtnText: 'Track Running Timings',
      primaryBtnHref: '/pet-tracker',
      secondaryBtnText: 'Check Official Standards',
      secondaryBtnHref: '/pet-tracker',
      stage: 'Mandatory Physical Stage 2',
    },
  ];

  // Feature Points Data for Section 5 (Stats Section: 4 points per feature)
  const FEATURE_DETAILS = {
    MOCK_TESTS: {
      name: 'Computer-Based Mock Tests (CBT Simulator)',
      description: 'High-fidelity examination engine replicating real exam day conditions for Preliminary Written Tests (PWT).',
      href: '/exam/tslprb-si-pwt-mock-01',
      actionText: 'Launch Full Mock Test Now',
      points: [
        {
          num: '01',
          title: 'Full 200-Question Authentic Blueprint',
          text: 'Comprehensive 3-hour examination covering Arithmetic & Test of Reasoning (100 Qs) and General Studies (100 Qs) with exact marks allocation.'
        },
        {
          num: '02',
          title: 'Official Negative Marking (-0.25)',
          text: 'Algorithmic penalty calculation matching official TSLPRB norms to train candidates against indiscriminate guessing.'
        },
        {
          num: '03',
          title: 'Real-Time Bilingual Toggle (EN / TE)',
          text: 'Switch instantly between English and Telugu for questions, answer choices, and explanations without resetting answers or timer.'
        },
        {
          num: '04',
          title: 'State-Wide Percentile & Rank Benchmarking',
          text: 'Immediate scorecard generation with comparative state percentiles, topic-wise accuracy breakdowns, and speed diagnostics.'
        }
      ]
    },
    PREVIOUS_PAPERS: {
      name: 'Official Previous Year Solved Papers (PYQ Archives)',
      description: 'Authentic past examination papers with verified final keys and step-by-step formula explanations.',
      href: '/previous-papers',
      actionText: 'Browse Solved PYQ Repository',
      points: [
        {
          num: '01',
          title: 'Authentic Gazette Sourced Papers',
          text: 'Original question sets from TSLPRB 07-Aug-2022, 26-Aug-2018, and AP SLPRB 19-Feb-2023 preliminary written exams.'
        },
        {
          num: '02',
          title: 'Cross-Verified Final Answer Keys',
          text: 'Every question solution verified against official board notifications with zero ambiguous or unverified answers.'
        },
        {
          num: '03',
          title: 'Step-by-Step Mathematical Shortcuts',
          text: 'Detailed formula explanations for train chasing, time & distance, work equations, and reasoning logic problems.'
        },
        {
          num: '04',
          title: 'Dual Mode: Interactive CBT or Study Mode',
          text: 'Attempt papers under strict exam timer conditions or review question-by-question with immediate solution reveals.'
        }
      ]
    },
    PET_STANDARDS: {
      name: 'Physical Efficiency Test (PET) Ground Standards',
      description: 'Field performance tracker calibrated strictly with official police department qualification benchmarks.',
      href: '/pet-tracker',
      actionText: 'Open PET Ground Tracker',
      points: [
        {
          num: '01',
          title: '1600 Metres Run (Male Aspirants)',
          text: 'Standard qualifying threshold of 7 minutes 15 seconds (TSLPRB & AP SLPRB Civil / AR Sub-Inspector cadre).'
        },
        {
          num: '02',
          title: '800 Metres Run (Female Aspirants)',
          text: 'Official qualifying threshold of 5 minutes 20 seconds with timing interval pacing guidelines.'
        },
        {
          num: '03',
          title: 'Long Jump & Shot Put Events',
          text: 'Long jump (3.80m for men, 2.75m for women) and shot put (5.60m for men with 7.26kg, 3.75m for women with 4kg).'
        },
        {
          num: '04',
          title: 'Daily Training Logs & Pace Calculator',
          text: 'Track day-to-day lap times, split paces, and qualification probability to ensure peak fitness before ground call letters.'
        }
      ]
    },
    DESCRIPTIVE: {
      name: 'Mains Descriptive Papers & Evaluation',
      description: 'Evaluation criteria and answer sheet guidelines for Final Written Exam Paper I (English) and Paper II (Telugu/Urdu).',
      href: '/descriptive',
      actionText: 'View Descriptive Question Sheets',
      points: [
        {
          num: '01',
          title: 'Paper I: English Descriptive Comprehension',
          text: 'Official 100-mark format covering precis writing, formal letter drafting, English essay synthesis, and comprehension.'
        },
        {
          num: '02',
          title: 'Paper II: Telugu / Urdu Language Paper',
          text: 'Official qualifying paper testing translation from English to Telugu/Urdu, regional essay writing, and grammar.'
        },
        {
          num: '03',
          title: 'Handwritten Script Upload Portal',
          text: 'Write answers on lined A4 paper, upload photo scans, and receive evaluated feedback within 48–72 hours.'
        },
        {
          num: '04',
          title: 'Rubric-Based Faculty Scoring',
          text: 'Marking on vocabulary, logical flow, precis word limits, and presentation by experienced state civil educators.'
        }
      ]
    }
  };

  const currentHero = HERO_SLIDES[heroSlide];
  const activeFeatureData = FEATURE_DETAILS[selectedFeature];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-sans text-slate-800 dark:text-slate-100">
      
      {/* User Welcome Notice Bar (Solid styling, no gradients) */}
      {user ? (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Welcome, {user.name}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Roll No: <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{user.rollNumber || 'TS-SI-2026-8841'}</span> • Target: <span className="font-semibold text-amber-800 dark:text-amber-300">{user.targetExam?.replace(/_/g, ' ') || 'TSLPRB SI Civil & AR'}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-[11px] text-slate-700 dark:text-slate-300">
              {user.subscriptionTier === 'PREMIUM' ? 'SI Pro Pass Active' : 'Free Aspirant Plan'}
            </span>
            <Link
              href="/upgrade"
              className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
            >
              {user.subscriptionTier === 'PREMIUM' ? 'Manage Plan' : 'Upgrade Pass'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Viewing Student Preparation Dashboard. Sign in to track test history and state percentile rankings.</span>
          </div>
          <Link
            href="/auth?redirect=/dashboard"
            className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-[11px] uppercase tracking-wider shrink-0"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Wireframe Section 2: Strong heading + CTA + Visuals)     */}
      {/* No gradients, solid colors, clean layout separation                      */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[11px] font-bold uppercase tracking-wider">
                {currentHero.tag}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mt-3">
                {currentHero.heading}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {currentHero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={currentHero.primaryBtnHref}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
              >
                <span>{currentHero.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={currentHero.secondaryBtnHref}
                className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-300 dark:border-slate-700 transition-colors"
              >
                {currentHero.secondaryBtnText}
              </Link>
            </div>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center gap-2 pt-3">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    heroSlide === idx 
                      ? 'w-8 bg-amber-600' 
                      : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Clean Visual Card in Layout Separation */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Official Exam Blueprint
                </span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {currentHero.stage}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Objective Questions:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">200 Questions (PWT)</strong>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Time Allocation:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">180 Mins (3.00 Hours)</strong>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Negative Penalty:</span>
                  <strong className="font-mono text-red-600 dark:text-red-400">-0.25 Mark per wrong answer</strong>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Language Mediums:</span>
                  <strong className="text-slate-900 dark:text-white">Bilingual (English & Telugu)</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/exam/tslprb-si-pwt-mock-01"
                  className="w-full block text-center py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Attempt Live Sample Mock
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. QUICK ACTIONS (Wireframe Section 3: Main Features in 4 Cards)           */}
      {/* Layout separation, solid borders, icons and links                         */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Quick Action Features
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Direct access to candidate testing modules, question archives, and physical standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Mock Tests */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">
                  PWT Simulation
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Mock Tests
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Full 200-question timed Preliminary Written Tests with live countdown timers and official negative marks.
                </p>
              </div>
            </div>

            <Link
              href="/exam/tslprb-si-pwt-mock-01"
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Launch Mock Test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Previous Papers */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                <Archive className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
                  Verified Archives
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Previous Papers
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Official solved papers from 2018, 2022, and 2023 with verified answer keys and shortcut solutions.
                </p>
              </div>
            </div>

            <Link
              href="/previous-papers"
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Browse Solved PYQs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: PET Tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  Ground Standards
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  PET Standards
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Track 1600m run (men: 7m 15s) and 800m run (women: 5m 20s) with official physical qualification thresholds.
                </p>
              </div>
            </div>

            <Link
              href="/pet-tracker"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Track Physicals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Exam Calendar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase">
                  Recruitment Dates
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Exam Calendar
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Upcoming recruitment dates, notification timelines, and alert preferences for TS & AP police exams.
                </p>
              </div>
            </div>

            <Link
              href="/calendar"
              className="text-xs font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Open Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. KEY HIGHLIGHTS (Wireframe Section 4: Exams & Study Materials)          */}
      {/* Information about exams, study materials with layout separation           */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Representation of Study Materials & Syllabus */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Standard Study Material Modules</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Bilingual
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 dark:text-white">Paper III: Arithmetic & Reasoning</strong>
                    <span className="text-[10px] text-slate-500 font-mono">100 Qs / 100 M</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Number systems, percentages, ratios, police chasing, syllogisms, and coding-decoding.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 dark:text-white">Paper IV: General Studies & Polity</strong>
                    <span className="text-[10px] text-slate-500 font-mono">100 Qs / 100 M</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Constitution of India, modern Indian history, state movement, ethics, and general science.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 dark:text-white">Mains Descriptive (English & Telugu)</strong>
                    <span className="text-[10px] text-slate-500 font-mono">200 Marks</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Precis writing, formal administrative letter drafts, comprehension, and translation.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                *Aligned with Telugu Akademi curriculum and official police gazettes.
              </p>
            </div>
          </div>

          {/* Right Column: Information about the Exams & Study Materials */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                Key Academic Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Authentic Exam Information & Structured Study Materials
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our preparation modules are meticulously structured to cover the complete recruitment cycle of Telangana State Level Police Recruitment Board (TSLPRB) and Andhra Pradesh State Level Police Recruitment Board (AP SLPRB) Sub-Inspector cadres.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Full 200-Question Preliminary Blueprints:</strong> Authentic question distributions covering all syllabus micro-topics with zero unverified questions.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Complete Bilingual Materials:</strong> Questions, explanations, formula derivations, and terms available in both English and Telugu.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Physical Test Calibrations:</strong> Exact track cutoffs for 1600m and 800m runs to help you qualify Stage 2 without disqualification risks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Descriptive Evaluation Rubrics:</strong> Scoring models matching official state evaluation boards for Paper I & II.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/previous-papers"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Access Study Materials & PYQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. STATS SECTION: KEY FEATURES WITH INTERACTIVE 4-POINT HIGHLIGHTED BOX    */}
      {/* Wireframe Section 5: Clicking each feature opens its 4 points in a box    */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            Interactive Feature Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
            Key Features of the Preparation Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Click any feature below to inspect its 4 core operational specifications in the highlighted box.
          </p>
        </div>

        {/* Feature Selector Tabs (4 Buttons/Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'MOCK_TESTS' as const, label: 'Mock Tests (CBT)', icon: FileText, count: '25+ Grand Mocks' },
            { key: 'PREVIOUS_PAPERS' as const, label: 'Previous Papers', icon: Archive, count: '2018–2023 Archives' },
            { key: 'PET_STANDARDS' as const, label: 'PET Standards', icon: Activity, count: '1600m / 800m Norms' },
            { key: 'DESCRIPTIVE' as const, label: 'Descriptive Papers', icon: BookOpen, count: 'Paper I & II Rubrics' },
          ].map((tab) => {
            const isSelected = selectedFeature === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFeature(tab.key)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 shadow-md ring-2 ring-amber-300 dark:ring-amber-800'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold leading-tight">
                    {tab.label}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    {tab.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* The Highlighted Box: Shows the 4 Points for the Selected Feature */}
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-600 dark:border-amber-500 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                Active Feature Specifications
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                {activeFeatureData.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeFeatureData.description}
              </p>
            </div>

            <Link
              href={activeFeatureData.href}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>{activeFeatureData.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Points Grid inside the Highlighted Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeFeatureData.points.map((pt) => (
              <div
                key={pt.num}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {pt.num}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {pt.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LATEST UPDATES (Wireframe Section 6: Announcements & Important Notice)  */}
      {/* 2-Column layout: Latest Updates on Left, Important Notice on Right        */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Notices & Recruitment Updates
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified state police recruitment gazette communications and candidate instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Latest Updates (Announcements) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Latest Updates</h3>
                <p className="text-[11px] text-slate-500">Recent examination notifications & materials</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">TSLPRB SI Notification Timeline 2026:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Official announcement expected for Civil, AR, and TSSP wings. Preliminary 200M tests active.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">AP Police SI Prelims Grand Mock 1 Live:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Full-length bilingual test with standard AP SLPRB question patterns released for free practice.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">PET 1600m & 800m Pacing Standards:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Updated pace calculator synced with physical qualification cutoffs for Civil and Armed Reserve posts.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Daily Arithmetic Speed Practice Added:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    New topic tests covering police chasing, time & distance, and number systems available in library.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2: Important Notice */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Important Notice</h3>
                <p className="text-[11px] text-slate-500">Official rules & exam hall compliance</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Negative Marking Algorithm (-0.25):</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    In TSLPRB PWT, each wrong answer incurs a 0.25 mark penalty. Unattempted questions carry zero penalty.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Biometric & Photo ID Verification:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Candidates must carry original Aadhaar card or government identity proof to examination venues.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">PET Physical Measurement Strict Cutoffs:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Minimum height (167.6 cm for men, 152.5 cm for women) is strictly checked before ground run participation.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Independent Platform Notice:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Cross-verify formal notifications and download official hall tickets directly from <span className="font-mono text-amber-700">tslprb.in</span> or <span className="font-mono text-amber-700">slprb.ap.gov.in</span>.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
