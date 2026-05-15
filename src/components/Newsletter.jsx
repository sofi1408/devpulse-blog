'use client';

/**
 * Newsletter — Email subscription section
 * with glassmorphism card and gradient accent.
 */

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // In production, integrate with your email service (Resend, Buttondown, etc.)
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-400/10 via-glow-violet/10 to-glow-emerald/10 rounded-2xl blur-xl" />

        <div className="relative glass-card p-8 sm:p-12 text-center">
          {/* Gradient accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-400/10 border border-accent-400/20 mb-6">
            <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium text-accent-500 dark:text-accent-300">Newsletter</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-3">
            Stay in the loop
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-lg mx-auto">
            Weekly deep dives into frontend engineering, AI tooling, and developer productivity.
            No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-glow-emerald/10 border border-glow-emerald/30 text-glow-emerald font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You&apos;re subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-400 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-surface-400 dark:text-surface-500 mt-4">
            Join 2,400+ developers already reading DevPulse.
          </p>
        </div>
      </div>
    </section>
  );
}
