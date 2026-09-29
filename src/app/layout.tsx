import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css'; // Global Tailwind styles
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WatermarkOverlay } from '../components/WatermarkOverlay';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Police SI Exam & Practice Platform | TSLPRB & AP Police Preparation',
  description: 'Official recruitment examination and physical efficiency testing platform for Police Sub-Inspector (Civil, AR, TSSP) and Constable aspirants.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased relative selection:bg-amber-100 selection:text-amber-900`}
      >
        <AuthProvider>
          {/* Universal Official Police SI Emblem Watermark on Every Page */}
          <WatermarkOverlay showCandidateText={false} />

          {/* Navigation Bar (Contextual: Home has ONLY Logo & Name; Dashboard pages show respective accessible keys) */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 relative z-10">
            {children}
          </main>

          {/* Official Footer with Candidate Support */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}