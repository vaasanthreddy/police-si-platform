'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_ATTEMPTS, SAMPLE_QUESTIONS } from '../../lib/mockData';
import { UserAttempt, Question } from '../../lib/types';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  TrendingUp, 
  BarChart3, 
  RotateCcw,
  Sparkles,
  FileText,
  Languages
} from 'lucide-react';

export default function ResultsPage() {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<UserAttempt[]>(MOCK_USER_ATTEMPTS);
  const [selectedAttempt, setSelectedAttempt] = useState<UserAttempt>(MOCK_USER_ATTEMPTS[0]);
  const [reviewLang, setReviewLang] = useState<'ENGLISH' | 'TELUGU' | 'HINDI' | 'URDU'>('TELUGU');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecent = localStorage.getItem('police_si_recent_attempt');
      if (storedRecent) {
        try {
          const parsed = JSON.parse(storedRecent);
          setAttempts([parsed, ...MOCK_USER_ATTEMPTS.filter(a => a.id !== parsed.id)]);
          setSelectedAttempt(parsed);
        } catch (e) {
          // fallback to mock
        }
      }
    }
  }, []);

  const formatSeconds = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs}s`;
  };

  const getLocalizedQText = (q: Question) => {
    if (reviewLang === 'TELUGU' && q.questionTextTelugu) return q.questionTextTelugu;
    if (reviewLang === 'HINDI' && q.questionTextHindi) return q.questionTextHindi;
    if (reviewLang === 'URDU' && q.questionTextUrdu) return q.questionTextUrdu;
    return q.questionText;
  };

  const getLocalizedOptText = (opt: any) => {
    if (reviewLang === 'TELUGU' && opt.textTelugu) return opt.textTelugu;
    if (reviewLang === 'HINDI' && opt.textHindi) return opt.textHindi;
    if (reviewLang === 'URDU' && opt.textUrdu) return opt.textUrdu;
    return opt.text;
  };

  const getLocalizedExplText = (q: Question) => {
    if (reviewLang === 'TELUGU' && q.explanationTelugu) return q.explanationTelugu;
    if (reviewLang === 'HINDI' && q.explanationHindi) return q.explanationHindi;
    if (reviewLang === 'URDU' && q.explanationUrdu) return q.explanationUrdu;
    return q.explanation;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Top Header */}
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
            <Award className="w-8 h-8 text-amber-600" />
            <span>Candidate Examination Results Tool</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official scorecard breakdown, negative marking calculations, and bilingual answer review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/performance"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-slate-600" />
            <span>Performance Analysis</span>
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Attempt Another Test</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOST RECENT TEST RESULT (Prominently Highlighted at Top)               */}
      {/* ========================================================================= */}
      {selectedAttempt && (
        <section className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Most Recent Examination Scorecard</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Attempt ID: {selectedAttempt.id}
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Submitted: {new Date(selectedAttempt.completedAt || selectedAttempt.startedAt).toLocaleString('en-IN')}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            {selectedAttempt.examTitle}
          </h2>

          {/* Metric Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Final Net Score</span>
              <p className="text-3xl font-black text-amber-700 font-mono mt-1">
                {selectedAttempt.score.toFixed(2)}
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">out of {selectedAttempt.totalMarks} Marks</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Accuracy Rate</span>
              <p className="text-3xl font-black text-emerald-700 font-mono mt-1">
                {selectedAttempt.accuracy.toFixed(1)}%
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold">TSLPRB Benchmark</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Time Taken</span>
              <p className="text-xl font-black text-blue-700 font-mono mt-2">
                {formatSeconds(selectedAttempt.timeSpentSeconds || 3600)}
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">3 Hours Allowed</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">State Percentile</span>
              <p className="text-3xl font-black text-purple-700 font-mono mt-1">
                92.4%
              </p>
              <span className="text-[11px] text-purple-700 font-semibold">Top 8% in State</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">State Rank</span>
              <p className="text-3xl font-black text-slate-800 font-mono mt-1">
                #{selectedAttempt.stateRank || 142}
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">Among 12,400+ Candidates</span>
            </div>
          </div>

          {/* Negative Marking Breakdown Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Each correct answer awards <strong>+1.00 Mark</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Each wrong answer deducts <strong>-0.25 Penalty</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Unattempted questions receive <strong>0.00</strong> penalty</span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. PAST ATTEMPTS SELECTION LIST                                           */}
      {/* ========================================================================= */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          <span>Past Examination History & Attempt Archive</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Examination Title</th>
                <th className="px-4 py-3">Date Taken</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">State Rank</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attempts.map((att) => (
                <tr 
                  key={att.id} 
                  className={`hover:bg-slate-50/80 transition-colors ${
                    selectedAttempt?.id === att.id ? 'bg-amber-50/40 font-semibold' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 text-slate-900 font-bold">{att.examTitle}</td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {new Date(att.completedAt || att.startedAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-amber-700 font-bold">
                    {att.score.toFixed(2)} / {att.totalMarks}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-emerald-700 font-bold">{att.accuracy.toFixed(1)}%</td>
                  <td className="px-4 py-3.5 font-mono text-slate-700">#{att.stateRank || '--'}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedAttempt(att)}
                      className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[11px]"
                    >
                      {selectedAttempt?.id === att.id ? 'Viewing' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MULTILINGUAL QUESTION BY QUESTION EXPLANATIONS                         */}
      {/* ========================================================================= */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Detailed Question Solutions & Answers
            </h3>
            <p className="text-xs text-slate-500">
              Review correct options, detailed rationales, and test syllabus mapping.
            </p>
          </div>

          {/* Translation Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <span className="px-2 text-slate-500 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>Language:</span>
            </span>
            <button
              onClick={() => setReviewLang('ENGLISH')}
              className={`px-3 py-1 rounded-xl transition-all ${
                reviewLang === 'ENGLISH' ? 'bg-white text-slate-900 shadow-sm border' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setReviewLang('TELUGU')}
              className={`px-3 py-1 rounded-xl transition-all ${
                reviewLang === 'TELUGU' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setReviewLang('HINDI')}
              className={`px-3 py-1 rounded-xl transition-all ${
                reviewLang === 'HINDI' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setReviewLang('URDU')}
              className={`px-3 py-1 rounded-xl transition-all ${
                reviewLang === 'URDU' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {SAMPLE_QUESTIONS.map((q, idx) => {
            const userAns = selectedAttempt?.answers?.[q.id]?.selectedOption || (idx === 1 ? 'B' : idx === 2 ? 'A' : 'B');
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Q{idx + 1}. {q.subject} • {q.topic}
                  </span>
                  {userAns ? (
                    isCorrect ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct (+1.00)
                      </span>
                    ) : (
                      <span className="text-red-700 font-bold flex items-center gap-1 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                        <XCircle className="w-3.5 h-3.5 text-red-600" /> Incorrect (-0.25)
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500 font-bold flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      <HelpCircle className="w-3.5 h-3.5" /> Not Attempted
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                  {getLocalizedQText(q)}
                </p>
                {reviewLang !== 'ENGLISH' && (
                  <p className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-200">
                    [Original English]: {q.questionText}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  {q.options.map(opt => {
                    const isOptionCorrect = opt.key === q.correctAnswer;
                    const isUserChoice = userAns === opt.key;
                    let style = 'bg-white border-slate-200 text-slate-700';
                    if (isOptionCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                    else if (isUserChoice && !isOptionCorrect) style = 'bg-red-50 border-red-300 text-red-900 font-bold';

                    return (
                      <div key={opt.key} className={`p-2.5 rounded-xl border flex items-center gap-2 ${style}`}>
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0">
                          {opt.key}
                        </span>
                        <span>{getLocalizedOptText(opt)}</span>
                        {isOptionCorrect && <span className="ml-auto text-[10px] text-emerald-700 font-black uppercase">Official Key</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1 mt-2">
                  <p className="text-amber-900 font-bold">
                    Official Answer Rationale:
                  </p>
                  <p className="text-slate-700 leading-relaxed">{getLocalizedExplText(q)}</p>
                  {reviewLang !== 'ENGLISH' && (
                    <p className="text-slate-500 pt-1 border-t border-slate-100 text-[11px]">[English]: {q.explanation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
