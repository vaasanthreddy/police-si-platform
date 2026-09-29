import { NextResponse } from 'next/server';
import { MOCK_EXAMS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get('examType');

  let results = MOCK_EXAMS;
  if (examType) {
    results = results.filter((e) => e.examType === examType);
  }

  return NextResponse.json({
    success: true,
    data: results,
    total: results.length,
    timestamp: new Date().toISOString(),
  });
}
