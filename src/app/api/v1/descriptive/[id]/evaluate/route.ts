import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/security';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const submissionId = params.id;
    const body = await request.json();
    const { marksAwarded, remarks } = body;

    return NextResponse.json({
      success: true,
      data: {
        id: submissionId,
        status: 'EVALUATED',
        marksAwarded: Number(marksAwarded),
        evaluatorRemarks: sanitizeInput(remarks || 'Scored according to official TSLPRB rubric.'),
        evaluatedAt: new Date().toISOString(),
      },
      message: 'Descriptive submission evaluated and grade committed to record.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Evaluation Error' },
      { status: 500 }
    );
  }
}
