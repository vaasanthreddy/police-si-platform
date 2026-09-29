'use client';

import React from 'react';
import { DescriptiveEvaluator } from '../../components/DescriptiveEvaluator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DescriptivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <DescriptiveEvaluator />
    </div>
  );
}
