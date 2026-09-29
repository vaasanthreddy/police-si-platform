'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, Phone, Sparkles } from 'lucide-react';

export const SecurityBanner: React.FC = () => {
  const { user, sessionRemainingMs, toggleSubscription } = useAuth();

  const formatRemainingTime = (ms: number) => {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 relative z-30 font-sans">
      {/* Official Government Recruitment Banner */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">TSLPRB & AP POLICE RECRUITMENT SUITE</span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-400">Sub-Inspector (Civil, AR, TSSP, SAR CPL) & Constable Portal</span>
        </div>
      </div>

      {/* Right side: Inactivity Timer & Candidate Helpline */}
      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-400">
        <div className="hidden md:flex items-center gap-1.5 text-slate-300">
          <Phone className="w-3 h-3 text-khaki-400" />
          <span>Candidate Support: <span className="font-semibold text-slate-200">1800-425-7788</span></span>
        </div>

        {user && (
          <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Session: <span className="font-mono font-medium text-amber-300">{formatRemainingTime(sessionRemainingMs)}</span></span>
            </span>

            {user.role === 'STUDENT' && (
              <button
                onClick={toggleSubscription}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  user.subscriptionTier === 'PREMIUM'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
                title="Toggle Tier access for testing"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>{user.subscriptionTier === 'PREMIUM' ? 'PRO PASS' : 'FREE TIER'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
