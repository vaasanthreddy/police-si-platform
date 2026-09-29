import { NextResponse } from 'next/server';

export async function GET() {
  const transactions = [
    { id: 'tx_98129', candidate: 'Vasu Reddy', roll: 'TS-SI-2026-8841', plan: 'PRO POLICE SI PASS (1 Year)', amount: 1499, status: 'SUCCESS', method: 'UPI (Razorpay/Billdesk)', date: '2026-09-27 10:14:02' },
    { id: 'tx_98128', candidate: 'B. Manoj Kumar', roll: 'TS-SI-2026-1029', plan: 'PRO POLICE SI PASS (1 Year)', amount: 1499, status: 'SUCCESS', method: 'NetBanking (SBI)', date: '2026-09-27 09:22:15' },
    { id: 'tx_98127', candidate: 'P. Sneha Latha', roll: 'AP-SI-2026-5514', plan: 'PRO POLICE SI PASS (6 Months)', amount: 999, status: 'SUCCESS', method: 'UPI (PhonePe)', date: '2026-09-26 18:40:51' },
    { id: 'tx_98126', candidate: 'R. Akhil Varma', roll: 'TS-SI-2026-7712', plan: 'PRO POLICE SI PASS (1 Year)', amount: 1499, status: 'SUCCESS', method: 'Credit Card (HDFC)', date: '2026-09-26 14:15:30' },
    { id: 'tx_98125', candidate: 'Ch. Suresh', roll: 'TS-SI-2026-0994', plan: 'PRO POLICE SI PASS (1 Year)', amount: 1499, status: 'FAILED', method: 'UPI (Paytm)', date: '2026-09-26 11:05:12' },
  ];

  return NextResponse.json({
    success: true,
    data: transactions,
    totalGrossRevenueInr: 1499000,
    timestamp: new Date().toISOString(),
  });
}
