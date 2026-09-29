'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MOCK_EXAMS } from '../../../lib/mockData';
import { ExamPlayer } from '../../../components/ExamPlayer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ExamPage() {
  const params = useParams();
  const examId = params?.id as string;

  const exam = MOCK_EXAMS.find((e) => e.id === examId) || MOCK_EXAMS[0];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      <div className="mb-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Student Dashboard</span>
        </Link>
      </div>

      <ExamPlayer exam={exam} />
    </div>
  );
}
