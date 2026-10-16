'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Archive, 
  Activity, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Star,
  Award,
  ChevronRight,
  X,
  Target,
  UserCheck,
  Sparkles
} from 'lucide-react';

export default function DashboardWireframe() {
  // Hero section carousel active slide state (3 slides)
  const [heroSlide, setHeroSlide] = useState<number>(0);

  // Road to Police Officer animated sequence state (Stages 0 to 3)
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);

  // Pop-up modal state for Section 5 (Key Features & Specifications)
  // When clicked, opens a pop-up modal like footer terms/disclaimer
  const [popupFeature, setPopupFeature] = useState<'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE' | null>(null);

  // Auto-play the "Road to Police Officer" animated sequence every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoadmapStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Hero section slides with platform amber color theme
  const HERO_SLIDES = [
    {
      title: 'Telangana & Andhra Pradesh Police SI Preparation Suite',
      subtitle: 'Complete Computer-Based Testing (CBT) engine tailored for TSLPRB and AP SLPRB Sub-Inspector aspirants.',
      description: 'Practice timed 200-question preliminary written tests, review authentic previous solved papers, track Physical Efficiency Test (PET) benchmarks, and receive evaluated descriptive paper rubrics.',
      primaryBtnText: 'Start Free Mock Test',
      primaryBtnHref: '/exam/tslprb-si-pwt-mock-01',
      secondaryBtnText: 'Explore Previous Papers',
      secondaryBtnHref: '/previous-papers',
    },
    {
      title: 'Official Solved Previous Year Question Archives',
      subtitle: 'Original past papers from 2018, 2022, and 2023 with verified answer keys.',
      description: 'Review official exam papers cross-verified with published state gazettes. Master mathematical shortcut formulas and reasoning logic methods under authentic test conditions.',
      primaryBtnText: 'Attempt 2022 Solved Paper',
      primaryBtnHref: '/exam/pyq-tslprb-si-2022',
      secondaryBtnText: 'Browse All Solved Papers',
      secondaryBtnHref: '/previous-papers',
    },
    {
      title: 'Physical Efficiency Test (PET) Ground Standards',
      subtitle: 'Field qualification standards tracker for male and female police candidates.',
      description: 'Log and evaluate daily ground timings against official police recruitment benchmarks: 1600m for men in 7m 15s and 800m for women in 5m 20s with event qualification scoring.',
      primaryBtnText: 'Track Running Timings',
      primaryBtnHref: '/pet-tracker',
      secondaryBtnText: 'View Ground Standards',
      secondaryBtnHref: '/pet-tracker',
    },
  ];

  // Road to Police Officer sequence stages
  const ROAD_STAGES = [
    {
      step: 1,
      badge: 'STAGE 1',
      title: 'Preliminary Written Test (PWT)',
      examName: 'Preliminary CBT Exam',
      tagline: 'First Stage to Clear',
      duration: '3 Hours • 200 Questions',
      score: '200 Marks Objective',
      subjects: ['Arithmetic & Reasoning (100 Qs)', 'General Studies & Polity (100 Qs)'],
      href: '/exam/tslprb-si-pwt-mock-01',
      cta: 'Attempt Stage 1 Mock',
    },
    {
      step: 2,
      badge: 'STAGE 2',
      title: 'Physical Measurement & Efficiency Test (PMT & PET)',
      examName: 'Physical Efficiency Test',
      tagline: 'Second Stage to Clear',
      duration: 'Field Ground Evaluation',
      score: 'Qualifying Standards',
      subjects: ['1600m Run (Men 7m 15s) / 800m (Women 5m 20s)', 'Long Jump (3.80m / 2.75m) & Shot Put (5.60m / 3.75m)'],
      href: '/pet-tracker',
      cta: 'Open Stage 2 PET Tracker',
    },
    {
      step: 3,
      badge: 'STAGE 3',
      title: 'Final Written Examination (FWE - Mains)',
      examName: 'Mains 4-Paper Exam',
      tagline: 'Third Stage to Clear',
      duration: '4 Comprehensive Papers',
      score: '400 Marks Total',
      subjects: ['Paper I: English Descriptive & Precis', 'Paper II: Telugu / Urdu Language', 'Paper III: Arithmetic & Reasoning (100 Qs)', 'Paper IV: General Studies (100 Qs)'],
      href: '/descriptive',
      cta: 'View Stage 3 Descriptive Papers',
    },
    {
      step: 4,
      badge: 'STAGE 4',
      title: 'Document Verification & Medical Board',
      examName: 'Final Merit Selection',
      tagline: 'Final Appointment Stage',
      duration: 'Merit Ranks & Board Inspection',
      score: 'Police Academy Cadet',
      subjects: ['State Merit List Allotment (Civil, AR, TSSP)', 'Medical Fitness Verification & Formal Appointment Orders'],
      href: '/results',
      cta: 'View Cutoff & Merit Analytics',
    },
  ];

  // Section 5 Stats Feature Details: 4 highlighted points per feature
  const STATS_FEATURES = {
    MOCK_TESTS: {
      name: 'Computer-Based Mock Tests (CBT Simulator)',
      summary: 'High-fidelity test simulation matching official state police preliminary written exam standards.',
      href: '/exam/tslprb-si-pwt-mock-01',
      actionText: 'Launch Mock Test',
      accentColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800',
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
      accentColor: 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800',
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
      accentColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800',
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
      accentColor: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800',
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

  const currentHero = HERO_SLIDES[heroSlide];
  const activeRoadStage = ROAD_STAGES[activeRoadmapStep];
  const activePopupData = popupFeature ? STATS_FEATURES[popupFeature] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 font-sans text-slate-800 dark:text-slate-100">
      
      {/* ========================================================================= */}
      {/* 2. HERO SECTION (With Amber Color Palette & Dynamic SI Visual)            */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>TSLPRB & AP SLPRB SI 2026</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {currentHero.title}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {currentHero.subtitle}
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {currentHero.description}
            </p>

            {/* CTA Buttons side by side with original Amber Palette */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={currentHero.primaryBtnHref}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 focus:ring-2 focus:ring-amber-500"
              >
                <span>{currentHero.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={currentHero.secondaryBtnHref}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border-2 border-slate-700 dark:border-slate-600 hover:border-amber-600 transition-all shadow-sm"
              >
                {currentHero.secondaryBtnText}
              </Link>
            </div>

            {/* Three Indicator Dots centered below content */}
            <div className="flex items-center gap-2 pt-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    heroSlide === idx 
                      ? 'w-7 bg-amber-600' 
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Hero Graphic Illustration for Police SI Selection */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl border-2 border-amber-400/60 dark:border-amber-600/50 p-6 flex flex-col items-center justify-between text-center shadow-lg relative overflow-hidden group">
              
              {/* Subtle background radar circles */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-500/10 animate-pulse pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-amber-500/10 pointer-events-none" />

              {/* Status Header Pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold tracking-wide z-10 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>2026 Sub-Inspector Selection Portal</span>
              </div>

              {/* Center Emblem with SI Two Stars Insignia */}
              <div className="relative my-2 flex flex-col items-center justify-center z-10">
                <div className="w-24 h-24 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 p-2.5 border-2 border-amber-300 dark:border-amber-700 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="Police SI Emblem"
                    width={80}
                    height={80}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Sub-Inspector 2 Golden Stars Insignia */}
                <div className="flex items-center gap-3 mt-3 px-3 py-1 bg-slate-900 text-amber-400 rounded-full border border-amber-500/50 shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white">
                    Sub-Inspector Rank
                  </span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Cadre Badges */}
              <div className="w-full mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 grid grid-cols-3 gap-1.5 z-10">
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block">Civil SI</span>
                  <span className="text-[9px] text-slate-500">Law & Order</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block">AR SI</span>
                  <span className="text-[9px] text-slate-500">Armed Reserve</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block">TSSP SI</span>
                  <span className="text-[9px] text-slate-500">Special Police</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. QUICK ACTIONS (Calendar Replaced by Descriptive Papers)                */}
      {/* 4 Cards: Mock Tests, Previous Papers, Descriptive Papers, PET Standards   */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Mock Tests */}
        <Link
          href="/exam/tslprb-si-pwt-mock-01"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Mock Tests
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Full 200M CBT simulator with live countdown timer and negative marking.
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
            Launch Test →
          </span>
        </Link>

        {/* Card 2: Previous Papers */}
        <Link
          href="/previous-papers"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 group-hover:underline">
            Browse Papers →
          </span>
        </Link>

        {/* Card 3: Descriptive Papers (Replaced Exam Calendar per Request 4) */}
        <Link
          href="/descriptive"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
            View Descriptive Papers →
          </span>
        </Link>

        {/* Card 4: PET Standards */}
        <Link
          href="/pet-tracker"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
            Track Physicals →
          </span>
        </Link>

      </section>

      {/* ========================================================================= */}
      {/* 4. ROAD TO POLICE OFFICER (Replaced Key Highlights per Request 6)         */}
      {/* Big title + Animated sequence of what to clear first, second, etc.        */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Big Name Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            <span>Recruitment Pipeline Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            ROAD TO POLICE OFFICER
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sequential stages every aspirant must clear to earn the Sub-Inspector badge.
          </p>
        </div>

        {/* Sequential 4-Stage Stepper with Live Animated Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {ROAD_STAGES.map((stg, index) => {
            const isActive = activeRoadmapStep === index;
            const isCompleted = activeRoadmapStep > index;

            return (
              <button
                key={stg.step}
                type="button"
                onClick={() => setActiveRoadmapStep(index)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 border-2 border-amber-600 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600 animate-pulse" />
                )}

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isActive 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {stg.badge}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    {stg.tagline}
                  </span>
                </div>

                <div className="pt-2.5 space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {stg.examName}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {stg.duration}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>{stg.score}</span>
                  <span className={`font-bold transition-transform ${isActive ? 'text-amber-600 translate-x-1' : 'text-slate-400'}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Animated Highlighted Detail Box for the Currently Selected Stage */}
        <div className="bg-white dark:bg-slate-800 border-2 border-amber-500/40 dark:border-amber-600/50 rounded-2xl p-5 sm:p-6 shadow-sm transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {activeRoadStage.tagline} • Step {activeRoadStage.step} of 4
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {activeRoadStage.title}
              </h3>
            </div>

            <Link
              href={activeRoadStage.href}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <span>{activeRoadStage.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            {activeRoadStage.subjects.map((subj, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {subj}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. KEY FEATURES & SPECIFICATIONS (With Pop-up Modal per Request 7 & 8)    */}
      {/* Caption removed below heading. Clicking circle opens pop-up modal.        */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Section Header: Caption REMOVED per Request 7 */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Key Features & Specifications
          </h2>
        </div>

        {/* 4 Feature Circles: Clicking any circle OPENS the Pop-up Modal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          {/* Circle 1: Mock Tests */}
          <button
            type="button"
            onClick={() => setPopupFeature('MOCK_TESTS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mock Tests</h3>
              <p className="text-[10px] text-slate-500 font-mono">200 Qs CBT Simulator</p>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 2: Previous Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('PREVIOUS_PAPERS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Previous Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">2018–2023 Solved PYQ</p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 3: PET Standards */}
          <button
            type="button"
            onClick={() => setPopupFeature('PET_STANDARDS')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">PET Standards</h3>
              <p className="text-[10px] text-slate-500 font-mono">1600m & 800m Cutoffs</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

          {/* Circle 4: Descriptive Papers */}
          <button
            type="button"
            onClick={() => setPopupFeature('DESCRIPTIVE')}
            className="p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Descriptive Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">Mains Papers I & II</p>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
              View Specs ↗
            </span>
          </button>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* POP-UP MODAL (Like footer terms/disclaimer popup per Request 8)           */}
      {/* Appears when user clicks any of the 4 feature circles                     */}
      {/* ========================================================================= */}
      {popupFeature && activePopupData && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setPopupFeature(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-amber-600 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Feature Specifications & Standards
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
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
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 4 Points in Highlighted Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {activePopupData.points.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-600 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                      {pt.id}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {pt.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer: Action & Close Buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPopupFeature(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>

              <Link
                href={activePopupData.href}
                onClick={() => setPopupFeature(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
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
