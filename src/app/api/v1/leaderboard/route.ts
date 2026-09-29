import { NextResponse } from 'next/server';
import { INITIAL_LEADERBOARD } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  const search = searchParams.get('search')?.toLowerCase() || '';

  let results = INITIAL_LEADERBOARD;

  if (state && state !== 'ALL') {
    results = results.filter((item) => item.targetState === state);
  }

  if (search) {
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.rollNumber.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    data: results,
    totalCandidatesRanked: 14820,
    timestamp: new Date().toISOString(),
  });
}
