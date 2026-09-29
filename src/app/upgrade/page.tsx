'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { 
  Crown, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  QrCode,
  Sparkles,
  Lock,
  Download
} from 'lucide-react';

export default function UpgradePage() {
  const { user, toggleSubscription } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiApp, setUpiApp] = useState<'PHONEPE' | 'GPAY' | 'PAYTM'>('PHONEPE');
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const txId = `TXN-SI-${Math.floor(100000000 + Math.random() * 900000000)}`;
      setTransactionId(txId);
      toggleSubscription();
      setProcessing(false);
      setPaymentDone(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <Crown className="w-8 h-8 text-amber-600" />
            <span>Upgrade to Full SI Pro Pass</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Unlock all 25+ Full-Length PWT CBT Grand Mocks, Descriptive Paper Faculty Evaluations, and State Rankings.
          </p>
        </div>
      </div>

      {paymentDone ? (
        /* Success Screen */
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Payment Successfully Completed!</h2>
            <p className="text-xs text-slate-600">
              Welcome to <strong>Police SI Pro Pass</strong>. All premium mock tests and descriptive paper submissions are now unlocked.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-bold text-slate-900">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-bold text-emerald-700">₹999.00 (Inclusive of GST)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Plan Validity:</span>
              <span className="font-bold text-slate-900">1 Full Year (Until 2027)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-bold text-slate-900">{selectedMethod} ({upiApp})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => alert(`Official Receipt for ${transactionId} downloaded.`)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice (PDF)</span>
            </button>

            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Go to Candidate Dashboard
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout & Payment Gateway Selector */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan Summary (Left 1 Col) */}
          <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400 rounded-3xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Full Year Plan
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-3">SI Pro Pass 2026</h3>
              <p className="text-xs text-slate-500 mt-1">Complete 3-Stage Police Preparation Suite</p>

              <div className="text-3xl font-black text-amber-700 font-mono my-4">
                ₹999 <span className="text-xs font-normal text-slate-500">/ 1 Year</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25+ PWT Grand CBT Mocks (200 M)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Descriptive Paper Faculty Evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Previous 10 Years Solved Question Papers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official PET 1600m / 800m Benchmark Log</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State-wide Live Weekend Rankings</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          {/* Payment Gateway Form (Right 2 Cols) */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">
              Select Preferred Payment Method
            </h3>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'UPI'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-amber-600" />
                <span>UPI / QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('CARD')}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'CARD'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('NETBANKING')}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'NETBANKING'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building className="w-5 h-5 text-amber-600" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* UPI Option */}
            {selectedMethod === 'UPI' && (
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Choose UPI Provider:</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUpiApp('PHONEPE')}
                    className={`p-2.5 rounded-xl border text-center ${
                      upiApp === 'PHONEPE' ? 'bg-purple-50 border-purple-400 text-purple-900 font-bold' : 'bg-white border-slate-200'
                    }`}
                  >
                    PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiApp('GPAY')}
                    className={`p-2.5 rounded-xl border text-center ${
                      upiApp === 'GPAY' ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' : 'bg-white border-slate-200'
                    }`}
                  >
                    Google Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiApp('PAYTM')}
                    className={`p-2.5 rounded-xl border text-center ${
                      upiApp === 'PAYTM' ? 'bg-cyan-50 border-cyan-400 text-cyan-900 font-bold' : 'bg-white border-slate-200'
                    }`}
                  >
                    Paytm UPI
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Or Enter Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    defaultValue="9848022338@ybl"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Card Option */}
            {selectedMethod === 'CARD' && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8912"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NetBanking Option */}
            {selectedMethod === 'NETBANKING' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-700">Popular Banks:</span>
                <select className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Andhra Bank / Union Bank of India</option>
                  <option>Telangana Grameena Bank</option>
                </select>
              </div>
            )}

            {/* Action Pay Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={processing}
                onClick={handleSimulatePayment}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {processing ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹999 & Activate SI Pro Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
