'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Activity, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  UserCheck,
  CreditCard,
  Crown,
  PenTool,
  Trophy,
  Archive,
  AlertCircle,
  HelpCircle,
  XCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
  ChevronUp,
  RotateCcw,
  Flag,
  BrainCircuit,
  TrendingUp,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const { user, role } = useAuth();

  // If user is unauthenticated, redirect to login page with callback
  const getProtectedHref = (targetPath: string) => {
    return user ? targetPath : `/auth?redirect=${encodeURIComponent(targetPath)}`;
  };

  // Aspirant Roadmap Interactive State (Inspired by MockNest)
  // Step 0: 01 PREPARE, Step 1: 02 PRACTICE, Step 2: 03 UNDERSTAND, Step 3: 04 SUCCEED
  const [roadmapActiveStep, setRoadmapActiveStep] = useState<number>(1);
  const [sampleMockSelectedOption, setSampleMockSelectedOption] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [liveTimerSeconds, setLiveTimerSeconds] = useState<number>(8076); // 02:14:36

  // Live timer for practice card
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTimerSeconds((prev) => (prev > 0 ? prev - 1 : 8076));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Exam Pattern Board Tab ('TSLPRB' | 'AP_SLPRB')
  const [activeBoardPattern, setActiveBoardPattern] = useState<'TSLPRB' | 'AP_SLPRB'>('TSLPRB');

  // Mock Test Series Filter State (Inspired by MockNest)
  const [testCategoryFilter, setTestCategoryFilter] = useState<'ALL' | 'TSLPRB' | 'AP' | 'FREE' | 'SUBJECT'>('ALL');

  const FEATURED_TESTS = [
    {
      id: 'tslprb-si-pwt-mock-01',
      title: 'TSLPRB SI Preliminary Written Test (PWT) - Full Grand Mock 1',
      titleTelugu: 'తెలంగాణ ఎస్సై ప్రిలిమినరీ రాత పరీక్ష (PWT) - గ్రాండ్ మాక్ టెస్ట్ 1',
      category: 'TSLPRB' as const,
      isFree: true,
      badge: 'FREE MOCK TEST',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      board: 'Telangana Police (TSLPRB)',
      pattern: 'Prelims PWT Full Length',
      questions: 200,
      marks: 200,
      duration: '180 Mins (3 Hrs)',
      negative: '-0.25 Mark',
      medium: 'Bilingual (EN + TE)',
      highlights: [
        'Full 200-question authentic PWT blueprint',
        'Real CBT simulator with palette & countdown timer',
        'Instant State-wide Rank & Accuracy Percentile',
        'Complete bilingual step-by-step solutions',
      ],
      href: '/exam/tslprb-si-pwt-mock-01',
      ctaText: 'Attempt Free Test Now',
    },
    {
      id: 'ap-si-pwt-mock-01',
      title: 'AP Police SI Preliminary Written Test - Grand Mock Test 1',
      titleTelugu: 'ఆంధ్రప్రదేశ్ పోలీస్ ఎస్సై ప్రిలిమినరీ గ్రాండ్ మాక్ టెస్ట్ 1',
      category: 'AP' as const,
      isFree: true,
      badge: 'FREE MOCK TEST',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      board: 'Andhra Pradesh Police (AP SLPRB)',
      pattern: 'Prelims PWT Full Length',
      questions: 200,
      marks: 200,
      duration: '180 Mins (3 Hrs)',
      negative: 'As Per AP SLPRB Rules',
      medium: 'Bilingual (EN + TE)',
      highlights: [
        'AP SLPRB standard Paper I & II combined simulation',
        'Official interface matching AP police recruitment standards',
        'Immediate detailed answer key and explanations',
        'Comparative topic-wise speed analysis',
      ],
      href: '/exam/ap-si-pwt-mock-01',
      ctaText: 'Attempt Free Test Now',
    },
    {
      id: 'pyq-tslprb-si-2022',
      title: 'TSLPRB SI Prelims 2022 Official Solved Paper (Authentic PYQ)',
      titleTelugu: 'తెలంగాణ ఎస్సై ప్రిలిమ్స్ 2022 అధికారిక సాల్వ్డ్ పేపర్',
      category: 'TSLPRB' as const,
      isFree: true,
      badge: 'OFFICIAL PYQ',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      board: 'TSLPRB Rc No. 42 Archive',
      pattern: 'Previous Year Exam Paper',
      questions: 200,
      marks: 200,
      duration: '180 Mins (3 Hrs)',
      negative: '-0.25 Mark',
      medium: 'Bilingual (EN + TE)',
      highlights: [
        'Original questions from 07-Aug-2022 official exam',
        'Official final answer key cross-verified',
        'Benchmark your current score against historical cutoffs',
        'Detailed shortcut methods for Arithmetic questions',
      ],
      href: '/exam/pyq-tslprb-si-2022',
      ctaText: 'Attempt Solved Paper',
    },
    {
      id: 'practice-arithmetic-01',
      title: 'Topic Speed Booster: Arithmetic, Time & Distance (Police Chasing)',
      titleTelugu: 'టాపిక్ స్పీడ్ బూస్టర్: అర్థమెటిక్, సమయం & దూరం (పోలీస్ చేజింగ్)',
      category: 'SUBJECT' as const,
      isFree: true,
      badge: 'SPEED BOOSTER',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      board: 'TSLPRB & AP SLPRB',
      pattern: 'Paper III Sectional Practice',
      questions: 25,
      marks: 25,
      duration: '30 Mins',
      negative: '-0.25 Mark',
      medium: 'Bilingual (EN + TE)',
      highlights: [
        'Special focus on SI core chasing and speed calculations',
        'Instant step-by-step formula explanations',
        'Accuracy and speed benchmarking per question',
        'Perfect for daily morning practice sprints',
      ],
      href: '/exam/practice-arithmetic-01',
      ctaText: 'Start Speed Practice',
    },
    {
      id: 'tslprb-si-pwt-mock-02',
      title: 'TSLPRB SI Preliminary Written Test (PWT) - Full Grand Mock 2',
      titleTelugu: 'తెలంగాణ ఎస్సై ప్రిలిమినరీ రాత పరీక్ష (PWT) - గ్రాండ్ మాక్ టెస్ట్ 2',
      category: 'TSLPRB' as const,
      isFree: false,
      badge: 'SI PRO PASS',
      badgeColor: 'bg-amber-600 text-white border-amber-700',
      board: 'TSLPRB Advanced Series',
      pattern: 'Prelims PWT Advanced Mock',
      questions: 200,
      marks: 200,
      duration: '180 Mins (3 Hrs)',
      negative: '-0.25 Mark',
      medium: 'Bilingual (EN + TE)',
      highlights: [
        'High-difficulty simulated questions aligned with recent trends',
        'Advanced Indian Polity & Telangana Movement sections',
        'All-India and State-level ranking leaderboard',
        'Unlimited re-attempts with error book analysis',
      ],
      href: '/exam/tslprb-si-pwt-mock-02',
      ctaText: 'Unlock with Pro Pass',
    },
  ];

  const filteredFeaturedTests = FEATURED_TESTS.filter((t) => {
    if (testCategoryFilter === 'ALL') return true;
    if (testCategoryFilter === 'TSLPRB') return t.category === 'TSLPRB';
    if (testCategoryFilter === 'AP') return t.category === 'AP';
    if (testCategoryFilter === 'FREE') return t.isFree;
    if (testCategoryFilter === 'SUBJECT') return t.category === 'SUBJECT';
    return true;
  });

  const ROADMAP_STEPS = [
    {
      step: '01 PREPARE',
      title: 'Build your foundation',
      desc: '500+ mock tests and topic drills mapped to authentic TSLPRB & AP SLPRB, TSPSC, Police & SI syllabus patterns. Every late night counts.',
    },
    {
      step: '02 PRACTICE',
      title: "Train like it's exam day",
      desc: 'Full-length 200-question mocks with exact durations (180 mins), negative marking (-0.25) and section-wise timers. No surprises on the real day.',
    },
    {
      step: '03 UNDERSTAND',
      title: 'AI shows you why',
      desc: 'Every question explained with bilingual step-by-step logic and formula shortcuts. Weak areas detected automatically so you study what moves your rank.',
    },
    {
      step: '04 SUCCEED',
      title: 'Walk in with confidence',
      desc: 'Streaks, physical ground PET standards (1600m/800m), and state-wide percentiles that compound into selection day. Join the aspirants who made it.',
    },
  ];

  return (
    <div className="space-y-20 py-4 pb-20 font-sans overflow-x-hidden text-slate-800 dark:text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 text-center">
        
        {/* Urgent Live Exam Alert Ribbon (Inspired by MockNest) */}
        <div className="max-w-4xl mx-auto mb-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-pulse">
              LIVE MOCK SERIES
            </span>
            <span className="text-left font-medium">
              TSLPRB & AP Police SI Prelims Full-Length Free CBT Tests Are Active • Test Your Readiness Today!
            </span>
          </div>
          <Link
            href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
            className="hidden sm:inline-flex items-center gap-1 bg-white text-amber-900 px-3 py-1 rounded-xl text-[11px] font-black uppercase hover:bg-amber-50 transition-colors shrink-0"
          >
            <span>Attempt Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Prominent Independent Platform Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-6 p-3 sm:p-3.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs flex items-center justify-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
          <p className="font-semibold leading-relaxed">
            <strong>Independent Platform Notice:</strong> Independent preparation platform. Not affiliated with, endorsed by, or operated by TSLPRB, AP Police Recruitment Board, or any government agency.
          </p>
        </div>

        {/* Central Logo & Official Heading */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white dark:bg-slate-800 p-2.5 border-2 border-amber-400 dark:border-amber-500 shadow-xl flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Police Sub-Inspector Platform Emblem"
              width={130}
              height={130}
              className="object-contain filter drop-shadow-md"
              priority
              sizes="(max-width: 640px) 112px, 144px"
            />
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Police SI Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">Preparation Platform</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Complete multi-stage exam suite tailored for Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector (Civil, AR, SAR CPL, TSSP) aspirants. Practice high-fidelity timed Computer-Based Tests (CBT), track Physical Efficiency Test (PET) benchmarks, and receive evaluated feedback on descriptive papers.
            </p>
          </div>

          {/* Primary & Secondary Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full max-w-md">
            <Link
              href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
              className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
            >
              <span>Start Free Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={user ? (role === 'ADMIN' ? '/admin' : '/dashboard') : '/auth'}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>{user ? 'My Dashboard' : 'Sign In'}</span>
            </Link>
          </div>

          {/* Platform Performance & Credibility Metrics */}
          <div className="pt-8 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:border-amber-300 transition-all">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black text-xl sm:text-2xl font-mono">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>50,000+</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Questions Solved</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">By TS & AP SI aspirants</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-xl sm:text-2xl font-mono">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>100% CBT</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Real Exam Simulator</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Exact 180 min timer & -0.25 marks</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-black text-xl sm:text-2xl font-mono">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>తెలుగు / EN</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Bilingual Solutions</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Step-by-step formula explanations</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:border-purple-300 transition-all">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-black text-xl sm:text-2xl font-mono">
                <Trophy className="w-5 h-5 text-purple-500" />
                <span>AIR / State</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Instant Rank Analysis</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">State-wide benchmark & percentile</p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. ASPIRANT ROADMAP (Moved Above 'Engineered Specifically' per user req)   */}
      {/* Matches Image 4 (From first mock to final selection) with 4 steps &      */}
      {/* interactive right-hand side preview card.                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-100/80 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-300 dark:border-amber-800">
            Aspirant Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-3 tracking-tight">
            From first mock to final selection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            A proven 4-stage preparation journey designed to transform beginners into commissioned Sub-Inspectors.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Steps, Right Dynamic Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Interactive Subheadings */}
          <div className="lg:col-span-6 space-y-4">
            {ROADMAP_STEPS.map((stepItem, idx) => {
              const isActive = roadmapActiveStep === idx;
              return (
                <div
                  key={stepItem.step}
                  onClick={() => setRoadmapActiveStep(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border-l-4 transition-all cursor-pointer ${
                    isActive
                      ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/30 shadow-md ring-1 ring-amber-200 dark:ring-amber-900/60'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className={`text-[11px] font-black uppercase tracking-widest ${
                    isActive ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {stepItem.step}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-black mt-1.5 transition-colors ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {stepItem.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-2 transition-colors ${
                    isActive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {stepItem.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Card (Sticky on Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative min-h-[420px] flex flex-col justify-between transition-all">
              
              {/* Dynamic Content Switcher Based on Active Step */}
              {roadmapActiveStep === 1 ? (
                /* Step 02: Exact match for Image 4 (Live CBT Mock Interface) */
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      TSLPRB SI Prelims — Full Length Grand Mock
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-mono font-bold text-xs border border-rose-200 dark:border-rose-900/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(liveTimerSeconds)}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      Q 47. The Cabinet Mission Plan was announced in which year?
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      క్యాబినెట్ మిషన్ ప్రణాళిక ఏ సంవత్సరంలో ప్రకటించబడింది?
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { key: 'A' as const, label: 'A. 1942' },
                      { key: 'B' as const, label: 'B. 1946' },
                      { key: 'C' as const, label: 'C. 1947' },
                      { key: 'D' as const, label: 'D. 1945' },
                    ].map((opt) => {
                      const isSelected = sampleMockSelectedOption === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setSampleMockSelectedOption(opt.key)}
                          className={`w-full p-3.5 rounded-2xl border transition-all text-left text-xs sm:text-sm cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold ring-2 ring-indigo-200 dark:ring-indigo-900/50'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Palette Matrix (15 indicator dots matching Image 4) */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      {[...Array(15)].map((_, i) => {
                        let dotColor = 'bg-slate-200 dark:bg-slate-700'; // unvisited
                        if (i < 8) dotColor = 'bg-emerald-500'; // answered
                        if (i === 8) dotColor = 'bg-amber-500 ring-2 ring-amber-300 animate-pulse'; // current
                        return (
                          <span
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`}
                            title={`Question ${i + 1}`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                      Q 47 of 200
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setSampleMockSelectedOption('A')}
                      className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                    >
                      Clear
                    </button>
                    <Link
                      href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-[11px] tracking-wider transition-colors"
                    >
                      Attempt Full Mock Now
                    </Link>
                  </div>
                </div>
              ) : roadmapActiveStep === 0 ? (
                /* Step 01: Foundation Syllabus Blueprint */
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      Foundation Syllabus Blueprint
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] border border-emerald-200 dark:border-emerald-800">
                      TSLPRB & AP SLPRB
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { subject: 'Arithmetic & Mental Ability', qCount: '100 Qs', progress: '88%', color: 'bg-amber-500' },
                      { subject: 'Indian Polity & Constitution', qCount: '40 Qs', progress: '92%', color: 'bg-emerald-500' },
                      { subject: 'Telangana Movement / AP History', qCount: '35 Qs', progress: '85%', color: 'bg-blue-500' },
                      { subject: 'General Science & Tech', qCount: '25 Qs', progress: '78%', color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.subject} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800 dark:text-white">{item.subject}</span>
                          <span className="font-mono text-slate-500">{item.qCount} • {item.progress}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: item.progress }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={getProtectedHref('/previous-papers')}
                      className="w-full block text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold text-xs uppercase tracking-wider"
                    >
                      Browse Complete Question Bank
                    </Link>
                  </div>
                </div>
              ) : roadmapActiveStep === 2 ? (
                /* Step 03: AI Analysis & Solution */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <BrainCircuit className="w-4 h-4 text-purple-600" />
                      <span>AI Smart Analysis & Insight</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Correct: Option B (1946)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
                    <p className="font-bold text-amber-900 dark:text-amber-300">
                      Step-by-Step Historical Breakdown:
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      In March 1946, the British Cabinet Mission arrived in India. Members: Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander. They proposed the Constituent Assembly setup.
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 italic pt-1 border-t border-amber-200/60 dark:border-amber-800/60">
                      [తెలుగు వివరణ]: 1946 మార్చిలో బ్రిటీష్ క్యాబినెట్ మిషన్ భారతదేశానికి వచ్చింది. రాజ్యాంగ పరిషత్ ఏర్పాటు మరియు మధ్యంతర ప్రభుత్వాన్ని సిఫార్సు చేసింది.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-500 uppercase font-mono">Your Response Time</span>
                      <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">38 Seconds</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">Topper Avg: 24s</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-500 uppercase font-mono">Accuracy Rate</span>
                      <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">78.4%</p>
                      <p className="text-[10px] text-purple-600 font-semibold">Polity High-Yield</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/performance')}
                      className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-700 font-bold text-xs uppercase tracking-wider"
                    >
                      View Full Performance Analytics
                    </Link>
                  </div>
                </div>
              ) : (
                /* Step 04: Cadre Selection & Ranks */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-600" />
                      <span>Cadre Selection Readiness</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px]">
                      Projected SI
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-bold">
                      Simulated State-Wide Rank
                    </span>
                    <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                      #142 <span className="text-xs font-normal text-slate-500">/ 48,200 Aspirants</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Top 0.3% Percentile • PWT Projected Cutoff: <strong className="text-emerald-700">+34 Marks</strong>
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">PET 1600m Ground Run:</span>
                      <span className="font-mono font-bold text-emerald-600">07:12 min (QUALIFIED ✓)</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Mains Descriptive Status:</span>
                      <span className="font-mono font-bold text-purple-600">Paper I & II Cleared</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Overall Selection Probability:</span>
                      <span className="font-mono font-bold text-amber-600">94% High Confidence</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={getProtectedHref('/upgrade')}
                      className="w-full block text-center py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Unlock Full Selection Pass
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY BENEFITS (Engineered Specifically for Police SI Aspirants)         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered Specifically for Police SI Aspirants
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Built from the ground up to match official exam notifications, negative marking algorithms, and ground standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black">
              200M
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Full 3-Hour PWT Engine</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Preliminary Written Test (PWT) simulation with full 200 objective questions, 180-minute timer, and official 0.25 negative penalty.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-black">
              PET
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Ground Benchmark Log</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Official Physical Efficiency Test standards tracker: 1600m for men (7m 15s) and 800m for women (5m 20s) with qualifying status.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-black">
              తె/EN
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">True Bilingual CBT</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instant one-click toggle between English and Telugu for questions, options, explanations, and instructions without state resets.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 flex items-center justify-center font-black">
              FWE
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Descriptive Paper Review</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload handwritten answer scripts for Paper I (English) and Paper II (Telugu) evaluated by retired educators within 48–72 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED MOCK TEST SERIES                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/60 rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/90 dark:border-slate-800 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>Curated Test Series 2026</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Recommended Police SI Mock Tests
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Choose from full-length Grand Mocks, official solved PYQ archives, and topic speed boosters.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              {[
                { key: 'ALL' as const, label: 'All Tests' },
                { key: 'TSLPRB' as const, label: 'TSLPRB SI' },
                { key: 'AP' as const, label: 'AP Police SI' },
                { key: 'FREE' as const, label: 'Free Mocks' },
                { key: 'SUBJECT' as const, label: 'Topic Drill' },
              ].map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setTestCategoryFilter(pill.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    testCategoryFilter === pill.key
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {filteredFeaturedTests.map((test) => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${test.badgeColor}`}>
                      {test.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      {test.duration}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 line-clamp-1">
                    {test.titleTelugu}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 grid grid-cols-3 gap-1 text-center text-xs">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-mono">Questions</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{test.questions}</strong>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-mono">Marks</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{test.marks}</strong>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-1.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-mono">Negative</span>
                      <strong className="text-red-600 dark:text-red-400 font-mono text-[11px]">{test.negative}</strong>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                    {test.highlights.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href={getProtectedHref(test.href)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      test.isFree
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900'
                    }`}
                  >
                    <span>{test.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Footer inside Test Series */}
          <div className="relative z-10 mt-10 pt-6 border-t border-amber-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full CBT compliance with official TSLPRB & AP SLPRB negative marking guidelines</span>
            </div>
            <Link
              href={getProtectedHref('/previous-papers')}
              className="text-amber-700 dark:text-amber-400 hover:text-amber-900 font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>Explore All Verified PYQ Papers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXAM PATTERN REFERENCE TABLE                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                Official Board Syllabus Reference Table
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                Police Sub-Inspector Exam Pattern & Marking Scheme
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Structured reference per official state gazette notifications.
              </p>
            </div>

            {/* Board Selection Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveBoardPattern('TSLPRB')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
                  activeBoardPattern === 'TSLPRB'
                    ? 'bg-amber-600 text-white shadow-sm font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Telangana (TSLPRB)
              </button>
              <button
                type="button"
                onClick={() => setActiveBoardPattern('AP_SLPRB')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
                  activeBoardPattern === 'AP_SLPRB'
                    ? 'bg-amber-600 text-white shadow-sm font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Andhra Pradesh (AP SLPRB)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Paper / Subject Name</th>
                  <th className="p-3.5">Question Count</th>
                  <th className="p-3.5">Maximum Marks</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Negative Marking</th>
                  <th className="p-3.5">Medium of Exam</th>
                  <th className="p-3.5">Gazette Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {activeBoardPattern === 'TSLPRB' ? (
                  <>
                    <tr className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20">
                      <td className="p-3.5 font-bold font-mono text-amber-900 dark:text-amber-400">Stage 1 (PWT)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Preliminary Written Test (Arithmetic, Reasoning, GS)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-amber-700 dark:text-amber-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 dark:text-red-400 font-bold">-0.25 (1/4th penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20">
                      <td className="p-3.5 font-bold font-mono text-emerald-800 dark:text-emerald-400">Stage 2 (PET/PMT)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Physical Efficiency Test (1600m Men / 800m Women)</td>
                      <td className="p-3.5 font-mono">1 Run + Long Jump + Shotput</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400">Qualifying Standard</td>
                      <td className="p-3.5 font-mono">On Field Timed</td>
                      <td className="p-3.5 text-slate-500">Nil (Standard cutoff)</td>
                      <td className="p-3.5">On Ground</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-bold font-mono text-purple-900 dark:text-purple-400" rowSpan={4}>Stage 3 (FWE)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper I: English (Descriptive Comprehension & Essay)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Qualifying Standard)</td>
                      <td className="p-3.5">English</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper II: Telugu / Urdu (Descriptive Translation & Essay)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Qualifying Standard)</td>
                      <td className="p-3.5">Telugu / Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper III: Arithmetic & Test of Reasoning (Objective)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 dark:text-red-400 font-bold">-0.25 (1/4th penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper IV: General Studies (Objective CBT)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 dark:text-red-400 font-bold">-0.25 (1/4th penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20">
                      <td className="p-3.5 font-bold font-mono text-blue-900 dark:text-blue-400">Stage 1 (PWT)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper I: Arithmetic & Reasoning • Paper II: General Studies</td>
                      <td className="p-3.5 font-mono">200 Qs (100+100)</td>
                      <td className="p-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours + 3 Hours</td>
                      <td className="p-3.5 text-slate-500">Nil in AP PWT Prelims</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20">
                      <td className="p-3.5 font-bold font-mono text-emerald-800 dark:text-emerald-400">Stage 2 (PET/PMT)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Physical Efficiency Test (1600m Run, 100m Run, Long Jump)</td>
                      <td className="p-3.5 font-mono">3 Mandatory Events</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400">Qualifying Standard</td>
                      <td className="p-3.5 font-mono">On Field Timed</td>
                      <td className="p-3.5 text-slate-500">Nil (Standard cutoff)</td>
                      <td className="p-3.5">On Ground</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-bold font-mono text-purple-900 dark:text-purple-400" rowSpan={4}>Stage 3 (FWE)</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper I: English Descriptive (Qualifying Paper)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Descriptive)</td>
                      <td className="p-3.5">English</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper II: Telugu Descriptive (Qualifying Paper)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Descriptive)</td>
                      <td className="p-3.5">Telugu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper III: Arithmetic & Test of Reasoning (Objective)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Objective standard</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Paper IV: General Studies (Objective CBT)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Objective standard</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PREVIOUS PAPERS (PYQ) SECTION                                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50/60 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/60 border border-amber-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Official Previous Year Question Papers (PYQ Archives)</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Authentic solved papers with verified answer keys, public domain sources, and date metadata.
              </p>
            </div>
            <Link
              href={getProtectedHref('/previous-papers')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer min-h-[44px]"
            >
              <span>Explore All PYQ Papers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Paper 1: TSLPRB 2022 */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 px-2 py-0.5 rounded uppercase font-mono">
                    TSLPRB SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Exam: 07-Aug-2022</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">TSLPRB SI Prelims 2022 Solved Paper</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">200 Questions • 3 Hours • Objective PWT</p>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>TSLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & AR)</p>
                  <p><span className="text-slate-500">Source:</span> Public Domain Archive (Rc No. 42)</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 dark:text-emerald-400 font-bold border-t border-slate-200 dark:border-slate-700">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: Sept 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-tslprb-si-2022')}
                className="w-full block text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2022 Paper in CBT Mode
              </Link>
            </div>

            {/* Paper 2: AP Police 2023 */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 px-2 py-0.5 rounded uppercase font-mono">
                    AP Police SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Exam: 19-Feb-2023</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">AP Police SI Prelims 2023 Solved Paper</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">200 Questions • 3 Hours • Objective PWT</p>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>AP SLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & APSP)</p>
                  <p><span className="text-slate-500">Source:</span> Public Domain Archive (Rc No. 161)</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 dark:text-emerald-400 font-bold border-t border-slate-200 dark:border-slate-700">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: Aug 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-appolice-si-2023')}
                className="w-full block text-center py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2023 Paper in CBT Mode
              </Link>
            </div>

            {/* Paper 3: TSLPRB 2018 */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-purple-900 bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300 px-2 py-0.5 rounded uppercase font-mono">
                    TSLPRB SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Exam: 26-Aug-2018</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">TSLPRB SI Prelims 2018 Solved Paper</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">200 Questions • 3 Hours • Historical Archive</p>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>TSLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & AR)</p>
                  <p><span className="text-slate-500">Source:</span> Official Press Release Gazette</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 dark:text-emerald-400 font-bold border-t border-slate-200 dark:border-slate-700">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: July 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-tslprb-si-2018')}
                className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2018 Paper in CBT Mode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRICING & PRO PLAN TIERS (Updated to 3 Boxes matching /upgrade)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              Police SI Aspirant Preparation Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Start free with daily quizzes or upgrade to unrestricted CBT mocks with evaluated descriptive papers.
            </p>
          </div>

          {/* 3 Pricing Boxes Grid (Free ₹0, Monthly ₹99, 1-Year Pass ₹499) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            
            {/* Tier 1: Free Aspirant Access */}
            <div className="p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 rounded-full uppercase">
                  Free Always
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3">Free Aspirant Access</h4>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-2">
                  ₹0 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ No credit card required</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Basic candidate access & tests</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Daily 10–20 Question Practice Quizzes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>PET 1600m / 800m Physical Training Log</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1 Full-Length PWT Practice Mock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Access to Official PYQ Question Sheets</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                    <span className="line-through">Full 25+ Grand PWT CBT Mocks</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href={user ? '/dashboard' : '/auth'}
                  className="w-full block text-center py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  {user ? 'View In Dashboard' : 'Register Free Account'}
                </Link>
              </div>
            </div>

            {/* Tier 2: SI Pro Monthly Sprint (₹99) */}
            <div className="p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex flex-col justify-between space-y-6 shadow-sm hover:border-amber-400 transition-all">
              <div>
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full uppercase">
                  30-Day Revision Sprint
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3">SI Pro Monthly</h4>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-2">
                  ₹99 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ 30 Days</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  ✓ ₹99 inclusive of 18% GST (Zero hidden fees)
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>All 25+ Full-Length PWT CBT Mocks</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete Verified Solved PYQ Archive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bilingual Telugu & English Explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>State-wide Rank & Accuracy Percentile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Topic-wise Weak Area Diagnostics</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href={getProtectedHref('/upgrade')}
                  className="w-full block text-center py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-300 dark:border-amber-700 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  Choose Monthly (₹99)
                </Link>
              </div>
            </div>

            {/* Tier 3: SI Pro 1-Year Pass (₹499 - RECOMMENDED) */}
            <div className="p-6 rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-between relative shadow-xl space-y-6">
              <span className="absolute top-4 right-4 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                Recommended
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full uppercase">
                    12-Month Pass
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    33% OFF
                  </span>
                </div>
                
                <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3 flex items-center gap-1.5">
                  <Crown className="w-5 h-5 text-amber-600" />
                  <span>SI Pro 1-Year Pass</span>
                </h4>
                
                <div className="mt-2 pb-3 border-b border-amber-200 dark:border-amber-900/60">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-800 dark:text-amber-400 font-mono">
                      ₹499
                    </span>
                    <span className="text-sm font-bold text-slate-400 line-through font-mono">
                      ₹749
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ 1 Full Year</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                    ✓ Inclusive of 18% GST (Total: ₹499.00) • Zero hidden fees
                  </p>
                </div>

                <ul className="mt-4 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Full 12 Months Validity</strong> from activation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All 25+ Full-Length PWT CBT Grand Mocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Descriptive Paper Review (<strong>48–72h Turnaround</strong>)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>State-wide Sunday Simulated Rankings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Personal Error Book & Unlimited Re-attempts</span>
                  </li>
                </ul>

                {/* 7-Day Refund Guarantee */}
                <div className="mt-4 p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/60 text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                  <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>7-Day Money-Back Guarantee</span>
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    100% refund within 7 days if fewer than 2 full-length mocks completed. Zero processing fees.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href={getProtectedHref('/upgrade')}
                  className="w-full block text-center py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  Activate 1-Year Pass (₹499)
                </Link>
                <div className="mt-2 text-center text-[10px] text-slate-400 space-x-2">
                  <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
                  <span>•</span>
                  <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA                                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative shadow-xl overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-amber-200 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider">
              Ready to Earn the Khaki Uniform?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Begin Your Police Sub-Inspector Preparation Today
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl mx-auto leading-relaxed">
              Join thousands of police aspirants across Telangana and Andhra Pradesh preparing with timed CBT mocks, PET logs, and verified previous papers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md min-h-[44px] flex items-center justify-center"
              >
                Attempt Free 200M Mock
              </Link>
              <Link
                href={user ? '/dashboard' : '/auth'}
                className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md min-h-[44px] flex items-center justify-center"
              >
                {user ? 'Go to My Dashboard' : 'Candidate Registration'}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
