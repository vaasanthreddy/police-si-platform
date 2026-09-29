'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Exam, Question, UserAttempt } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import { setupExamAntiCheatingShortcuts, generateCandidateWatermarkText } from '../lib/security';
import { 
  Clock, 
  ShieldAlert, 
  Languages, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface ExamPlayerProps {
  exam: Exam;
}

export const ExamPlayer: React.FC<ExamPlayerProps> = ({ exam }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [languageMode, setLanguageMode] = useState<'ENGLISH' | 'TELUGU' | 'HINDI' | 'URDU'>(
    user?.primaryLanguage === 'HINDI' ? 'HINDI' : user?.primaryLanguage === 'URDU' ? 'URDU' : 'TELUGU'
  );
  const [timeLeft, setTimeLeft] = useState(exam.durationMins * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);

  // User responses: questionId -> { selectedOption, markedForReview }
  const [answers, setAnswers] = useState<Record<string, { selectedOption?: 'A' | 'B' | 'C' | 'D'; markedForReview: boolean }>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({ [exam.questions[0]?.id || '']: true });

  const currentQ: Question = exam.questions[currentIndex] || exam.questions[0];

  // Helper getters for multi-language display
  const getLocalizedQuestionText = (q: Question) => {
    if (languageMode === 'TELUGU' && q.questionTextTelugu) return q.questionTextTelugu;
    if (languageMode === 'HINDI' && q.questionTextHindi) return q.questionTextHindi;
    if (languageMode === 'URDU' && q.questionTextUrdu) return q.questionTextUrdu;
    return q.questionText;
  };

  const getLocalizedOptionText = (opt: { key: string; text: string; textTelugu?: string; textHindi?: string; textUrdu?: string }) => {
    if (languageMode === 'TELUGU' && opt.textTelugu) return opt.textTelugu;
    if (languageMode === 'HINDI' && opt.textHindi) return opt.textHindi;
    if (languageMode === 'URDU' && opt.textUrdu) return opt.textUrdu;
    return opt.text;
  };

  const getLocalizedExplanation = (q: Question) => {
    if (languageMode === 'TELUGU' && q.explanationTelugu) return q.explanationTelugu;
    if (languageMode === 'HINDI' && q.explanationHindi) return q.explanationHindi;
    if (languageMode === 'URDU' && q.explanationUrdu) return q.explanationUrdu;
    return q.explanation;
  };

  // 1. Anti-cheating & Proctoring setup
  useEffect(() => {
    const cleanupShortcuts = setupExamAntiCheatingShortcuts((reason) => {
      setSecurityWarning(`Security Warning: ${reason}`);
      setTimeout(() => setSecurityWarning(null), 4000);
    });

    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted) {
        setTabSwitchCount((prev) => {
          const nextCount = prev + 1;
          setSecurityWarning(`Proctor Alert: Tab switch detected (${nextCount}/3). Excessive switching will submit your test!`);
          if (nextCount >= 3) {
            handleFinalSubmit();
          }
          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cleanupShortcuts();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSubmitted]);

  // 2. Countdown Timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: key,
        markedForReview: prev[currentQ.id]?.markedForReview || false,
      },
    }));
  };

  const handleClearSelection = () => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: undefined,
        markedForReview: prev[currentQ.id]?.markedForReview || false,
      },
    }));
  };

  const handleToggleMarkReview = () => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: prev[currentQ.id]?.selectedOption,
        markedForReview: !prev[currentQ.id]?.markedForReview,
      },
    }));
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < exam.questions.length) {
      setCurrentIndex(index);
      const targetQ = exam.questions[index];
      if (targetQ) {
        setVisited((prev) => ({ ...prev, [targetQ.id]: true }));
      }
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    // Persist attempt to localStorage for the Results page
    if (typeof window !== 'undefined') {
      let correct = 0;
      let wrong = 0;
      exam.questions.forEach((q) => {
        const sel = answers[q.id]?.selectedOption;
        if (sel === q.correctAnswer) correct++;
        else if (sel) wrong++;
      });
      const pen = wrong * (exam.negativeMarkRate || 0.25);
      const net = Math.max(0, correct * 1 - pen);
      const acc = correct + wrong > 0 ? (correct / (correct + wrong)) * 100 : 0;
      const attemptData = {
        id: `att_${Date.now()}`,
        userId: user?.id || 'usr_candidate_9921',
        examId: exam.id,
        examTitle: exam.title,
        startedAt: new Date(Date.now() - (exam.durationMins * 60 - timeLeft) * 1000).toISOString(),
        completedAt: new Date().toISOString(),
        score: net,
        totalMarks: exam.totalMarks,
        accuracy: acc,
        timeSpentSeconds: exam.durationMins * 60 - timeLeft,
        status: 'COMPLETED',
        stateRank: Math.floor(50 + Math.random() * 150),
        answers,
      };
      localStorage.setItem('police_si_recent_attempt', JSON.stringify(attemptData));
    }
  };

  // Evaluation Metrics
  const totalQuestions = exam.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  exam.questions.forEach((q) => {
    const userSelected = answers[q.id]?.selectedOption;
    if (!userSelected) {
      unattemptedCount++;
    } else if (userSelected === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const penaltyRate = exam.negativeMarkRate || 0.25;
  const positiveMarks = correctCount * 1;
  const penalty = wrongCount * penaltyRate;
  const finalScore = Math.max(0, positiveMarks - penalty);
  const accuracy = correctCount + wrongCount > 0 ? (correctCount / (correctCount + wrongCount)) * 100 : 0;

  return (
    <div className="relative font-sans select-none no-select min-h-[80vh]">
      
      {/* Proctor Security Warning Pop-up */}
      {securityWarning && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 border border-red-400 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-bold tracking-wide">{securityWarning}</span>
        </div>
      )}

      {/* Top Exam Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 mb-4 shadow-sm flex flex-wrap items-center justify-between gap-4 relative z-20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase">
              {exam.examType.replace(/_/g, ' ')}
            </span>
            <span className="text-xs text-slate-500 font-semibold">Total Marks: {exam.totalMarks}</span>
            {exam.isPreviousPaper && (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                Official PYQ {exam.year}
              </span>
            )}
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {exam.title}
          </h1>
        </div>

        {/* Timer, Multi-Language Switcher, and Submit Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Multilingual Selector: English, Telugu, Hindi, Urdu */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <span className="px-2 py-1 text-slate-500 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Lang:</span>
            </span>
            <button
              type="button"
              onClick={() => setLanguageMode('ENGLISH')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                languageMode === 'ENGLISH'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguageMode('TELUGU')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                languageMode === 'TELUGU'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
            <button
              type="button"
              onClick={() => setLanguageMode('HINDI')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                languageMode === 'HINDI'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLanguageMode('URDU')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                languageMode === 'URDU'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            timeLeft < 300 
              ? 'bg-red-50 border-red-300 text-red-700 animate-pulse' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Submit Test */}
          {!isSubmitted && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to finish and submit this test?')) {
                  handleFinalSubmit();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Examination Grid */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-20">
          
          {/* Question Viewport (Left 3 Columns) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[520px]">
            
            {/* Question Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Subject: {currentQ.subject}</span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Marks: <span className="font-bold text-emerald-700">+{currentQ.marks}</span> / <span className="font-bold text-red-600">-{currentQ.negativeMarks}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3 mb-6">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {getLocalizedQuestionText(currentQ)}
                </p>

                {languageMode !== 'ENGLISH' && (
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    [English Original]: {currentQ.questionText}
                  </p>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id]?.selectedOption === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}>
                        {opt.key}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {getLocalizedOptionText(opt)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-slate-100 mt-6">
              <div className="grid grid-cols-2 sm:flex items-center gap-2">
                <button
                  onClick={handleToggleMarkReview}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    answers[currentQ.id]?.markedForReview
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{answers[currentQ.id]?.markedForReview ? 'Flagged' : 'Mark Review'}</span>
                </button>

                <button
                  onClick={handleClearSelection}
                  className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors text-center"
                >
                  Clear Selection
                </button>
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => handleJumpTo(currentIndex - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={currentIndex === totalQuestions - 1}
                  onClick={() => handleJumpTo(currentIndex + 1)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* OMR Question Palette Sidebar (Right 1 Column) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                Question Palette
              </h3>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span> Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500"></span> Not Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-purple-600"></span> Review
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200"></span> Not Visited
                </div>
              </div>

              {/* Numbered Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {exam.questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const hasAnswered = !!ans?.selectedOption;
                  const isMarked = ans?.markedForReview;
                  const hasVisited = visited[q.id];

                  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200'; // Not visited
                  if (isMarked) {
                    colorClass = 'bg-purple-600 text-white border-purple-600 font-bold';
                  } else if (hasAnswered) {
                    colorClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                  } else if (hasVisited) {
                    colorClass = 'bg-amber-500 text-white border-amber-500 font-bold';
                  }

                  if (idx === currentIndex) {
                    colorClass += ' ring-2 ring-amber-400 scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpTo(idx)}
                      className={`h-9 rounded-xl text-xs font-mono flex items-center justify-center border transition-all ${colorClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate Info in Palette */}
            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500">
              <p className="font-bold text-slate-900 truncate">{user?.name || 'Vasu Reddy'}</p>
              <p className="font-mono">{user?.rollNumber || 'TS-SI-2026-8841'}</p>
              <p className="text-emerald-700 font-semibold mt-1">● TSLPRB CBT Mode</p>
            </div>
          </div>

        </div>
      ) : (
        /* Post-Exam Scorecard and Detailed Analysis */
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md relative z-20 space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Examination Result & Scorecard</h2>
            <p className="text-xs text-slate-500">
              {exam.title} • Completed under TSLPRB CBT Pattern
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">Final Net Score</span>
              <p className="text-2xl font-black text-amber-700 font-mono mt-1">
                {finalScore.toFixed(2)} / {exam.totalMarks}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">Accuracy Rate</span>
              <p className="text-2xl font-black text-emerald-700 font-mono mt-1">
                {accuracy.toFixed(1)}%
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">Correct Answers</span>
              <p className="text-2xl font-black text-blue-700 font-mono mt-1">
                {correctCount}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">Negative Penalty</span>
              <p className="text-2xl font-black text-red-600 font-mono mt-1">
                -{penalty.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Question by Question Detailed Solutions */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Detailed Question Explanations (Bilingual)
            </h3>

            {exam.questions.map((q, idx) => {
              const userAns = answers[q.id]?.selectedOption;
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900">Q{idx + 1}. {q.subject}</span>
                    {userAns ? (
                      isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct (+1.00)
                        </span>
                      ) : (
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-red-600" /> Incorrect (-{exam.negativeMarkRate || 0.25})
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 font-bold flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" /> Not Attempted (0.00)
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-900 font-semibold">{getLocalizedQuestionText(q)}</p>
                  {languageMode !== 'ENGLISH' && (
                    <p className="text-xs text-slate-500 italic">[Original English]: {q.questionText}</p>
                  )}

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="text-amber-900 font-semibold">
                      Correct Option: <span className="font-mono text-slate-900 font-bold">{q.correctAnswer}</span> ({getLocalizedOptionText(q.options.find(o => o.key === q.correctAnswer) || q.options[0])})
                    </p>
                    <p className="text-slate-600 leading-relaxed pt-1">{getLocalizedExplanation(q)}</p>
                    {languageMode !== 'ENGLISH' && (
                      <p className="text-slate-500 pt-1 border-t border-slate-100 text-[11px]">[English]: {q.explanation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/results';
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Open in Results Tool</span>
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Return to Student Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
