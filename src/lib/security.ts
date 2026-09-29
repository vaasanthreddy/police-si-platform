/**
 * Cybersecurity Hardening & OWASP Defense Utilities
 * Designed to prevent XSS, Injection, Session Tampering, and CBT Exam Cheating.
 */

// Basic in-memory rate limiter for client requests & brute-force defense
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Checks if an identifier (IP / User ID / Action) has exceeded rate limit
 * @param key unique identifier (e.g. `login:${ip}`)
 * @param maxRequests maximum allowed requests
 * @param windowMs time window in milliseconds
 */
export function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 60000): {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetInMs: Math.max(0, record.resetAt - now) };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count, resetInMs: record.resetAt - now };
}

/**
 * Strips dangerous HTML tags and scripts to prevent Cross-Site Scripting (XSS)
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:[^"']*/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/on\w+=\S+/gi, '')
    .trim();
}

/**
 * HTML entities encoder for safe rendering of raw strings
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates 10-digit Indian Mobile Numbers (TSLPRB/AP Police standard)
 */
export function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Generates an anti-leak exam candidate fingerprint string
 * Tiled diagonally across live exams to prevent smartphone photography leaks
 */
export function generateCandidateWatermarkText(candidateName: string, rollNumber: string): string {
  const ts = new Date().toISOString().replace('T', ' ').substring(0, 16);
  return `${candidateName} | ROLL: ${rollNumber} | SECURE-ID: TSLPRB-${Math.abs(rollNumber.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 99999)} | ${ts}`;
}

/**
 * Disables common browser inspector shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
 * during high-stakes proctored mock examinations
 */
export function setupExamAntiCheatingShortcuts(onViolation?: (reason: string) => void) {
  if (typeof window === 'undefined') return () => {};

  const handleKeyDown = (e: KeyboardEvent) => {
    // F12 DevTools
    if (e.key === 'F12') {
      e.preventDefault();
      onViolation?.('DevTools shortcut (F12) blocked');
      return false;
    }

    // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
      e.preventDefault();
      onViolation?.('Inspect Element shortcut blocked');
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && ['u', 'U'].includes(e.key)) {
      e.preventDefault();
      onViolation?.('View Source shortcut blocked');
      return false;
    }

    // PrintScreen
    if (e.key === 'PrintScreen') {
      onViolation?.('Screen capture attempt recorded');
    }
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    onViolation?.('Right-click context menu is disabled during exam');
    return false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('contextmenu', handleContextMenu);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('contextmenu', handleContextMenu);
  };
}
