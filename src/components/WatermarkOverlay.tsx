'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

interface WatermarkOverlayProps {
  showCandidateText?: boolean;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({ showCandidateText = false }) => {
  const { user } = useAuth();

  return (
    <div className="pointer-events-none select-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center">
      {/* Central Official Emblem Watermark on Every Page */}
      <div className="relative w-[360px] h-[360px] md:w-[620px] md:h-[620px] opacity-[0.045] transition-opacity duration-300">
        <Image
          src="/logo.png"
          alt="Police SI Official Emblem Watermark"
          fill
          sizes="(max-width: 768px) 360px, 620px"
          className="object-contain filter contrast-125"
          priority
        />
      </div>

      {/* Security Anti-Leak Tiled Watermark for Proctored Pages & Exams */}
      {showCandidateText && user && (
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-24 p-8 opacity-[0.06] rotate-[-25deg] transform scale-110">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="text-center font-mono text-xs md:text-sm text-slate-800 uppercase tracking-widest font-bold">
              <div>{user.name} • {user.rollNumber}</div>
              <div className="text-[10px] text-slate-600">SLPRB SECURE ID: #{user.phone.slice(-4)}-{idx * 7 + 109}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
