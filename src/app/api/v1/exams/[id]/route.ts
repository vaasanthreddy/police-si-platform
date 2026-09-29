import { NextResponse } from 'next/server';
import { MOCK_EXAMS } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const examId = params.id;
  const exam = MOCK_EXAMS.find((e) => e.id === examId) || MOCK_EXAMS[0];

  if (!exam) {
    return NextResponse.json(
      { success: false, message: 'Mock examination paper not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: exam,
    timestamp: new Date().toISOString(),
  });
}
