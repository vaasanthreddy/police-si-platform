'use client';

import React, { useState } from 'react';
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
  PenTool,
  Trophy,
  Archive,
  AlertCircle,
  HelpCircle,
  XCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
  ChevronUp
} from 'lucide-react';

export default function HomePage() {
  const { user, role } = useAuth();

  // If user is unauthenticated, redirect to login page with callback
  const getProtectedHref = (targetPath: string) => {
    return user ? targetPath : `/auth?redirect=${encodeURIComponent(targetPath)}`;
  };

  // Sample Question Interactive State (Item 13)
  const [selectedSampleOption, setSelectedSampleOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showSampleExplanation, setShowSampleExplanation] = useState(false);
  const [sampleQuestionLang, setSampleQuestionLang] = useState<'EN' | 'TE'>('EN');

  // Exam Pattern Board Tab ('TSLPRB' | 'AP_SLPRB')
  const [activeBoardPattern, setActiveBoardPattern] = useState<'TSLPRB' | 'AP_SLPRB'>('TSLPRB');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

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

  return (
    <div className="space-y-20 py-4 pb-20 font-sans overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Item 1 & Item 2)                                         */}
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

        {/* Prominent Independent Platform Disclaimer Banner (Item 1 & P0) */}
        <div className="max-w-4xl mx-auto mb-6 p-3 sm:p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs flex items-center justify-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <p className="font-semibold leading-relaxed">
            <strong>Independent Platform Notice:</strong> Independent preparation platform. Not affiliated with, endorsed by, or operated by TSLPRB, AP Police Recruitment Board, or any government agency.
          </p>
        </div>

        {/* Central Logo & Official Heading */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-2.5 border-2 border-amber-400 shadow-xl flex items-center justify-center">
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Police SI Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">Preparation Platform</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Complete multi-stage exam suite tailored for Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector (Civil, AR, SAR CPL, TSSP) aspirants. Practice high-fidelity timed Computer-Based Tests (CBT), track Physical Efficiency Test (PET) benchmarks, and receive evaluated feedback on descriptive papers.
            </p>
          </div>

          {/* Primary & Secondary Hero CTAs strictly as specified in Item 2 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full max-w-md">
            {/* Primary Filled CTA Button */}
            <Link
              href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
              className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
            >
              <span>Start Free Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Action Button */}
            <Link
              href={user ? (role === 'ADMIN' ? '/admin' : '/dashboard') : '/auth'}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>{user ? 'My Dashboard' : 'Sign In'}</span>
            </Link>
          </div>

          {/* Platform Performance & Credibility Metrics (Inspired by MockNest) */}
          <div className="pt-8 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-amber-300 transition-all">
              <div className="flex items-center gap-2 text-amber-700 font-black text-xl sm:text-2xl font-mono">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>50,000+</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Questions Solved</p>
              <p className="text-[10px] text-slate-500">By TS & AP SI aspirants</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xl sm:text-2xl font-mono">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>100% CBT</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Real Exam Simulator</p>
              <p className="text-[10px] text-slate-500">Exact 180 min timer & -0.25 marks</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 text-blue-700 font-black text-xl sm:text-2xl font-mono">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>తెలుగు / EN</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Bilingual Solutions</p>
              <p className="text-[10px] text-slate-500">Step-by-step formula explanations</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-purple-300 transition-all">
              <div className="flex items-center gap-2 text-purple-700 font-black text-xl sm:text-2xl font-mono">
                <Trophy className="w-5 h-5 text-purple-500" />
                <span>AIR / State</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Instant Rank Analysis</p>
              <p className="text-[10px] text-slate-500">State-wide benchmark & percentile</p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. KEY BENEFITS (Item 12: Order Step 2)                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Engineered Specifically for Police SI Aspirants
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Built from the ground up to match the official exam notifications, negative marking algorithms, and ground standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 hover:border-amber-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black">
              200M
            </div>
            <h3 className="text-base font-bold text-slate-900">Full 3-Hour PWT Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Preliminary Written Test (PWT) simulation with full 200 objective questions, 180-minute timer, and official 0.25 negative penalty.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-emerald-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-black">
              PET
            </div>
            <h3 className="text-base font-bold text-slate-900">Ground Benchmark Log</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official Physical Efficiency Test standards tracker: 1600m for men (7m 15s) and 800m for women (5m 20s) with qualifying status.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-black">
              తె/EN
            </div>
            <h3 className="text-base font-bold text-slate-900">True Bilingual CBT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant one-click toggle between English and Telugu for questions, options, explanations, and instructions without state resets.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-purple-400 p-6 rounded-3xl shadow-sm transition-all space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-black">
              FWE
            </div>
            <h3 className="text-base font-bold text-slate-900">Descriptive Paper Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload handwritten answer scripts for Paper I (English) and Paper II (Telugu) evaluated by retired educators within 48–72 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED MOCK TEST SERIES (In Our Warm Professional Theme)                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/90 text-slate-800 relative overflow-hidden">
          
          {/* Section Heading & Category Filter Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>State Police Exam Series</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
                Featured CBT Mock Tests & Live Test Series
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
                Real-time timed Computer-Based Tests with official negative marking (-0.25), bilingual question papers, and instant state-level rank predictions.
              </p>
            </div>

            {/* Category Filter Pills (In Our Theme) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setTestCategoryFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  testCategoryFilter === 'ALL'
                    ? 'bg-amber-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                All Tests
              </button>
              <button
                type="button"
                onClick={() => setTestCategoryFilter('TSLPRB')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  testCategoryFilter === 'TSLPRB'
                    ? 'bg-amber-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                TSLPRB SI
              </button>
              <button
                type="button"
                onClick={() => setTestCategoryFilter('AP')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  testCategoryFilter === 'AP'
                    ? 'bg-amber-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                AP Police SI
              </button>
              <button
                type="button"
                onClick={() => setTestCategoryFilter('FREE')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  testCategoryFilter === 'FREE'
                    ? 'bg-emerald-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                Free Mocks
              </button>
              <button
                type="button"
                onClick={() => setTestCategoryFilter('SUBJECT')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  testCategoryFilter === 'SUBJECT'
                    ? 'bg-purple-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                Speed Practice
              </button>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredFeaturedTests.map((test) => (
              <div
                key={test.id}
                className="bg-white hover:bg-amber-50/20 border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-5 shadow-sm group animate-slide-up"
              >
                <div className="space-y-4">
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${test.badgeColor}`}>
                      {test.badge}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {test.board}
                    </span>
                  </div>

                  {/* Title & Pattern */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium italic mt-1">
                      {test.titleTelugu}
                    </p>
                  </div>

                  {/* Test Specs Grid (4 chips) */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-1.5 text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{test.questions} Questions</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-1.5 text-slate-700">
                      <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{test.marks} Marks ({test.negative})</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-1.5 text-slate-700">
                      <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{test.medium}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    {test.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-2">
                  <Link
                    href={getProtectedHref(test.href)}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md min-h-[44px] cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <span>{test.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Footer inside Test Series */}
          <div className="relative z-10 mt-10 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full CBT compliance with official TSLPRB & AP SLPRB negative marking guidelines</span>
            </div>
            <Link
              href={getProtectedHref('/previous-papers')}
              className="text-amber-700 hover:text-amber-900 font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>Explore All Verified PYQ Papers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SAMPLE QUESTION BLOCK (Item 13 & Item 12)                              */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Interactive CBT Sample Question
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Arithmetic & Reasoning (PWT Paper III Standard)
              </h3>
            </div>

            {/* Language Switcher for Sample Question */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSampleQuestionLang('EN')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  sampleQuestionLang === 'EN' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSampleQuestionLang('TE')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  sampleQuestionLang === 'TE' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {sampleQuestionLang === 'EN' ? (
                'Q. A train running at 72 km/h crosses a 200-metre long platform in 25 seconds. What is the length of the train?'
              ) : (
                'ప్ర. గంటకు 72 కి.మీ వేగంతో ప్రయాణిస్తున్న ఒక రైలు 200 మీటర్ల పొడవున్న ప్లాట్‌ఫారమ్‌ను 25 సెకన్లలో దాటుతుంది. ఆ రైలు పొడవు ఎంత?'
              )}
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Marking: +1.00 Mark for Correct • -0.25 Mark for Incorrect Choice
            </p>
          </div>

          {/* Interactive Multiple Choice Options with Checkmark & Cross Status Badges */}
          <div className="space-y-2.5">
            {[
              { key: 'A' as const, text: '250 metres', textTe: '250 మీటర్లు' },
              { key: 'B' as const, text: '300 metres', textTe: '300 మీటర్లు' },
              { key: 'C' as const, text: '350 metres', textTe: '350 మీటర్లు' },
              { key: 'D' as const, text: '400 metres', textTe: '400 మీటర్లు' },
            ].map((opt) => {
              const isSelected = selectedSampleOption === opt.key;
              const isCorrect = opt.key === 'B';

              let borderStyle = 'border-slate-200 hover:border-slate-300 bg-slate-50/60';
              if (isSelected) {
                borderStyle = isCorrect 
                  ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold'
                  : 'border-red-400 bg-red-50/60 text-red-950 font-bold';
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedSampleOption(opt.key)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left text-xs sm:text-sm cursor-pointer ${borderStyle} focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-mono font-bold text-slate-700 flex items-center justify-center text-xs shrink-0">
                      {opt.key}
                    </span>
                    <span>{sampleQuestionLang === 'EN' ? opt.text : opt.textTe}</span>
                  </div>

                  {/* Status Badges with Dual Icon + Text (Item 13) */}
                  {isSelected && (
                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct Choice (+1.00)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs shadow-sm">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect Choice (-0.25)</span>
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Toggleable Collapsible View Explanation Button (Item 13) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowSampleExplanation(!showSampleExplanation)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200 cursor-pointer min-h-[44px]"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{showSampleExplanation ? 'Hide Detailed Solution' : 'View Detailed Explanation & Formula'}</span>
              {showSampleExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSampleExplanation && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct Option: B (300 metres)</span>
                </div>
                <div className="space-y-1.5 leading-relaxed text-slate-700">
                  <p><strong>Step 1: Convert Speed into m/s:</strong></p>
                  <p className="font-mono bg-white p-2 rounded-xl border border-amber-200 inline-block">
                    Speed = 72 × (5/18) = 20 m/s
                  </p>
                  <p><strong>Step 2: Total Distance Traveled in 25 seconds:</strong></p>
                  <p className="font-mono bg-white p-2 rounded-xl border border-amber-200 inline-block">
                    Total Distance = Speed × Time = 20 m/s × 25 s = 500 metres
                  </p>
                  <p><strong>Step 3: Calculate Length of the Train:</strong></p>
                  <p className="font-mono bg-white p-2 rounded-xl border border-amber-200 inline-block">
                    Length of Train = Total Distance - Length of Platform = 500m - 200m = 300 metres.
                  </p>
                  <p className="text-slate-600 pt-1 text-[11px] italic">
                    [తెలుగు వివరణ]: వేగాన్ని m/s లోకి మార్చగా: 72 × 5/18 = 20 m/s. 25 సెకన్లలో ప్రయాణించిన మొత్తం దూరం = 20 × 25 = 500 మీటర్లు. రైలు పొడవు = 500 - 200 = 300 మీటర్లు.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS (Item 12: Order Step 4)                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Aspirant Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            How The Preparation Engine Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Systematic four-stage preparation path aligned with TSLPRB & AP SLPRB selection criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-3xl relative space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Step 01
            </span>
            <h3 className="text-base font-bold text-slate-900">Attempt Preliminary CBT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take timed 200-mark Preliminary Written Tests (PWT) in simulated exam conditions with auto-saved progress.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl relative space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Step 02
            </span>
            <h3 className="text-base font-bold text-slate-900">Log Physical Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track daily running times (1600m/800m) and jumps against official police qualification cut-offs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl relative space-y-3">
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Step 03
            </span>
            <h3 className="text-base font-bold text-slate-900">Submit Descriptive Papers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload handwritten answer scripts for Paper I & II and receive scoring rubrics within 48–72 hours.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl relative space-y-3">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Step 04
            </span>
            <h3 className="text-base font-bold text-slate-900">Analyze State Percentiles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review topic accuracy, speed breakdowns, and simulated Sunday rankings across Telangana and Andhra Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXAM PATTERN REFERENCE TABLE (Item 6 & Item 12)                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Official Board Syllabus Reference Table (Item 6)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Police Sub-Inspector Exam Pattern & Marking Scheme
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Structured reference per official state gazette notifications.
              </p>
            </div>

            {/* Board Selection Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveBoardPattern('TSLPRB')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
                  activeBoardPattern === 'TSLPRB'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Telangana (TSLPRB)
              </button>
              <button
                type="button"
                onClick={() => setActiveBoardPattern('AP_SLPRB')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
                  activeBoardPattern === 'AP_SLPRB'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Andhra Pradesh (AP SLPRB)
              </button>
            </div>
          </div>

          {/* Reference Notification Banner */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs flex items-center justify-between font-mono">
            <div>
              <span className="text-slate-500">Official Notification: </span>
              <strong className="text-slate-900">
                {activeBoardPattern === 'TSLPRB'
                  ? 'TSLPRB Rc No. 42/Rect./Admn-1/2022'
                  : 'AP SLPRB Rc No. 161/R&T/Rect.2/2022'}
              </strong>
            </div>
            <div className="text-slate-500">
              Cadres: Sub-Inspector (Civil, AR, SAR CPL, TSSP / APSP)
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Paper Name</th>
                  <th className="p-3.5">Questions</th>
                  <th className="p-3.5">Marks</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Negative Marking</th>
                  <th className="p-3.5">Medium / Language</th>
                  <th className="p-3.5">Notification Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {activeBoardPattern === 'TSLPRB' ? (
                  <>
                    <tr className="hover:bg-amber-50/40">
                      <td className="p-3.5 font-bold font-mono text-amber-900">Stage 1 (PWT)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Preliminary Written Test (Arithmetic, Reasoning & GS)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-amber-700">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 font-bold">-0.25 (1/4th mark penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/40">
                      <td className="p-3.5 font-bold font-mono text-emerald-800">Stage 2 (PET/PMT)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Physical Efficiency & Measurement Test (1600m / 800m)</td>
                      <td className="p-3.5 font-mono">3 Track Events</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">Qualifying / 105M (AR)</td>
                      <td className="p-3.5 font-mono">On Field Timed</td>
                      <td className="p-3.5 text-slate-500">Nil (Disqualification on time)</td>
                      <td className="p-3.5">On Ground</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-bold font-mono text-purple-900" rowSpan={4}>Stage 3 (FWE)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Paper I: English (Descriptive Composition & Precis)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Qualifying Standard)</td>
                      <td className="p-3.5">English</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper II: Telugu / Urdu (Descriptive Translation & Essay)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Qualifying Standard)</td>
                      <td className="p-3.5">Telugu / Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper III: Arithmetic & Test of Reasoning (Objective)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 font-bold">-0.25 (1/4th penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper IV: General Studies (Objective CBT)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-red-700 font-bold">-0.25 (1/4th penalty)</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">25-Apr-2022</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-blue-50/40">
                      <td className="p-3.5 font-bold font-mono text-blue-900">Stage 1 (PWT)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Paper I: Arithmetic & Reasoning • Paper II: General Studies</td>
                      <td className="p-3.5 font-mono">200 Qs (100+100)</td>
                      <td className="p-3.5 font-mono font-bold text-blue-700">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours + 3 Hours</td>
                      <td className="p-3.5 text-slate-500">Nil in AP PWT Prelims</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/40">
                      <td className="p-3.5 font-bold font-mono text-emerald-800">Stage 2 (PET/PMT)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Physical Efficiency Test (1600m Run, 100m Run, Long Jump)</td>
                      <td className="p-3.5 font-mono">3 Mandatory Events</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">Qualifying Standard</td>
                      <td className="p-3.5 font-mono">On Field Timed</td>
                      <td className="p-3.5 text-slate-500">Nil (Standard cutoff)</td>
                      <td className="p-3.5">On Ground</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-bold font-mono text-purple-900" rowSpan={4}>Stage 3 (FWE)</td>
                      <td className="p-3.5 font-semibold text-slate-900">Paper I: English Descriptive (Qualifying Paper)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Descriptive)</td>
                      <td className="p-3.5">English</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper II: Telugu Descriptive (Qualifying Paper)</td>
                      <td className="p-3.5 font-mono">Descriptive</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">100 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Nil (Descriptive)</td>
                      <td className="p-3.5">Telugu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper III: Arithmetic & Test of Reasoning (Objective)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">200 Marks</td>
                      <td className="p-3.5 font-mono">3 Hours (180 mins)</td>
                      <td className="p-3.5 text-slate-500">Objective standard</td>
                      <td className="p-3.5">English, Telugu, Urdu</td>
                      <td className="p-3.5 font-mono text-slate-500">28-Nov-2022</td>
                    </tr>
                    <tr className="hover:bg-purple-50/40">
                      <td className="p-3.5 font-semibold text-slate-900">Paper IV: General Studies (Objective CBT)</td>
                      <td className="p-3.5 font-mono">200 Qs</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">200 Marks</td>
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
      {/* 6. PREVIOUS PAPERS (PYQ) SECTION (Item 5 & Item 12)                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50/60 via-white to-amber-50/40 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-amber-700" />
                <h3 className="text-xl font-black text-slate-900">Official Previous Year Question Papers (PYQ Archives)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
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
            <div className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase font-mono">
                    TSLPRB SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">Exam: 07-Aug-2022</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">TSLPRB SI Prelims 2022 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Objective PWT</p>

                {/* Explicit Source & Verification Metadata (Item 5) */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>TSLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & AR)</p>
                  <p><span className="text-slate-500">Source:</span> Public Domain Archive (Rc No. 42)</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 font-bold border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: Sept 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-tslprb-si-2022')}
                className="w-full block text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2022 Paper in CBT Mode
              </Link>
            </div>

            {/* Paper 2: AP Police 2023 */}
            <div className="bg-white border border-slate-200 hover:border-blue-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase font-mono">
                    AP Police SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">Exam: 19-Feb-2023</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">AP Police SI Prelims 2023 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Objective PWT</p>

                {/* Explicit Source & Verification Metadata (Item 5) */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>AP SLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & APSP)</p>
                  <p><span className="text-slate-500">Source:</span> Public Domain Archive (Rc No. 161)</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 font-bold border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: Aug 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-appolice-si-2023')}
                className="w-full block text-center py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2023 Paper in CBT Mode
              </Link>
            </div>

            {/* Paper 3: TSLPRB 2018 */}
            <div className="bg-white border border-slate-200 hover:border-purple-400 p-5 rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded uppercase font-mono">
                    TSLPRB SI
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">Exam: 26-Aug-2018</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">TSLPRB SI Prelims 2018 Solved Paper</h4>
                <p className="text-xs text-slate-500 mt-1">200 Questions • 3 Hours • Historical Archive</p>

                {/* Explicit Source & Verification Metadata (Item 5) */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                  <p><span className="text-slate-500">Board:</span> <strong>TSLPRB</strong></p>
                  <p><span className="text-slate-500">Post:</span> Sub-Inspector (Civil & AR)</p>
                  <p><span className="text-slate-500">Source:</span> Official Press Release Gazette</p>
                  <div className="pt-1 flex items-center justify-between text-emerald-800 font-bold border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Key
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ver: July 2024</span>
                  </div>
                </div>
              </div>

              <Link
                href={getProtectedHref('/exam/pyq-tslprb-si-2018')}
                className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Attempt 2018 Paper in CBT Mode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRICING & PRO PLAN CARD (Item 7 & Item 12)                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Transparent Pricing (Item 7)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Police SI Aspirant Preparation Tiers
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Start with free daily quizzes or upgrade to the full 12-month Pro Pass.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full uppercase">
                  Free Always
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-3">Free Aspirant Access</h4>
                <div className="text-3xl font-black text-slate-900 font-mono mt-2">
                  ₹0 <span className="text-xs text-slate-500 font-normal">/ No credit card required</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
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
                </ul>
              </div>

              <div>
                <Link
                  href={user ? '/dashboard' : '/auth'}
                  className="w-full block text-center py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  {user ? 'View In Dashboard' : 'Register Free Account'}
                </Link>
              </div>
            </div>

            {/* Premium Pro Pass (Item 7 Requirements) */}
            <div className="p-6 rounded-3xl border-2 border-amber-500 bg-amber-50/40 flex flex-col justify-between relative shadow-md space-y-6">
              <span className="absolute top-4 right-4 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Recommended
              </span>

              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                  12-Month Validity
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-3">Full SI Pro Pass 2026</h4>
                
                <div className="mt-2 pb-3 border-b border-amber-200">
                  <div className="text-3xl font-black text-amber-800 font-mono">
                    ₹999 <span className="text-xs text-slate-600 font-normal">/ Full 12-Month Access</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ✓ ₹999 inclusive of 18% GST (No hidden fees)
                  </p>
                </div>

                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Full 12 Months Validity</strong> from registration</span>
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
                    <span>Detailed Bilingual Explanations in Telugu & English</span>
                  </li>
                </ul>

                {/* 7-Day Refund Guarantee (Item 7) */}
                <div className="mt-4 p-3 rounded-2xl bg-white border border-amber-200 text-[11px] text-slate-700 space-y-0.5">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>7-Day Money-Back Guarantee</span>
                  </span>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    100% refund within 7 days if fewer than 2 full-length mocks completed. Zero processing deduction.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href={user ? '/upgrade' : '/auth'}
                  className="w-full block text-center py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  {user ? 'Activate Pro Pass' : 'Get Full SI Pro Pass'}
                </Link>
                <div className="mt-2 text-center text-[10px] text-slate-400 space-x-2">
                  <Link href="/terms" className="underline hover:text-slate-600">Terms of Service</Link>
                  <span>•</span>
                  <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ & ACRONYM GLOSSARY (Item 14 & Item 12)                             */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Exam Acronyms & FAQ (Item 14)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Glossary of State Police Recruitment Terms
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Definitions of all official recruitment exam acronyms and frequently asked questions.
            </p>
          </div>

          {/* Acronyms Callout Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-mono font-bold text-amber-800 text-sm">PWT</span>
              <p className="font-bold text-slate-900">Preliminary Written Test</p>
              <p className="text-[11px] text-slate-500">
                The objective first-stage screening exam consisting of 200 questions (Arithmetic, Reasoning, and General Studies) for 200 marks.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-mono font-bold text-emerald-800 text-sm">PET</span>
              <p className="font-bold text-slate-900">Physical Efficiency Test</p>
              <p className="text-[11px] text-slate-500">
                The on-ground athletic qualification stage featuring the 1600m run (men), 800m run (women), long jump, and shot put events.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-mono font-bold text-blue-800 text-sm">PMT</span>
              <p className="font-bold text-slate-900">Physical Measurement Test</p>
              <p className="text-[11px] text-slate-500">
                Standardized physical verification verifying minimum height (167.6 cm for men, 152.5 cm for women) and chest expansion criteria.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-mono font-bold text-purple-800 text-sm">FWE</span>
              <p className="font-bold text-slate-900">Final Written Examination</p>
              <p className="text-[11px] text-slate-500">
                The comprehensive 4-Paper final mains examination including Paper I (English descriptive), Paper II (Telugu/Urdu descriptive), and Papers III & IV (Objective).
              </p>
            </div>
          </div>

          {/* Collapsible FAQ List */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            {[
              {
                q: 'What is the negative marking penalty in TSLPRB and AP Police SI exams?',
                a: 'In TSLPRB SI Preliminary Written Test (PWT) and Final Written Exam objective papers, each incorrect choice incurs a penalty of 0.25 marks (1/4th penalty). In AP Police preliminary exams, there is currently no negative marking unless explicitly notified in the gazette. Our simulator matches each board accordingly.'
              },
              {
                q: 'Can I practice the mock test in both Telugu and English?',
                a: 'Yes. Our CBT test engine features a real-time bilingual toggle allowing you to switch questions and options between English and Telugu instantly without losing timer state or unselecting your answer.'
              },
              {
                q: 'How does descriptive paper grading work for Paper I and Paper II?',
                a: 'Candidates can write their essays, precis, and letters on paper, photograph their handwritten scripts, and upload them via the Descriptive portal. Senior evaluators grade your script based on official rubrics within 48 to 72 hours.'
              },
              {
                q: 'What is the refund policy for the SI Pro Pass?',
                a: 'We offer an unconditional 7-day money-back guarantee. If you are not satisfied within 7 calendar days of subscription and have attempted fewer than 2 full-length mocks, simply email support@police-si-prep.in for a 100% refund.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CTA (Item 12: Order Step 9)                                      */}
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
