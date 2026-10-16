'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Archive, 
  Activity, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Lock,
  X,
  Target,
  Award,
  Clock,
  Sparkles,
  Zap,
  Globe2,
  Users
} from 'lucide-react';

export default function DashboardWireframe() {
  const { user } = useAuth();

  // Redirect to login if user is not authenticated
  const getProtectedHref = (targetPath: string) => {
    return user ? targetPath : `/auth?redirect=${encodeURIComponent(targetPath)}`;
  };

  // Road to Police Officer: Moving arrow sequence state (0: Box 1->2, 1: Box 2->3, 2: Box 3->4, 3: disappears/reset)
  const [movingArrowIndex, setMovingArrowIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMovingArrowIndex((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Pop-up modal state for Key Features & Specifications
  const [popupFeature, setPopupFeature] = useState<'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE' | null>(null);

  // Road to Police Officer: Only 4 clean exam names
  const ROAD_STAGES = [
    {
      id: 1,
      badge: 'STAGE 1',
      name: 'Preliminary Written Test (PWT)',
      shortName: 'Preliminary CBT',
      targetHref: '/exam/tslprb-si-pwt-mock-01',
    },
    {
      id: 2,
      badge: 'STAGE 2',
      name: 'Physical Tests (PMT & PET)',
      shortName: 'Physical Events',
      targetHref: '/pet-tracker',
    },
    {
      id: 3,
      badge: 'STAGE 3',
      name: 'Final Written Exam (Mains)',
      shortName: 'Mains 4-Papers',
      targetHref: '/descriptive',
    },
    {
      id: 4,
      badge: 'STAGE 4',
      name: 'Final Selection & Training',
      shortName: 'Merit Selection',
      targetHref: '/results',
    },
  ];

  // Key Features 4 highlighted points per feature
  const STATS_FEATURES = {
    MOCK_TESTS: {
      name: 'Computer-Based Mock Tests (CBT Simulator)',
      summary: 'High-fidelity test simulation matching official state police preliminary written exam standards.',
      href: '/exam/tslprb-si-pwt-mock-01',
      actionText: 'Launch Mock Test',
      points: [
        {
          id: '01',
          title: 'Full 200-Question Preliminary Blueprint',
          text: 'Comprehensive 3-hour examination covering Arithmetic & Test of Reasoning (100 Questions) and General Studies (100 Questions) matching state gazette standards.',
        },
        {
          id: '02',
          title: 'Official Negative Marking (-0.25 Mark)',
          text: 'Algorithmic penalty calculation matching TSLPRB criteria to train candidates against blind guessing and build precision accuracy.',
        },
        {
          id: '03',
          title: 'Real-Time Bilingual Toggle (English & Telugu)',
          text: 'Switch instantly between English and Telugu for every question, multiple-choice option, and solution without losing saved responses or timer state.',
        },
        {
          id: '04',
          title: 'State-Wide Percentile & Diagnostic Scorecard',
          text: 'Immediate scorecard generation with comparative state percentiles, subject-wise accuracy breakdowns, and speed per question analysis.',
        },
      ],
    },
    PREVIOUS_PAPERS: {
      name: 'Official Previous Year Solved Papers (PYQ Archives)',
      summary: 'Authentic past examination papers with verified final keys and detailed bilingual explanations.',
      href: '/previous-papers',
      actionText: 'Browse Solved Papers',
      points: [
        {
          id: '01',
          title: 'Verified State Gazette Question Sets',
          text: 'Original question papers from TSLPRB 07-Aug-2022, 26-Aug-2018, and AP SLPRB 19-Feb-2023 preliminary written examinations.',
        },
        {
          id: '02',
          title: 'Official Final Answer Key Calibration',
          text: 'Every question solution verified against official board notifications with zero ambiguous or unverified keys.',
        },
        {
          id: '03',
          title: 'Step-by-Step Mathematical Derivations',
          text: 'Detailed formula explanations for time and distance, train chasing, percentages, and reasoning syllogism problems.',
        },
        {
          id: '04',
          title: 'Dual Mode: Interactive CBT or Practice Review',
          text: 'Attempt past papers under strict 180-minute exam conditions or browse question-by-question with immediate solution reveals.',
        },
      ],
    },
    PET_STANDARDS: {
      name: 'Physical Efficiency Test (PET) Ground Standards',
      summary: 'On-ground athletic qualification milestones for Civil and Armed Reserve police cadres.',
      href: '/pet-tracker',
      actionText: 'Open PET Tracker',
      points: [
        {
          id: '01',
          title: '1600 Metres Running Cutoff (Men)',
          text: 'Official qualifying threshold of 7 minutes 15 seconds for male candidates across Telangana and Andhra Pradesh police recruitments.',
        },
        {
          id: '02',
          title: '800 Metres Running Cutoff (Women)',
          text: 'Official qualifying threshold of 5 minutes 20 seconds with timing interval pacing and stamina recommendations.',
        },
        {
          id: '03',
          title: 'Long Jump & Shot Put Qualification',
          text: 'Long jump (3.80m for men, 2.75m for women) and shot put (5.60m for men with 7.26kg, 3.75m for women with 4kg).',
        },
        {
          id: '04',
          title: 'Daily Training Logs & Pace Calculator',
          text: 'Track day-to-day lap times, split paces, and qualification probability to ensure peak fitness before ground call letters.',
        },
      ],
    },
    DESCRIPTIVE: {
      name: 'Mains Descriptive Papers & Evaluation (FWE)',
      summary: 'Curriculum requirements and answer sheet evaluation for Final Written Exam Papers I and II.',
      href: '/descriptive',
      actionText: 'View Descriptive Papers',
      points: [
        {
          id: '01',
          title: 'Paper I: English Descriptive Comprehension',
          text: 'Official 100-mark paper covering precis writing, formal administrative letter drafts, English essay synthesis, and reading comprehension.',
        },
        {
          id: '02',
          title: 'Paper II: Telugu / Urdu Language Paper',
          text: 'Official qualifying paper testing translation from English to Telugu/Urdu, regional essay writing, and language comprehension.',
        },
        {
          id: '03',
          title: 'Handwritten Answer Script Upload Portal',
          text: 'Write answers on lined A4 paper, upload photo or PDF scans, and receive evaluated rubrics within 48–72 hours.',
        },
        {
          id: '04',
          title: 'Faculty Evaluation & Scoring Rubrics',
          text: 'Marking on vocabulary, logical paragraph flow, precis word limit discipline, and presentation by experienced educators.',
        },
      ],
    },
  };

  // Why Choose Us usable informative points
  const WHY_CHOOSE_US_POINTS = [
    {
      icon: Target,
      title: '100% Board Pattern CBT Simulator',
      text: 'Timed 200-question preliminary written tests designed strictly to TSLPRB and AP SLPRB standards with authentic -0.25 negative marking.',
    },
    {
      icon: Globe2,
      title: 'Instant Bilingual Engine (Telugu & English)',
      text: 'Switch effortlessly between English and Telugu for all questions and mathematical derivations without resetting answers or exam time.',
    },
    {
      icon: Activity,
      title: 'Comprehensive Physical (PET) Tracker',
      text: 'Digital pace calculators and split timing monitors calibrated to official 1600m (Men: 7m 15s) and 800m (Women: 5m 20s) qualifying standards.',
    },
    {
      icon: BookOpen,
      title: 'Mains Descriptive Paper Evaluation',
      text: 'Expert rubric evaluation for Paper I English precis & essay writing, and Paper II regional language translation per official state guidelines.',
    },
    {
      icon: Archive,
      title: 'Authentic Solved Previous Papers (PYQ)',
      text: 'Official papers from 2018, 2022, and 2023 with officially gazetted answer keys and step-by-step mathematical reasoning solutions.',
    },
    {
      icon: ShieldCheck,
      title: '256-Bit SSL Encrypted Candidate Portal',
      text: 'Secured candidate authentication, private evaluation records, and end-to-end data encryption matching government portal benchmarks.',
    },
  ];

  const activePopupData = popupFeature ? STATS_FEATURES[popupFeature] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans text-slate-800 dark:text-slate-100 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (One Complete Box Type with Background Design & Security)  */}
      {/* From Image 1: Logo above heading, heading, matter, buttons, single box   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-white to-slate-100/80 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-6 sm:p-10 text-center shadow-sm">
        
        {/* Subtle Background Watermark & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-20 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Top Security & Verified Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] min-[390px]:text-[11px] font-bold tracking-wide shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Secured Candidate Portal • TSLPRB & AP SLPRB</span>
          </div>

          {/* Centered Emblem Logo above Heading */}
          <div className="flex justify-center pt-1">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Police SI Emblem"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Heading from Image 1 */}
          <div className="space-y-2">
            <h1 className="text-2xl min-[390px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Police SI Exam <span className="text-blue-700 dark:text-blue-400">Preparation Platform</span>
            </h1>

            {/* Matter / Description from Image 1 */}
            <p className="text-xs min-[390px]:text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1">
              Complete multi-stage exam suite tailored for Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector (Civil, AR, SAR CPL, TSSP) aspirants. Practice high-fidelity timed Computer-Based Tests (CBT), track Physical Efficiency Test (PET) benchmarks, and receive evaluated feedback on descriptive papers.
            </p>
          </div>

          {/* Action Buttons: Redirect to Auth if not logged in */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
            <Link
              href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Start Free Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={getProtectedHref('/previous-papers')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-300 dark:border-slate-600 transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Archive className="w-4 h-4 text-slate-500" />
              <span>Explore Previous Papers</span>
            </Link>
          </div>

          {/* Security & Cadre Accreditation Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] min-[390px]:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Verified Syllabus</span>
            </span>
            <span>•</span>
            <span>Civil SI</span>
            <span>•</span>
            <span>AR SI</span>
            <span>•</span>
            <span>TSSP SI</span>
            <span>•</span>
            <span className="text-blue-700 dark:text-blue-400 font-semibold">200 Marks Objective CBT</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTIONS (4 Cards: Mock Tests, PYQ, Descriptive, PET)             */}
      {/* Fully Mobile Responsive (360px-390px) & Auth Protected                    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Card 1: Mock Tests */}
        <Link
          href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Mock Tests
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Full 200M CBT simulator with live countdown timer and -0.25 negative marking.
            </p>
          </div>
          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 group-hover:underline">
            Launch Test →
          </span>
        </Link>

        {/* Card 2: Previous Papers */}
        <Link
          href={getProtectedHref('/previous-papers')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Archive className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Previous Papers
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              2018, 2022, and 2023 solved papers with verified final keys and solutions.
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:underline">
            Browse Papers →
          </span>
        </Link>

        {/* Card 3: Descriptive Papers */}
        <Link
          href={getProtectedHref('/descriptive')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Descriptive Papers
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Mains Papers I & II English & Telugu language papers with rubric evaluation.
            </p>
          </div>
          <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 group-hover:underline">
            View Descriptive Papers →
          </span>
        </Link>

        {/* Card 4: PET Standards */}
        <Link
          href={getProtectedHref('/pet-tracker')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              PET Standards
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Official 1600m run (men) and 800m run (women) qualification cutoffs.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
            Track Physicals →
          </span>
        </Link>

      </section>

      {/* ========================================================================= */}
      {/* 3. ROAD TO POLICE OFFICER (Only Names + Moving Connected Sequential Arrow) */}
      {/* Moving Arrow: 1st -> 2nd, 2nd -> 3rd, 3rd -> 4th, then disappears & loop  */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-sm">
        
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            ROAD TO POLICE OFFICER
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Four sequential recruitment stages to clear in order.
          </p>
        </div>

        {/* 4 Connected Boxes with Moving Arrow Indicator */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-2">
          {ROAD_STAGES.map((stg, idx) => {
            // Is this arrow between stage idx and idx + 1 active?
            const isArrowActive = movingArrowIndex === idx;

            return (
              <React.Fragment key={stg.id}>
                {/* Stage Box (Only Names) */}
                <Link
                  href={getProtectedHref(stg.targetHref)}
                  className="w-full lg:flex-1 p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 hover:border-blue-500 shadow-sm text-center flex flex-col items-center justify-center space-y-1.5 transition-all group"
                >
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    {stg.badge}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {stg.name}
                  </h3>
                </Link>

                {/* Connecting Arrow between boxes (Hidden after last box) */}
                {idx < ROAD_STAGES.length - 1 && (
                  <div className="flex items-center justify-center py-1 lg:py-0 lg:px-2 shrink-0">
                    {/* Desktop Horizontal Moving Arrow */}
                    <div className="hidden lg:flex items-center justify-center transition-all duration-300">
                      <ArrowRight 
                        className={`w-6 h-6 transition-all duration-300 ${
                          isArrowActive 
                            ? 'text-blue-700 dark:text-blue-400 scale-125 translate-x-1.5 drop-shadow-sm opacity-100' 
                            : 'text-slate-300 dark:text-slate-700 opacity-40 scale-100'
                        }`} 
                      />
                    </div>

                    {/* Mobile Vertical Moving Arrow (360px - 390px) */}
                    <div className="flex lg:hidden items-center justify-center transition-all duration-300">
                      <ArrowDown 
                        className={`w-5 h-5 transition-all duration-300 ${
                          isArrowActive 
                            ? 'text-blue-700 dark:text-blue-400 scale-125 translate-y-1 drop-shadow-sm opacity-100' 
                            : 'text-slate-300 dark:text-slate-700 opacity-40 scale-100'
                        }`} 
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. KEY FEATURES & SPECIFICATIONS (With Pop-up Modal)                      */}
      {/* Caption removed. Clicking any circle opens the Pop-up Modal.              */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-sm">
        
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Key Features & Specifications
          </h2>
        </div>

        {/* 4 Feature Circles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          
          {/* Circle 1: Mock Tests */}
          <button
            type="button"
            onClick={() => setPopupFeature('MOCK_TESTS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 hover:border-blue-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mock Tests</h3>
              <p className="text-[10px] text-slate-500 font-mono">200 Qs CBT Simulator</p>
            </div>
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 2: Previous Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('PREVIOUS_PAPERS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 hover:border-blue-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Previous Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">2018–2023 Solved PYQ</p>
            </div>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 3: PET Standards */}
          <button
            type="button"
            onClick={() => setPopupFeature('PET_STANDARDS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 hover:border-blue-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">PET Standards</h3>
              <p className="text-[10px] text-slate-500 font-mono">1600m & 800m Cutoffs</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 4: Descriptive Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('DESCRIPTIVE')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 hover:border-blue-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Descriptive Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">Mains Papers I & II</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. WHY CHOOSE US?? (Added below Key Features per Request)                  */}
      {/* Usable high-value information points describing the platform              */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-sm">
        
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] min-[390px]:text-[11px] font-bold uppercase tracking-wider">
            <span>Aspirant Advantage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dedicated preparation ecosystem built strictly around Telangana & AP police recruitment requirements.
          </p>
        </div>

        {/* 6 Informative Feature Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100/70 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* POP-UP MODAL FOR KEY FEATURES (Dialog Window with 4 Points)               */}
      {/* ========================================================================= */}
      {popupFeature && activePopupData && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setPopupFeature(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Feature Specifications & Blueprint
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {activePopupData.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {activePopupData.summary}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPopupFeature(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 4 Points in Highlighted Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
              {activePopupData.points.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-700 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                      {pt.id}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {pt.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPopupFeature(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>

              <Link
                href={getProtectedHref(activePopupData.href)}
                onClick={() => setPopupFeature(null)}
                className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{activePopupData.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
