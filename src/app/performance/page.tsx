'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { MOCK_SUBJECT_PERFORMANCE } from '../../lib/mockData';
import { 
  BarChart3, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function PerformancePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <BarChart3 className="w-8 h-8 text-amber-600" />
            <span>Candidate Performance & Subject Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visual subject-wise breakdown, speed vs accuracy index, and targeted weakness remediation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/results"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>View Recent Scorecards</span>
          </Link>
          <Link
            href="/exam/tslprb-si-pwt-mock-01"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Practice Mock</span>
          </Link>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Accuracy</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono mt-2">78.4%</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">↑ +4.2% higher than state average</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Time / Question</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono mt-2">49.2 sec</p>
          <p className="text-xs text-blue-700 font-semibold mt-1">Ideal: &lt; 54 seconds for 200 Qs</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Questions Solved</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono mt-2">590 Qs</p>
          <p className="text-xs text-purple-700 font-semibold mt-1">Across 4 Full Mocks & 8 Topic Drills</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projected State Cutoff</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-amber-700 font-mono mt-2">146.5 / 200</p>
          <p className="text-xs text-amber-800 font-semibold mt-1">Qualifies for Civil / AR SI Mains</p>
        </div>
      </div>

      {/* Subject-Wise Mastery Breakdown */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Subject-Wise Strength & Weakness Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Computed in real-time from your submitted PWT CBT mocks and topic practice tests.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">PRD Section 3.4 Baseline</span>
        </div>

        <div className="space-y-4">
          {MOCK_SUBJECT_PERFORMANCE.map((item) => {
            const isStrong = item.status === 'STRONG';
            const isWeak = item.status === 'WEAK';

            return (
              <div key={item.subject} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isStrong 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isWeak
                        ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {item.status === 'STRONG' ? 'Strong Area' : item.status === 'WEAK' ? 'Needs Focus' : 'Moderate'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.subject}</h4>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-slate-600">
                      Attempted: <strong>{item.questionsAttempted}</strong> Qs
                    </span>
                    <span className="text-slate-600">
                      Speed: <strong>{item.averageTimeSeconds}s</strong>/Q
                    </span>
                    <span className={`font-black text-sm ${
                      isStrong ? 'text-emerald-700' : isWeak ? 'text-red-600' : 'text-amber-700'
                    }`}>
                      {item.accuracy}% Accuracy
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isStrong ? 'bg-emerald-500' : isWeak ? 'bg-red-500' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>

                {isWeak && (
                  <div className="flex items-center justify-between bg-red-50/60 p-2.5 rounded-xl border border-red-200 text-xs text-red-900 mt-2">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>Recommendation: Take 20-Question Targeted Practice Drill in General Science.</span>
                    </span>
                    <Link
                      href="/exam/practice-polity-01"
                      className="font-bold text-red-700 hover:text-red-900 underline flex items-center gap-1 shrink-0"
                    >
                      <span>Start Drill</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
