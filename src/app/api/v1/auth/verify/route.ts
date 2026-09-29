import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/security';
import { INITIAL_USER } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = sanitizeInput(body.phone || '');
    const otp = sanitizeInput(body.otp || '');

    // Allow 542918 or any 6-digit code for testing
    if (otp.length !== 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid OTP length. Please enter the 6-digit verification code.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Generate pseudo-JWT token for frontend storage
    const token = `tslprb_jwt_${Buffer.from(JSON.stringify({ phone, role: 'STUDENT', iat: Date.now() })).toString('base64')}`;
    const refreshToken = `tslprb_rf_${Date.now()}`;

    const user = {
      ...INITIAL_USER,
      phone: phone || INITIAL_USER.phone,
    };

    const response = NextResponse.json({
      success: true,
      data: {
        user,
        token,
        refreshToken,
      },
      message: 'Authentication successful. Welcome to Police SI Platform.',
      timestamp: new Date().toISOString(),
    });

    // Set secure cookie as well
    response.cookies.set('police_si_auth_user', JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Verification Error' },
      { status: 500 }
    );
  }
}
