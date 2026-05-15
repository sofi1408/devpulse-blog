/**
 * ═══════════════════════════════════════════════════
 * Hero Section — Homepage above-the-fold
 *
 * Features a large headline, subtitle, CTA buttons,
 * animated gradient background, and a subtle grid
 * pattern overlay for depth.
 * ═══════════════════════════════════════════════════
 */

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* ── Background layers ─────────────────── */}
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs — two floating blurs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent-400/10 dark:bg-accent-400/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-glow-violet/10 dark:bg-glow-violet/5 blur-[120px] animate-float" style={{ animationDelay: '3s' }} />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* ── Content ───────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-400/30 bg-accent-400/5 mb-8 animate-fade-up opacity-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-glow-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-glow-emerald" />
          </span>
          <span className="text-sm font-medium text-accent-600 dark:text-accent-300 font-body">
            AI-Powered Engineering Blog
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-up opacity-0 stagger-1">
          <span className="text-surface-900 dark:text-surface-50">
            Where Code Meets{' '}
          </span>
          <span className="gradient-text">Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed font-body animate-fade-up opacity-0 stagger-2">
          Deep dives into React, Next.js, AI engineering, and the automation tools
          reshaping how developers build software. Written by engineers, for engineers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 stagger-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-all duration-200 shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5"
          >
            Explore Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#newsletter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border border-surface-300 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800/50 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get the Newsletter
          </Link>
        </div>

        {/* Tech tags */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 animate-fade-up opacity-0 stagger-4">
          {['React', 'Next.js', 'TypeScript', 'AI Agents', 'LLMs', 'Automation'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 border border-surface-200 dark:border-surface-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
