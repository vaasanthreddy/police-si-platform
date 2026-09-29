import { NextResponse } from 'next/server';
import { INITIAL_PET_LOGS } from '@/lib/mockData';
import { PetLogEntry } from '@/lib/types';

let petLogs: PetLogEntry[] = [...INITIAL_PET_LOGS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get('gender') || 'MALE';

  const run1600Logs = petLogs.filter((l) => l.eventType === 'RUN_1600M');
  const best1600Sec = run1600Logs.length > 0 ? Math.min(...run1600Logs.map((l) => l.metricValue)) : 0;

  const longJumpLogs = petLogs.filter((l) => l.eventType === 'LONG_JUMP');
  const bestLongJump = longJumpLogs.length > 0 ? Math.max(...longJumpLogs.map((l) => l.metricValue)) : 0;

  const shotPutLogs = petLogs.filter((l) => l.eventType === 'SHOT_PUT');
  const bestShotPut = shotPutLogs.length > 0 ? Math.max(...shotPutLogs.map((l) => l.metricValue)) : 0;

  const summary = {
    logs: petLogs,
    qualifyingStatus: {
      run1600m: {
        qualified: best1600Sec > 0 && best1600Sec <= 435,
        bestTimeSec: best1600Sec,
        targetSec: 435,
      },
      longJump: {
        qualified: bestLongJump >= 3.8,
        bestDistanceMeters: bestLongJump,
        targetMeters: 3.8,
      },
      shotPut: {
        qualified: bestShotPut >= 5.6,
        bestDistanceMeters: bestShotPut,
        targetMeters: 5.6,
      },
    },
  };

  return NextResponse.json({
    success: true,
    data: summary,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventType, metricValue, notes } = body;

    if (!eventType || metricValue === undefined) {
      return NextResponse.json(
        { success: false, message: 'Missing eventType or metricValue' },
        { status: 400 }
      );
    }

    const val = Number(metricValue);
    const isRun = eventType === 'RUN_1600M' || eventType === 'RUN_800M' || eventType === 'SPRINT_100M';

    const newLog: PetLogEntry = {
      id: `pet_${Date.now()}`,
      userId: 'usr_candidate_9921',
      eventType,
      metricValue: val,
      unit: isRun ? 'seconds' : 'meters',
      loggedDate: new Date().toISOString().split('T')[0],
      isQualified:
        (eventType === 'RUN_1600M' && val <= 435) ||
        (eventType === 'RUN_800M' && val <= 320) ||
        (eventType === 'LONG_JUMP' && val >= 3.8) ||
        (eventType === 'SHOT_PUT' && val >= 5.6) ||
        (eventType === 'SPRINT_100M' && val <= 15.0),
      notes: notes || 'Logged during training session',
    };

    petLogs = [newLog, ...petLogs];

    return NextResponse.json({
      success: true,
      data: newLog,
      message: 'Physical efficiency metric recorded successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'PET Log Error' },
      { status: 500 }
    );
  }
}
