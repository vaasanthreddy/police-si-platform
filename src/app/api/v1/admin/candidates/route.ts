import { NextResponse } from 'next/server';

let candidates = [
  { id: '1', name: 'Vasu Reddy', email: 'vasu.si.aspirant@gmail.com', phone: '9848022338', state: 'Telangana', targetExam: 'TSLPRB SI Civil', tier: 'PREMIUM', roll: 'TS-SI-2026-8841', testsAttempted: 14, status: 'ACTIVE' },
  { id: '2', name: 'B. Manoj Kumar', email: 'manoj.kumar@gmail.com', phone: '9440122334', state: 'Telangana', targetExam: 'TSLPRB SI AR', tier: 'PREMIUM', roll: 'TS-SI-2026-1029', testsAttempted: 19, status: 'ACTIVE' },
  { id: '3', name: 'P. Sneha Latha', email: 'sneha.ap@gmail.com', phone: '9849123456', state: 'Andhra Pradesh', targetExam: 'AP Police SI', tier: 'PREMIUM', roll: 'AP-SI-2026-5514', testsAttempted: 12, status: 'ACTIVE' },
  { id: '4', name: 'K. Sai Kiran', email: 'saikiran.k@gmail.com', phone: '9908123456', state: 'Telangana', targetExam: 'TSLPRB SI TSSP', tier: 'FREE', roll: 'TS-SI-2026-3112', testsAttempted: 3, status: 'ACTIVE' },
  { id: '5', name: 'M. Divya Jyothi', email: 'divya.police@gmail.com', phone: '9701123456', state: 'Telangana', targetExam: 'TSLPRB SI Civil', tier: 'FREE', roll: 'TS-SI-2026-4431', testsAttempted: 5, status: 'ACTIVE' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  let list = candidates;
  if (search) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.roll.toLowerCase().includes(search) ||
        c.phone.includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    data: list,
    total: list.length,
    timestamp: new Date().toISOString(),
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, tier, status } = body;

    candidates = candidates.map((c) =>
      c.id === id ? { ...c, ...(tier ? { tier } : {}), ...(status ? { status } : {}) } : c
    );

    return NextResponse.json({
      success: true,
      data: candidates.find((c) => c.id === id),
      message: 'Candidate status updated successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Update failed' },
      { status: 500 }
    );
  }
}
