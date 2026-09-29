'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { MOCK_EXAMS, MOCK_PREVIOUS_PAPERS, MOCK_USER_ATTEMPTS } from '../../lib/mockData';
import { 
  BarChart3, 
  Clock, 
  Award, 
  Activity, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Play, 
  FileText,
  TrendingUp,
  Crown,
  ChevronRight,
  Archive,
  BookOpen,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const { user, role, toggleSubscription } = useAuth();
  const [examTab, setExamTab] = useState<'MOCKS' | 'PRACTICE' | 'PYQ'>('MOCKS');

  // Route guard: only authenticated students
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block p-4 rounded-full bg-amber-50 border border-amber-200 mb-4 animate-spin">
          <Clock className="w-6 h-6 text-amber-600" />
        </div>
        <p className="text-sm font-semibold text-slate-600">Verifying Aspirant Credentials...</p>
      </div>
    );
  }

  // Subject proficiency breakdown (PRD 3.4)
  const subjectProficiency = [
    { subject: 'Indian Polity & Constitution', score: 88, status: 'STRONG', color: 'bg-emerald-500' },
    { subject: 'Arithmetic & Number Systems', score: 82, status: 'STRONG', color: 'bg-emerald-500' },
    { subject: 'Test of Reasoning & Logic', score: 76, status: 'MODERATE', color: 'bg-amber-500' },
    { subject: 'State Movement & History (TS/AP)', score: 64, status: 'NEEDS_FOCUS', color: 'bg-amber-600' },
    { subject: 'General Science & Forensics', score: 58, status: 'WEAK', color: 'bg-red-500' },
  ];

  const fullMocks = MOCK_EXAMS.filter(e => e.examType === 'PRELIMS_PWT' && !e.isPreviousPaper);
  const practicePapers = MOCK_EXAMS.filter(e => e.examType === 'DAILY_QUIZ' || e.examType === 'MAINS_PAPER_3_ARITHMETIC_REASONING');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Candidate Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-sm ring-4 ring-amber-100">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'SI'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name || 'Aspirant Vasu Reddy'}</h1>
                {user?.subscriptionTier === 'PREMIUM' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold">
                    <Crown className="w-3 h-3 text-amber-600" /> PRO PASS ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
                    FREE ASPIRANT
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-900 font-medium">
                Target Exam: <strong className="text-slate-900">{user?.targetExam?.replace(/_/g, ' ') || 'TSLPRB SI Civil & AR'}</strong> • State: <strong className="text-slate-900">{user?.targetState || 'TELANGANA'}</strong>
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Roll Number: <span className="text-slate-800 font-semibold">{user?.rollNumber || 'TS-SI-2026-8841'}</span> • Second Language: <span className="text-amber-800 font-bold">{user?.primaryLanguage || 'TELUGU'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/results"
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Results Tool</span>
            </Link>

            <Link
              href="/performance"
              className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-purple-700" />
              <span>Performance</span>
            </Link>

            <Link
              href="/upgrade"
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>{user?.subscriptionTier === 'PREMIUM' ? 'Pro Active' : 'Upgrade Plan'}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2ND IMAGE BOXES: COMPLETE THREE-STAGE RECRUITMENT EXAM PIPELINE          */}
      {/* (PRD Section 4 - Exact boxes from User Image 2)                           */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Complete Three-Stage Recruitment Exam Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Structured in strict adherence to the official TSLPRB & Andhra Pradesh Police Recruitment Board syllabus and qualification phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1: PWT */}
          <div className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono bg-amber-50 px-2 py-1 rounded">
                  STAGE 01
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  200 Marks
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Preliminary Written Test (PWT)</h3>
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
                  <span>English & Telugu/Hindi/Urdu bilingual mode</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/exam/tslprb-si-pwt-mock-01"
                className="w-full block text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors border border-amber-200 cursor-pointer"
              >
                Attempt PWT CBT Exam
              </Link>
            </div>
          </div>

          {/* Phase 2: PET / PMT */}
          <div className="bg-white border-2 border-emerald-300 hover:border-emerald-500 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest font-mono bg-emerald-50 px-2 py-1 rounded">
                  STAGE 02
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  Ground Fitness
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Physical Efficiency & Measurement (PET/PMT)</h3>
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
                href="/pet-tracker"
                className="w-full block text-center py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors border border-emerald-200 cursor-pointer"
              >
                Open PET Tracker Log
              </Link>
            </div>
          </div>

          {/* Phase 3: FWE Mains */}
          <div className="bg-white border-2 border-slate-200 hover:border-purple-400 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-widest font-mono bg-purple-50 px-2 py-1 rounded">
                  STAGE 03
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  4 Papers
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Final Written Examination (FWE)</h3>
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
                href="/descriptive"
                className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-colors border border-purple-200 cursor-pointer"
              >
                Submit Descriptive Paper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">84.6%</p>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +3.2% vs last week
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Time / Question</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">48s</p>
          <p className="text-[11px] text-slate-500 mt-1">Benchmark: &lt; 54s for 200 Qs</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">PET Ground Readiness</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-600 font-mono">92%</p>
          <p className="text-[11px] text-emerald-600 mt-1">1600m Run in 6m 45s (Qualified)</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">State Rank Estimate</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600 font-mono">#142</p>
          <p className="text-[11px] text-slate-500 mt-1">Top 1.8% in Telangana State</p>
        </div>
      </div>

      {/* Main Grid: Exam Catalogue Tabs & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Exam Categories */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Police SI Examination Suite</h3>
                <p className="text-xs text-slate-500">Practice full mocks, topic tests, or real previous year papers</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setExamTab('MOCKS')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    examTab === 'MOCKS'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grand Mocks (200 M)
                </button>
                <button
                  type="button"
                  onClick={() => setExamTab('PRACTICE')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    examTab === 'PRACTICE'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Topic Drills
                </button>
                <button
                  type="button"
                  onClick={() => setExamTab('PYQ')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    examTab === 'PYQ'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Previous Papers (PYQ)
                </button>
              </div>
            </div>

            {/* List for MOCKS */}
            {examTab === 'MOCKS' && (
              <div className="space-y-3">
                {fullMocks.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{exam.title}</span>
                        {exam.isPremiumOnly && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold">
                            PRO PASS
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {exam.totalQuestions} Questions • {exam.durationMins} Mins • Total Marks: {exam.totalMarks} • -0.25 Negative Marking
                      </p>
                    </div>

                    <Link
                      href={`/exam/${exam.id}`}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Mock</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* List for PRACTICE */}
            {examTab === 'PRACTICE' && (
              <div className="space-y-3">
                {practicePapers.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-900">{exam.title}</span>
                      <p className="text-[11px] text-slate-500">
                        {exam.totalQuestions} Questions • {exam.durationMins} Mins • Instant Answer Keys
                      </p>
                    </div>

                    <Link
                      href={`/exam/${exam.id}`}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Take Quiz</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* List for PYQ */}
            {examTab === 'PYQ' && (
              <div className="space-y-3">
                {MOCK_PREVIOUS_PAPERS.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-amber-50/50 hover:bg-amber-50 border border-amber-200 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[10px] font-bold">
                          Year {paper.year}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{paper.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {paper.totalQuestions} Qs • {paper.totalMarks} Marks • Shift: {paper.examShift}
                      </p>
                    </div>

                    <Link
                      href={`/exam/${paper.examId}`}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Solve CBT</span>
                    </Link>
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <Link
                    href="/previous-papers"
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                  >
                    View All State Previous Papers Archives & PDF Keys →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Results Tool Quick Preview (Recent Attempt) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>Recent Examination Scorecard Preview</span>
                </h3>
                <p className="text-xs text-slate-500">Check comprehensive analysis, negative marking, and rank in the Results Tool</p>
              </div>
              <Link
                href="/results"
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <span>Full Results Tool</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900">TSLPRB SI Preliminary Grand Mock 01</span>
                <p className="text-slate-500 text-[11px]">Completed under TSLPRB CBT Pattern</p>
              </div>
              <div className="flex items-center gap-4 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">NET SCORE</span>
                  <span className="font-black text-amber-700 text-sm">146.5 / 200</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">ACCURACY</span>
                  <span className="font-black text-emerald-700 text-sm">78.4%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">STATE RANK</span>
                  <span className="font-black text-slate-800 text-sm">#142</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Diagnostics & Shortcuts */}
        <div className="space-y-6">
          
          {/* Subject-Wise Strong & Weak Areas */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Subject Diagnostics</h3>
                <p className="text-xs text-slate-500">Proficiency by topic</p>
              </div>
              <Link
                href="/performance"
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {subjectProficiency.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-800 font-semibold">{item.subject}</span>
                    <span className="font-mono font-bold text-slate-700">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${item.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5" /> Recommendation
              </span>
              <p className="text-[11px] mt-1 text-slate-600">
                Focus on <strong>General Science & Forensics</strong> and <strong>State Movement History</strong> to push your aggregate score past the 160+ mark.
              </p>
            </div>
          </div>

          {/* PET Physical Fitness Readiness Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">PET Ground Fitness</h3>
                <p className="text-xs text-slate-500">Daily physical training progress</p>
              </div>
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-medium text-slate-700">1600m Run Timing</span>
                <span className="font-bold text-emerald-700 font-mono">6m 45s (Qualified)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-medium text-slate-700">Long Jump Distance</span>
                <span className="font-bold text-emerald-700 font-mono">4.20m (Passed)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-medium text-slate-700">Shot Put (7.26kg)</span>
                <span className="font-bold text-emerald-700 font-mono">6.50m (Passed)</span>
              </div>
            </div>

            <Link
              href="/pet-tracker"
              className="w-full block text-center py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer"
            >
              Log Today's Ground Workouts
            </Link>
          </div>

          {/* Descriptive Paper Module Shortcut */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Descriptive Evaluation</h3>
                <p className="text-xs text-slate-500">Mains Paper I & II Essay & Precis</p>
              </div>
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-slate-600">
              Submit your handwritten essay answers for evaluation and faculty feedback.
            </p>
            <Link
              href="/descriptive"
              className="w-full block text-center py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition-colors cursor-pointer"
            >
              Submit Descriptive Answer Sheet
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
