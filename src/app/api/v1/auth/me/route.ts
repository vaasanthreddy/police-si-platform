import { NextResponse } from 'next/server';
import { INITIAL_USER } from '@/lib/mockData';
import { sanitizeInput } from '@/lib/security';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_USER,
    timestamp: new Date().toISOString(),
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = {
      ...INITIAL_USER,
      ...body,
      name: sanitizeInput(body.name || INITIAL_USER.name),
      email: sanitizeInput(body.email || INITIAL_USER.email),
      phone: sanitizeInput(body.phone || INITIAL_USER.phone),
    };

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Profile configuration updated successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Profile Update Failed' },
      { status: 500 }
    );
  }
}
