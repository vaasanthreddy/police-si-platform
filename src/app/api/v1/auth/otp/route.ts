import { NextResponse } from 'next/server';
import { sanitizeInput, checkRateLimit, isValidIndianMobile } from '@/lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = sanitizeInput(body.phone || '');

    // 1. Rate Limiting Check
    const rate = checkRateLimit(`otp:${phone}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many OTP requests. Please wait ${Math.ceil(rate.resetInMs / 1000)} seconds.`,
          timestamp: new Date().toISOString(),
        },
        { status: 429 }
      );
    }

    // 2. Validate Indian Mobile
    if (phone && !isValidIndianMobile(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid 10-digit Indian mobile number format. (e.g., 9848022338)',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Standard simulated OTP for dev/evaluation: 542918
    return NextResponse.json({
      success: true,
      data: {
        phone,
        message: 'SMS OTP dispatched successfully via Gov Gateway.',
        testOtpHint: '542918',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
