'use client';

import React, { useState } from 'react';
import { INITIAL_LEADERBOARD } from '../../lib/mockData';
import { TargetState } from '../../lib/types';
import { Award, Trophy, Medal, Search, Crown } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [selectedState, setSelectedState] = useState<'ALL' | 'TELANGANA' | 'ANDHRA_PRADESH'>('ALL');
  const [search, setSearch] = useState('');

  const filteredRanks = INITIAL_LEADERBOARD.filter((entry) => {
    const matchesState = selectedState === 'ALL' || entry.targetState === selectedState;
    const matchesSearch =
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.rollNumber.toLowerCase().includes(search.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-sm">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          State-Wide Aspirant Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Real-time standardized rankings from the weekly TSLPRB & AP Police SI Grand Mock Examinations (200 Marks).
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* State tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto">
          <button
            onClick={() => setSelectedState('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedState === 'ALL'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Candidates
          </button>
          <button
            onClick={() => setSelectedState('TELANGANA')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedState === 'TELANGANA'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Telangana (TSLPRB)
          </button>
          <button
            onClick={() => setSelectedState('ANDHRA_PRADESH')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedState === 'ANDHRA_PRADESH'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Andhra Pradesh (AP)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or roll number..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>

      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {filteredRanks.slice(0, 3).map((top, idx) => (
          <div
            key={top.userId}
            className={`bg-white border rounded-3xl p-6 text-center relative overflow-hidden shadow-sm ${
              top.rank === 1
                ? 'border-amber-400 ring-2 ring-amber-100 bg-amber-50/20'
                : 'border-slate-200'
            }`}
          >
            <div className="absolute top-4 right-4">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                top.targetState === 'TELANGANA'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {top.targetState === 'TELANGANA' ? 'TS' : 'AP'}
              </span>
            </div>

            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-xl mb-3 shadow-sm"
              style={{
                backgroundColor: top.rank === 1 ? '#F59E0B' : top.rank === 2 ? '#94A3B8' : '#D97706',
                color: '#FFFFFF'
              }}
            >
              #{top.rank}
            </div>

            <h3 className="text-base font-bold text-slate-900">{top.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{top.rollNumber}</p>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Score</span>
                <p className="font-mono font-bold text-slate-900">{top.score} / 200</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Accuracy</span>
                <p className="font-mono font-bold text-emerald-700">{top.accuracy}%</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Avg Time</span>
                <p className="font-mono font-bold text-slate-700">{top.timeTakenMins}m</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Rank List ({filteredRanks.length} Aspirants)</h3>
          <span className="text-xs text-slate-500">Updated after Sunday Grand Mock Evaluation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Rank</th>
                <th className="p-3.5">Candidate Name</th>
                <th className="p-3.5">Roll Number</th>
                <th className="p-3.5">State Recruitment</th>
                <th className="p-3.5">Score (200 M)</th>
                <th className="p-3.5">Accuracy %</th>
                <th className="p-3.5">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRanks.map((entry) => (
                <tr key={entry.userId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold font-mono text-slate-900">
                    <span className={`inline-block w-6 text-center ${
                      entry.rank <= 3 ? 'text-amber-600 font-black' : 'text-slate-500'
                    }`}>
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{entry.name}</td>
                  <td className="p-3.5 font-mono text-slate-600">{entry.rollNumber}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      entry.targetState === 'TELANGANA'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {entry.targetState === 'TELANGANA' ? 'TSLPRB (Telangana)' : 'AP Police'}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700 text-sm">
                    {entry.score} <span className="text-[11px] text-slate-400 font-normal">/ 200</span>
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-slate-800">{entry.accuracy}%</td>
                  <td className="p-3.5 font-mono text-slate-600">{entry.timeTakenMins} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
