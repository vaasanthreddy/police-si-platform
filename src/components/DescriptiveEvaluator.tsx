'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DescriptiveSubmission } from '../lib/types';
import { INITIAL_DESCRIPTIVE_SUBMISSIONS } from '../lib/mockData';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Award, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';

export const DescriptiveEvaluator: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<DescriptiveSubmission[]>(INITIAL_DESCRIPTIVE_SUBMISSIONS);
  const [paperType, setPaperType] = useState<'PAPER_I_ENGLISH' | 'PAPER_II_TELUGU'>('PAPER_I_ENGLISH');
  const [topic, setTopic] = useState('Role of Drone Surveillance and Smart Technology in Border/Highway Patrol');
  const [essayContent, setEssayContent] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeTab, setActiveTab] = useState<'NEW_SUBMISSION' | 'SUBMISSION_HISTORY'>('NEW_SUBMISSION');

  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;

  const handleSimulateAiGrading = () => {
    if (wordCount < 40) {
      alert('Please write at least 40 words to generate an AI evaluation.');
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      const newSubmission: DescriptiveSubmission = {
        id: `desc_sub_${Date.now()}`,
        userId: user?.id || 'usr_demo',
        candidateName: user?.name || 'Vasu Reddy',
        candidateRoll: user?.rollNumber || 'TS-SI-2026-8841',
        paperType,
        topic,
        typedContent: essayContent,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'EVALUATED',
        marksAwarded: 42,
        maxMarks: 50,
        evaluatorRemarks: 'Strong legal grounding and modern policing perspective. Coherent flow between paragraphs. Excellent vocabulary on drone surveillance protocols.',
        rubricScores: {
          contentRelevance: 13,
          vocabularyGrammar: 13,
          organizationStructure: 8,
          expressionStyle: 8,
        },
      };

      setSubmissions([newSubmission, ...submissions]);
      setIsEvaluating(false);
      setActiveTab('SUBMISSION_HISTORY');
      setEssayContent('');
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Descriptive Paper Module (FWE Paper I & II)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complies with PRD Section 3.2. Type essays/precis or submit handwritten answer sheets for automated & examiner rubric grading.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('NEW_SUBMISSION')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'NEW_SUBMISSION'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Submit Essay / Answer
          </button>
          <button
            onClick={() => setActiveTab('SUBMISSION_HISTORY')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'SUBMISSION_HISTORY'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Evaluations ({submissions.length})
          </button>
        </div>
      </div>

      {activeTab === 'NEW_SUBMISSION' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Examination Paper Type
              </label>
              <select
                value={paperType}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setPaperType(val);
                  if (val === 'PAPER_I_ENGLISH') {
                    setTopic('Role of Drone Surveillance and Smart Technology in Border/Highway Patrol');
                  } else {
                    setTopic('శాంతిభద్రతల పరిరక్షణలో నూతన సాంకేతిక పరిజ్ఞానం వినియోగం (Use of Technology in Law & Order)');
                  }
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-purple-500"
              >
                <option value="PAPER_I_ENGLISH">Paper I: English (Essay & Precis Writing)</option>
                <option value="PAPER_II_TELUGU">Paper II: Telugu / Regional Language (Descriptive)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active Official Essay Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Typing Area or Upload Option */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Compose Answer (300 - 500 words target)
                </label>
                <span className="text-xs font-mono font-bold text-purple-700">
                  {wordCount} words
                </span>
              </div>
              <textarea
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                placeholder="Type your essay or precis composition here. Focus on clear paragraph transitions, legal citations (IPC/CrPC if relevant), and constitutional provisions..."
                className="w-full h-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-purple-500 focus:bg-white resize-none font-serif"
              />
            </div>

            {/* Handwritten File Upload Option (PRD 3.2 & 5 File Storage) */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700">
                Or Upload Handwritten Sheets
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50">
                <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  Upload Answer Sheet Photos
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  JPG / PNG / PDF up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-3 text-xs text-slate-600 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-purple-50 file:text-purple-800 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-purple-800">
                  <Award className="w-3.5 h-3.5" /> Official Evaluation Rubric
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Papers are graded on: Content & Legal Depth (15M), Grammar & Vocabulary (15M), Paragraph Flow (10M), and Style (10M).
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              onClick={handleSimulateAiGrading}
              disabled={isEvaluating}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Grading Answer...' : 'Submit for Rubric Evaluation'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation History */
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {sub.paperTitle || (sub.paperType === 'PAPER_I_ENGLISH' ? 'Paper I: English' : 'Paper II: Telugu')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">Topic: {sub.topic}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-purple-700 font-mono">
                    {sub.marksAwarded} / {sub.maxMarks}
                  </span>
                  <p className="text-[10px] text-slate-500">Marks Awarded</p>
                </div>
              </div>

              {sub.rubricScores && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Content & Law:</span>
                    <p className="font-bold text-slate-900">{sub.rubricScores.contentRelevance} / 15</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Grammar:</span>
                    <p className="font-bold text-slate-900">{sub.rubricScores.vocabularyGrammar} / 15</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Structure:</span>
                    <p className="font-bold text-slate-900">{sub.rubricScores.organizationStructure} / 10</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Expression:</span>
                    <p className="font-bold text-slate-900">{sub.rubricScores.expressionStyle} / 10</p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">Examiner Feedback: </span>
                <span>{sub.evaluatorRemarks}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
