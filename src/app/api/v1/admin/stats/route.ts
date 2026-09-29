import { NextResponse } from 'next/server';

export async function GET() {
  const stats = {
    totalAspirants: 14820,
    telanganaCandidates: 10077,
    apCandidates: 4743,
    totalExamsDelivered: 48920,
    totalQuestionsInBank: 5400,
    pendingDescriptiveReviews: 38,
    monthlyRevenueInr: 1499000,
    activeProPassSubscribers: 4210,
    systemUptime: '99.98%',
    activeLiveConcurrentExams: 312,
  };

  return NextResponse.json({
    success: true,
    data: stats,
    timestamp: new Date().toISOString(),
  });
}
