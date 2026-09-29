import { NextResponse } from 'next/server';
import { INITIAL_DESCRIPTIVE_SUBMISSIONS } from '@/lib/mockData';
import { DescriptiveSubmission } from '@/lib/types';
import { sanitizeInput } from '@/lib/security';

let submissions: DescriptiveSubmission[] = [...INITIAL_DESCRIPTIVE_SUBMISSIONS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: submissions,
    total: submissions.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paperType, topic, typedContent, scannedImageUrl } = body;

    const newSubmission: DescriptiveSubmission = {
      id: `desc_${Date.now()}`,
      userId: 'usr_vasu_reddy_si',
      candidateName: 'Vasu Reddy',
      candidateRoll: 'TS-SI-2026-8841',
      paperType: (paperType as any) || 'PAPER_I_ENGLISH',
      topic: sanitizeInput(topic || 'Descriptive Essay Submission'),
      submittedAt: new Date().toISOString(),
      status: 'PENDING_REVIEW',
      typedContent: sanitizeInput(typedContent || ''),
      scannedImageUrl: scannedImageUrl || undefined,
      maxMarks: 50,
      marksAwarded: undefined,
      evaluatorRemarks: 'Awaiting faculty review',
    };

    submissions = [newSubmission, ...submissions];

    return NextResponse.json({
      success: true,
      data: newSubmission,
      message: 'Descriptive paper received and queued for evaluation.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Descriptive Submission Error' },
      { status: 500 }
    );
  }
}
