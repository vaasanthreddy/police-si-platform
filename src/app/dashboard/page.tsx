'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Archive, 
  Activity, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';

export default function StudentDashboard() {
  // Hero section carousel active slide state (3 slides)
  const [heroSlide, setHeroSlide] = useState<number>(0);

  // Section 5 (Stats Section): Active feature state
  // 'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE'
  const [activeFeature, setActiveFeature] = useState<'MOCK_TESTS' | 'PREVIOUS_PAPERS' | 'PET_STANDARDS' | 'DESCRIPTIVE'>('MOCK_TESTS');

  // Hero section slides
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

  // Section 5 Stats Feature Details: 4 highlighted points per feature
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

  const currentHero = HERO_SLIDES[heroSlide];
  const currentFeatureData = STATS_FEATURES[activeFeature];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 font-sans text-slate-800 dark:text-slate-100">
      
      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Wireframe Section 2: Strong heading + CTA + Visuals)     */}
      {/* Single large card in layout separation, no gradients                      */}
      {/* ========================================================================= */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
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

            {/* CTA Buttons side by side as in wireframe */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary solid blue button matching wireframe */}
              <Link
                href={currentHero.primaryBtnHref}
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
              >
                <span>{currentHero.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary outlined button matching wireframe */}
              <Link
                href={currentHero.secondaryBtnHref}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider border-2 border-slate-700 dark:border-slate-500 transition-colors shadow-sm"
              >
                {currentHero.secondaryBtnText}
              </Link>
            </div>

            {/* Three Indicator Dots centered below content matching wireframe */}
            <div className="flex items-center gap-2 pt-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    heroSlide === idx 
                      ? 'w-7 bg-slate-800 dark:bg-slate-200' 
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Visual Image Container matching wireframe */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm aspect-square bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Police SI Emblem"
                  width={112}
                  height={112}
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Police Sub-Inspector Selection Portal
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                TSLPRB & AP SLPRB Recruitment Cadres
              </p>
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                  Civil SI
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                  AR SI
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                  TSSP SI
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. QUICK ACTIONS (Wireframe Section 3: 4 Main Feature Cards)               */}
      {/* 4 separate cards in a row with icons, title, description                  */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Mock Tests */}
        <Link
          href="/exam/tslprb-si-pwt-mock-01"
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 group-hover:underline">
            Launch Test →
          </span>
        </Link>

        {/* Card 2: Previous Papers */}
        <Link
          href="/previous-papers"
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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

        {/* Card 3: Exam Calendar */}
        <Link
          href="/calendar"
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Exam Calendar
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Track upcoming recruitment dates, gazette notifications, and alerts.
            </p>
          </div>
          <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 group-hover:underline">
            View Calendar →
          </span>
        </Link>

        {/* Card 4: PET Standards */}
        <Link
          href="/pet-tracker"
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 rounded-2xl p-6 text-center flex flex-col items-center justify-between space-y-4 shadow-sm transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
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
      {/* 4. KEY HIGHLIGHTS (Wireframe Section 4: Why choose us / Exams & Study)    */}
      {/* Left visual box, right informative copy + solid action button             */}
      {/* ========================================================================= */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Box matching wireframe image box */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>Curriculum & Study Modules</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 text-slate-700 dark:text-slate-300">
                  Bilingual
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white block">Paper III: Arithmetic & Reasoning</strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    100 Questions • Police chasing, ratios, time & distance, syllogisms, and coding-decoding.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white block">Paper IV: General Studies & Polity</strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    100 Questions • Constitution of India, modern Indian history, state movement, and ethics.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white block">Mains Descriptive Papers I & II</strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Precis writing, formal letter drafting, English essay synthesis, and regional language translation.
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                *Aligned strictly with Telugu Akademi curriculum and official police recruitment board gazettes.
              </p>
            </div>
          </div>

          {/* Right Information Text + CTA Button */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Key Highlights
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Authentic Exam Information & Standard Study Materials
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our preparation modules are engineered from the ground up to support Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector candidates throughout all three stages of the recruitment pipeline.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Full 200-Question Preliminary Blueprints:</strong> Comprehensive question banks matching official notification marks distribution with zero unverified questions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Bilingual Study Materials:</strong> Complete question explanations, mathematical formula derivations, and terms available in English and Telugu.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Standard Ground Benchmarks:</strong> Track daily field running timings against 1600m and 800m qualification cutoffs to eliminate physical stage failure.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Descriptive Answer Sheet Evaluation:</strong> Rubric-based scoring models for English and Telugu translation papers per official state guidelines.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/previous-papers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Access Study Materials & PYQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. STATS SECTION (Wireframe Section 5: 4 Circles + Highlighted Box)       */}
      {/* Clicking each feature opens its 4 respective points in a highlighted box  */}
      {/* ========================================================================= */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Key Features & Specifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any feature circle below to open its 4 key operational points in the highlighted box.
          </p>
        </div>

        {/* 4 Feature Circles matching wireframe circles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          {/* Circle 1: Mock Tests */}
          <button
            type="button"
            onClick={() => setActiveFeature('MOCK_TESTS')}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
              activeFeature === 'MOCK_TESTS'
                ? 'bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-300 shadow-md ring-2 ring-slate-400'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              activeFeature === 'MOCK_TESTS'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mock Tests</h3>
              <p className="text-[10px] text-slate-500 font-mono">200 Qs CBT Simulator</p>
            </div>
          </button>

          {/* Circle 2: Previous Papers */}
          <button
            type="button"
            onClick={() => setActiveFeature('PREVIOUS_PAPERS')}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
              activeFeature === 'PREVIOUS_PAPERS'
                ? 'bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-300 shadow-md ring-2 ring-slate-400'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              activeFeature === 'PREVIOUS_PAPERS'
                ? 'bg-amber-700 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Previous Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">2018–2023 Solved PYQ</p>
            </div>
          </button>

          {/* Circle 3: PET Standards */}
          <button
            type="button"
            onClick={() => setActiveFeature('PET_STANDARDS')}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
              activeFeature === 'PET_STANDARDS'
                ? 'bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-300 shadow-md ring-2 ring-slate-400'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              activeFeature === 'PET_STANDARDS'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">PET Standards</h3>
              <p className="text-[10px] text-slate-500 font-mono">1600m & 800m Cutoffs</p>
            </div>
          </button>

          {/* Circle 4: Descriptive Papers */}
          <button
            type="button"
            onClick={() => setActiveFeature('DESCRIPTIVE')}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
              activeFeature === 'DESCRIPTIVE'
                ? 'bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-300 shadow-md ring-2 ring-slate-400'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              activeFeature === 'DESCRIPTIVE'
                ? 'bg-purple-700 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Descriptive Papers</h3>
              <p className="text-[10px] text-slate-500 font-mono">Mains Papers I & II</p>
            </div>
          </button>

        </div>

        {/* The Highlighted Box: Opens with 4 Points for the Selected Feature */}
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-300 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Highlighted Feature Specifications
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {currentFeatureData.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentFeatureData.summary}
              </p>
            </div>

            <Link
              href={currentFeatureData.href}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>{currentFeatureData.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Points in Highlighted Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {currentFeatureData.points.map((pt) => (
              <div
                key={pt.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
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

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. LATEST UPDATES (Wireframe Section 6: 2 Columns)                        */}
      {/* Left Column: Latest Updates • Right Column: Important Notice              */}
      {/* ========================================================================= */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Column 1: Latest Updates matching wireframe */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Latest Updates
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    TSLPRB SI Notification 2026 Expected Timeline
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Official recruitment notification expected soon for Civil, AR, and TSSP wings. Preliminary 200M CBT mocks active.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    AP Police SI Preliminary Grand Mock Test 1 Released
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Full-length bilingual test with standard AP SLPRB question patterns and instant solution keys available for free practice.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    PET 1600m & 800m Pacing Standards Calibrated
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Field pace calculator updated to match official physical qualification standards for male (7m 15s) and female (5m 20s) aspirants.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2: Important Notice matching wireframe */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Important Notice
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Negative Marking Directive (-0.25 Mark)
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    In TSLPRB objective exams, each incorrect answer incurs a 0.25 mark penalty. Unattempted questions carry zero penalty.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Biometric & Photo ID Verification
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Candidates must carry original government photo identification (Aadhaar, Voter ID, or Driving License) to examination halls.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Independent Preparation Platform Advisory
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Always cross-verify formal gazette dates and download official hall tickets directly from <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">tslprb.in</span> or <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">slprb.ap.gov.in</span>.
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
