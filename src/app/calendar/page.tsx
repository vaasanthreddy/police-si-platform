'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  Search,
  Mail,
  AlertCircle
} from 'lucide-react';

interface ExamEvent {
  id: string;
  examName: string;
  board: 'TSLPRB' | 'AP_SLPRB';
  category: 'SI' | 'CONSTABLE';
  stage: string;
  expectedNotification: string;
  expectedExamDate: string;
  status: 'NOTIFICATION_PENDING' | 'CONFIRMED' | 'UPCOMING';
  description: string;
  eligibility: string;
}

export default function ExamCalendarPage() {
  const { user } = useAuth();
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'TSLPRB' | 'AP' | 'SI' | 'CONSTABLE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [interestedExams, setInterestedExams] = useState<string[]>([]);

  useEffect(() => {
    // Load persisted exam interests
    try {
      const saved = localStorage.getItem('interested_exams');
      if (saved) {
        setInterestedExams(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleInterest = (examId: string) => {
    let updated: string[];
    if (interestedExams.includes(examId)) {
      updated = interestedExams.filter((id) => id !== examId);
    } else {
      updated = [...interestedExams, examId];
    }
    setInterestedExams(updated);
    try {
      localStorage.setItem('interested_exams', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubscribeAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) return;
    setSubscribedSuccess(true);
    setTimeout(() => {
      // Auto clear alert after 5s
    }, 5000);
  };

  const EXAM_EVENTS: ExamEvent[] = [
    {
      id: 'tslprb-si-2026',
      examName: 'TSLPRB Police Sub-Inspector (Civil, AR, SAR CPL, TSSP)',
      board: 'TSLPRB',
      category: 'SI',
      stage: 'Stage 1: Preliminary Written Test (PWT 200M)',
      expectedNotification: 'May / June 2026',
      expectedExamDate: 'August 2026',
      status: 'NOTIFICATION_PENDING',
      description: 'Official 200 objective questions preliminary screening exam conducted across all 33 Telangana districts.',
      eligibility: 'Bachelor Degree in any discipline from a recognized University',
    },
    {
      id: 'ap-slprb-si-2026',
      examName: 'AP SLPRB Police Sub-Inspector (Civil & APSP)',
      board: 'AP_SLPRB',
      category: 'SI',
      stage: 'Stage 1: Preliminary Written Test (PWT)',
      expectedNotification: 'July / August 2026',
      expectedExamDate: 'October 2026',
      status: 'NOTIFICATION_PENDING',
      description: 'Paper I (Arithmetic & Test of Reasoning) and Paper II (General Studies) 100M each as per Andhra Pradesh SLPRB.',
      eligibility: 'Degree in any discipline (SC/ST intermediate relaxation as per board rules)',
    },
    {
      id: 'tslprb-constable-2026',
      examName: 'TSLPRB Police Constable (Civil, AR, TSSP, Fireman)',
      board: 'TSLPRB',
      category: 'CONSTABLE',
      stage: 'Stage 1: Preliminary Written Test (200 Questions)',
      expectedNotification: 'August 2026',
      expectedExamDate: 'November 2026',
      status: 'UPCOMING',
      description: 'Standard 200-mark intermediate level written exam with 3 hours duration.',
      eligibility: 'Intermediate (10+2) or equivalent qualification',
    },
    {
      id: 'ap-slprb-constable-2026',
      examName: 'AP SLPRB Police Constable (Civil & APSP)',
      board: 'AP_SLPRB',
      category: 'CONSTABLE',
      stage: 'Stage 1: Preliminary Written Test (PWT 200M)',
      expectedNotification: 'September 2026',
      expectedExamDate: 'December 2026',
      status: 'UPCOMING',
      description: 'Objective test covering Arithmetic, Reasoning, General Studies and English.',
      eligibility: 'Intermediate (10+2) passed',
    },
    {
      id: 'tslprb-si-pet-2026',
      examName: 'TSLPRB SI Physical Efficiency & Measurement Test (PMT / PET)',
      board: 'TSLPRB',
      category: 'SI',
      stage: 'Stage 2: 1600m Run, Long Jump & Shot Put',
      expectedNotification: 'Post PWT Results (October 2026)',
      expectedExamDate: 'November / December 2026',
      status: 'UPCOMING',
      description: '1600m run for Men (qualifying time 7m 15s) and 800m run for Women (5m 20s) with biometric RFID chip tracking.',
      eligibility: 'PWT Qualified candidates only',
    },
    {
      id: 'tslprb-si-fwe-2027',
      examName: 'TSLPRB SI Final Written Examination (FWE Mains)',
      board: 'TSLPRB',
      category: 'SI',
      stage: 'Stage 3: 4 Papers (Paper I & II Descriptive, Paper III & IV Objective)',
      expectedNotification: 'Post PET Results (December 2026)',
      expectedExamDate: 'February / March 2027',
      status: 'UPCOMING',
      description: 'Comprehensive 400-mark final ranking examination determining state selection merit.',
      eligibility: 'PMT & PET Qualified candidates only',
    },
  ];

  const filteredExams = EXAM_EVENTS.filter((e) => {
    if (filterCategory === 'TSLPRB' && e.board !== 'TSLPRB') return false;
    if (filterCategory === 'AP' && e.board !== 'AP_SLPRB') return false;
    if (filterCategory === 'SI' && e.category !== 'SI') return false;
    if (filterCategory === 'CONSTABLE' && e.category !== 'CONSTABLE') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        e.examName.toLowerCase().includes(q) ||
        e.stage.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 animate-slide-up">
      
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-bold transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Banner (Inspired by MockNest Calendar - Image 1) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Official Recruitment Tracker</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Exam Calendar 2026–27
          </h1>
          
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
            Never miss an important exam date. Subscribe to get instant notifications and gazette updates for your target Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Police recruitment exams.
          </p>
        </div>
      </div>

      {/* Get Exam Notifications Subscription Bar (Matching Image 1) */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-amber-50/60 border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Get Instant Exam Date Notifications
            </h3>
            <p className="text-xs text-slate-500">
              Enter your email or phone to receive instant alerts when official exam dates are announced.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubscribeAll} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="email"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-64"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer min-h-[44px]"
          >
            Subscribe
          </button>
        </form>
      </div>

      {subscribedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>You have successfully subscribed to exam announcements! We will send official alert emails to {subscriberEmail} as soon as TSLPRB or AP SLPRB releases recruitment notifications.</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setFilterCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterCategory === 'ALL' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Exams
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('TSLPRB')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterCategory === 'TSLPRB' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TSLPRB (Telangana)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('AP')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterCategory === 'AP' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AP SLPRB (Andhra Pradesh)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('SI')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterCategory === 'SI' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sub-Inspector (SI)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('CONSTABLE')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterCategory === 'CONSTABLE' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Constable
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam, stage or date..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Calendar Exam List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {filteredExams.map((exam) => {
          const isInterested = interestedExams.includes(exam.id);

          return (
            <div
              key={exam.id}
              className={`bg-white border-2 rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between space-y-4 ${
                isInterested ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20' : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                    exam.board === 'TSLPRB'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    {exam.board === 'TSLPRB' ? 'Telangana (TSLPRB)' : 'Andhra Pradesh (AP SLPRB)'}
                  </span>

                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {exam.category === 'SI' ? 'Sub-Inspector' : 'Constable'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {exam.examName}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5">
                    {exam.stage}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {exam.description}
                </p>

                {/* Timeline metadata chips */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 font-mono">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <span className="text-slate-400 block text-[10px]">EXPECTED NOTIFICATION:</span>
                    <strong className="text-slate-800">{exam.expectedNotification}</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <span className="text-slate-400 block text-[10px]">EXAM WINDOW:</span>
                    <strong className="text-blue-700">{exam.expectedExamDate}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Eligibility:</strong> {exam.eligibility}</span>
                </div>
              </div>

              {/* Action Buttons: Notify Me & Practice Mock */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleInterest(exam.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                    isInterested
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {isInterested ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Notified (Interested)</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5" />
                      <span>Get Notified When Announced</span>
                    </>
                  )}
                </button>

                <Link
                  href="/exam/tslprb-si-pwt-mock-01"
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center min-h-[44px]"
                >
                  <span>Practice</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preparation Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Dates are estimated based on past gazette recruitment cycles and state police recruitment board recommendations. Official dates will be synced immediately upon gazette notification.</span>
      </div>

    </div>
  );
}
