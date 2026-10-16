'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  Star,
  X,
  Target,
  Globe2,
  Clock,
  Sparkles,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';

export default function DashboardWireframe() {
  const { user } = useAuth();

  // Redirect to login if user is not authenticated
  const getProtectedHref = (targetPath: string) => {
    return user ? targetPath : `/auth?redirect=${encodeURIComponent(targetPath)}`;
  };

  // Road to Police Officer (from Image 2): Active stage (0, 1, 2, 3)
  const [activeStage, setActiveStage] = useState<number>(0);
  const roadSectionRef = useRef<HTMLDivElement>(null);

  // Auto-advance or scroll-detect the Road to Police Officer active stage
  useEffect(() => {
    const handleScroll = () => {
      if (!roadSectionRef.current) return;
      const rect = roadSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the road section is in viewport, calculate scroll progress
      if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
        const totalHeight = rect.height;
        const currentProgress = (windowHeight * 0.6 - rect.top) / totalHeight;
        const clampedProgress = Math.max(0, Math.min(1, currentProgress));
        
        if (clampedProgress < 0.25) setActiveStage(0);
        else if (clampedProgress < 0.5) setActiveStage(1);
        else if (clampedProgress < 0.75) setActiveStage(2);
        else setActiveStage(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pop-up modal state for Key Features & Specifications
  const [popupFeature, setPopupFeature] = useState<'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE' | null>(null);

  // Road to Police Officer: 4 Stages from Image 2
  const ROAD_STAGES = [
    {
      id: 0,
      stepCode: '01 PRELIMS',
      title: 'Preliminary Written Test (PWT)',
      summary: '200-question objective screening test covering Arithmetic, Reasoning, and General Studies with official negative marking.',
      detailCard: {
        badge: 'STAGE 1 • PRELIMINARY TEST',
        heading: 'PWT Computer-Based Simulator',
        examDuration: '3 Hours (180 Minutes)',
        questionsCount: '200 Objective Questions',
        scoring: '200 Marks (-0.25 Negative Marking)',
        keyPoints: [
          'Arithmetic & Test of Reasoning (100 Questions)',
          'General Studies & Indian Polity (100 Questions)',
          'Bilingual English & Telugu Toggle Engine',
          'Instant Percentile & Speed Analysis Scorecard',
        ],
        ctaText: 'Attempt Preliminary Mock',
        ctaHref: '/exam/tslprb-si-pwt-mock-01',
      },
    },
    {
      id: 1,
      stepCode: '02 PHYSICAL',
      title: 'Physical Measurement & Efficiency (PMT & PET)',
      summary: 'Ground qualification benchmarks for height, chest, 1600m/800m running times, shot put, and long jump.',
      detailCard: {
        badge: 'STAGE 2 • PHYSICAL STANDARDS',
        heading: 'PET Ground Qualification Tracker',
        examDuration: 'Field Ground Evaluation',
        questionsCount: 'Official Police Cutoffs',
        scoring: 'Mandatory Qualifying Stage',
        keyPoints: [
          '1600 Metres Run (Men: 7 Minutes 15 Seconds)',
          '800 Metres Run (Women: 5 Minutes 20 Seconds)',
          'Long Jump: 3.80m for Men / 2.75m for Women',
          'Shot Put: 5.60m (7.26kg Men) / 3.75m (4kg Women)',
        ],
        ctaText: 'Track Physical Timings',
        ctaHref: '/pet-tracker',
      },
    },
    {
      id: 2,
      stepCode: '03 MAINS',
      title: 'Final Written Examination (FWE - 4 Papers)',
      summary: 'Comprehensive 4-paper Mains examination including descriptive language tests and objective papers.',
      detailCard: {
        badge: 'STAGE 3 • MAINS EXAMINATION',
        heading: 'Final Written Exam Suite (400 Marks)',
        examDuration: '4 Written Papers',
        questionsCount: 'Descriptive & Objective',
        scoring: '400 Total Selection Marks',
        keyPoints: [
          'Paper I: English Descriptive (Precis, Letter & Essay)',
          'Paper II: Telugu / Urdu Language Qualifying Paper',
          'Paper III: Arithmetic & Reasoning (100 Questions)',
          'Paper IV: General Studies & Constitution (100 Questions)',
        ],
        ctaText: 'View Mains Descriptive Papers',
        ctaHref: '/descriptive',
      },
    },
    {
      id: 3,
      stepCode: '04 SELECTION',
      title: 'Merit Verification & Police Academy',
      summary: 'State merit rank declaration, cadre reservation allotment (Civil, AR, TSSP), and medical board induction.',
      detailCard: {
        badge: 'STAGE 4 • FINAL INDUCTION',
        heading: 'Sub-Inspector Appointment & Academy',
        examDuration: 'Document & Medical Verification',
        questionsCount: 'Cadre Allotment',
        scoring: 'Official Gazetted Merit List',
        keyPoints: [
          'Rank-wise Cadre Allotment (Civil SI, AR SI, TSSP SI)',
          'Original Gazette & Biometric Document Verification',
          'Police Medical Board Fitness Inspection',
          'Induction into Telangana / AP Police Academy',
        ],
        ctaText: 'Check Merit Cutoff Analytics',
        ctaHref: '/results',
      },
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

  // Why Choose Us Informative Points (Light Orange/Amber Theme)
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

  const activeStageData = ROAD_STAGES[activeStage];
  const activePopupData = popupFeature ? STATS_FEATURES[popupFeature] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16 font-sans text-slate-800 dark:text-slate-100 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Open Layout - NO Enclosing Card Box)                     */}
      {/* Design like Image 4 (MockNest): Left-aligned matter + Right visual        */}
      {/* ========================================================================= */}
      <section className="relative pt-4 sm:pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Accurate 2-3 Lines Matter, Buttons */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            <h1 className="text-3xl min-[390px]:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Police SI Exam <br />
              <span className="text-orange-500 dark:text-orange-400">
                Preparation Platform
              </span>
            </h1>

            {/* Accurate 2-3 Lines Matter */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Dedicated exam preparation suite for Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector aspirants. Practice timed 200-question preliminary CBT mocks with -0.25 negative marking, review official solved past papers, and evaluate your PET ground fitness benchmarks.
            </p>

            {/* CTA Buttons in Light Orange Palette */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
                className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Start Free Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={getProtectedHref('/previous-papers')}
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border-2 border-slate-300 dark:border-slate-700 hover:border-orange-500 transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Archive className="w-4 h-4 text-orange-500" />
                <span>Explore Previous Papers</span>
              </Link>
            </div>

            {/* Cadre Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-[11px]">
                Civil SI
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-[11px]">
                AR SI
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-[11px]">
                TSSP SI
              </span>
              <span className="text-[11px] text-slate-400">• TSLPRB & AP SLPRB Cadres</span>
            </div>

          </div>

          {/* Right Column: Hero Graphic Design (Insignia & Sub-Inspector Stars) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 dark:from-slate-850 dark:via-slate-800 dark:to-slate-850 p-6 sm:p-8 border border-orange-200/80 dark:border-slate-700 shadow-xl flex flex-col items-center text-center space-y-4">
              
              {/* Subtle ambient light glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 border border-orange-300/80 text-orange-800 dark:text-orange-300 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span>2026 SI Recruitment Selection</span>
              </div>

              {/* Police SI Shield Emblem */}
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 p-2 border border-orange-200 dark:border-slate-700 shadow-md flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Police SI Emblem"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Two Golden Stars of Sub-Inspector Rank */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Sub-Inspector Officer Cadre
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Preliminary CBT • Physical Ground • Mains FWE
                </p>
              </div>

              {/* Quick Spec Tags */}
              <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-2 text-left text-xs font-semibold">
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-mono">Prelims</span>
                  <span className="text-slate-900 dark:text-white font-bold">200 Questions</span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-mono">PET Ground</span>
                  <span className="text-slate-900 dark:text-white font-bold">1600m / 800m</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTIONS (4 Cards - Open Layout)                                  */}
      {/* Mock Tests, Previous Papers, Descriptive Papers, PET Standards            */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Mock Tests */}
        <Link
          href={getProtectedHref('/exam/tslprb-si-pwt-mock-01')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
            Launch Test →
          </span>
        </Link>

        {/* Card 2: Previous Papers */}
        <Link
          href={getProtectedHref('/previous-papers')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-orange-700 dark:text-orange-400 group-hover:underline">
            Browse Papers →
          </span>
        </Link>

        {/* Card 3: Descriptive Papers */}
        <Link
          href={getProtectedHref('/descriptive')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
            View Descriptive Papers →
          </span>
        </Link>

        {/* Card 4: PET Standards */}
        <Link
          href={getProtectedHref('/pet-tracker')}
          className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
            Track Physicals →
          </span>
        </Link>

      </section>

      {/* ========================================================================= */}
      {/* 3. WHY CHOOSE US? (Moved ABOVE Key Features - Open Layout)                */}
      {/* Removed aspirant advice line per user request                             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated preparation ecosystem built strictly around Telangana & AP police recruitment requirements.
          </p>
        </div>

        {/* 6 Informative Points in Open Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-orange-300 dark:hover:border-slate-700 shadow-sm transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
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
      {/* 4. KEY FEATURES & SPECIFICATIONS (ONLY Box-Type Layout Allowed)           */}
      {/* User Instruction: "dont give box type laout for all give only key         */}
      {/* features only,remaining all dont give box type"                          */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Key Features & Specifications
          </h2>
        </div>

        {/* 4 Feature Circles: Clicking any circle opens the Pop-up Modal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          {/* Circle 1: Mock Tests */}
          <button
            type="button"
            onClick={() => setPopupFeature('MOCK_TESTS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mock Tests</h3>
              <p className="text-[10px] text-slate-500 font-mono">200 Qs CBT Simulator</p>
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 2: Previous Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('PREVIOUS_PAPERS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 group-hover:scale-105 transition-transform">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Previous Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">2018–2023 Solved PYQ</p>
            </div>
            <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 3: PET Standards */}
          <button
            type="button"
            onClick={() => setPopupFeature('PET_STANDARDS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">PET Standards</h3>
              <p className="text-[10px] text-slate-500 font-mono">1600m & 800m Cutoffs</p>
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 4: Descriptive Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('DESCRIPTIVE')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Descriptive Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">Mains Papers I & II</p>
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. ROAD TO POLICE OFFICER (Exactly like Image 2 from MockNest)            */}
      {/* Left: 4 Vertical stages with lines, highlighted bold as user scrolls down */}
      {/* Right: Detailing of the active stage in the same place replacing dynamically */}
      {/* Open Layout - NO Enclosing Card Box                                       */}
      {/* ========================================================================= */}
      <section ref={roadSectionRef} className="space-y-6 pt-4">
        
        <div className="text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Road to Police Officer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            From first mock to final selection — sequential stages every aspirant must clear.
          </p>
        </div>

        {/* 2-Column MockNest Style Layout from Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column (7 cols): 4 Vertical Stages with connecting line */}
          <div className="lg:col-span-7 space-y-6">
            {ROAD_STAGES.map((stg) => {
              const isSelected = activeStage === stg.id;

              return (
                <div
                  key={stg.id}
                  onClick={() => setActiveStage(stg.id)}
                  className={`relative pl-6 transition-all duration-300 cursor-pointer ${
                    isSelected ? 'opacity-100 scale-[1.01]' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* Vertical Indicator Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`} />

                  {/* Step Code */}
                  <span className={`text-[11px] font-mono font-bold tracking-wider uppercase block ${
                    isSelected ? 'text-orange-600 dark:text-orange-400 font-black' : 'text-slate-400'
                  }`}>
                    {stg.stepCode}
                  </span>

                  {/* Stage Heading */}
                  <h3 className={`text-lg sm:text-xl tracking-tight transition-all ${
                    isSelected 
                      ? 'font-black text-slate-900 dark:text-white text-xl sm:text-2xl' 
                      : 'font-semibold text-slate-600 dark:text-slate-300'
                  }`}>
                    {stg.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-lg">
                    {stg.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column (5 cols): Detailing Card (Updates dynamically in same place) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white dark:bg-slate-850 border-2 border-orange-200 dark:border-slate-700 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="px-2.5 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {activeStageData.detailCard.badge}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Stage {activeStageData.id + 1} of 4
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {activeStageData.detailCard.heading}
                </h4>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                  {activeStageData.detailCard.scoring}
                </p>
              </div>

              {/* 4 Detail Specification Points */}
              <div className="space-y-2.5 pt-1">
                {activeStageData.detailCard.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Action Button for Active Stage */}
              <div className="pt-2">
                <Link
                  href={getProtectedHref(activeStageData.detailCard.ctaHref)}
                  className="w-full px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <span>{activeStageData.detailCard.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* POP-UP MODAL FOR KEY FEATURES & SPECIFICATIONS                            */}
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
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500">
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
                    <span className="w-5 h-5 rounded bg-orange-500 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
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
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
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
