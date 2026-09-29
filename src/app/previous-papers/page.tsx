'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PREVIOUS_PAPERS } from '../../lib/mockData';
import { PreviousPaper, TargetState } from '../../lib/types';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  PlayCircle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Filter,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function PreviousPapersPage() {
  const { user } = useAuth();
  const [selectedState, setSelectedState] = useState<'ALL' | 'TELANGANA' | 'ANDHRA_PRADESH'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = MOCK_PREVIOUS_PAPERS.filter((p) => {
    const matchesState = selectedState === 'ALL' || p.state === selectedState;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.year.toString().includes(searchQuery);
    return matchesState && matchesSearch;
  });

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
            <FileText className="w-8 h-8 text-amber-600" />
            <span>Official Previous Year Question Papers (PYQ Archives)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Practice real TSLPRB & AP Police Sub-Inspector recruitment papers in interactive CBT mode or download PDF answer keys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/pyq-tslprb-si-2022"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Attempt Latest 2022 Solved Paper</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* State Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Cadre:</span>
          </span>
          <button
            onClick={() => setSelectedState('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedState === 'ALL'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All States ({MOCK_PREVIOUS_PAPERS.length})
          </button>
          <button
            onClick={() => setSelectedState('TELANGANA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedState === 'TELANGANA'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Telangana (TSLPRB)
          </button>
          <button
            onClick={() => setSelectedState('ANDHRA_PRADESH')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedState === 'ANDHRA_PRADESH'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Andhra Pradesh Police
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search year or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* PYQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <div 
            key={paper.id} 
            className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wider font-mono">
                  {paper.state === 'TELANGANA' ? 'TSLPRB Police Board' : 'AP Police Board'}
                </span>
                <span className="text-xs font-black text-slate-900 font-mono bg-slate-100 px-2.5 py-1 rounded-full">
                  Year {paper.year}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {paper.title}
              </h3>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Questions</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{paper.totalQuestions} Qs</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total Marks</span>
                  <p className="font-mono font-bold text-amber-700 mt-0.5">{paper.totalMarks} M</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Time</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{paper.durationMins} Mins</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Exam Shift: {paper.examShift}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => alert(`Downloading verified ${paper.year} question paper & official key PDF.`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Official PDF + Key</span>
              </button>

              <Link
                href={`/exam/${paper.examId}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Attempt CBT Paper</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
