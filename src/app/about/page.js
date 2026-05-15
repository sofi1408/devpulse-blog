/**
 * ═══════════════════════════════════════════════════
 * About Page — /about
 *
 * Describes the blog's mission, the team, and the
 * tech stack powering the platform.
 * ═══════════════════════════════════════════════════
 */

import Newsletter from '@/components/Newsletter';
import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'Learn about DevPulse — an AI-powered engineering blog at the intersection of frontend development and artificial intelligence.',
};

const techStack = [
  { name: 'Next.js', desc: 'App Router, RSC, SSG' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'Markdown', desc: 'Content authoring' },
  { name: 'Vercel', desc: 'Edge deployment' },
  { name: 'AI Pipeline', desc: 'Automated content generation' },
  { name: 'Telegram Bot', desc: 'Publish-from-anywhere workflow' },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Code-First',
    description: 'Every article includes production-ready code examples. We write the code, test it, then explain it.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'AI-Augmented',
    description: 'We use AI tools to accelerate our workflow — from content generation to code review — and share what we learn.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Ship-Fast Culture',
    description: 'We believe in rapid iteration and pragmatic engineering. No over-architecture, no premature optimization.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header ────────────────────────────── */}
      <section className="pt-12 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-400/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-3xl mx-auto relative">
          <span className="text-xs font-mono font-medium text-accent-500 dark:text-accent-400 uppercase tracking-wider mb-2 block">
            About
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50 mb-6">
            Engineering insights,{' '}
            <span className="gradient-text">amplified by AI</span>
          </h1>
          <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mb-8">
            DevPulse is an engineering blog built for modern developers who work at the
            intersection of frontend craft and artificial intelligence. We publish practical,
            code-heavy content that you can apply to your projects today — not theoretical
            hand-waving about the future.
          </p>
          <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
            What makes us different: our entire publishing pipeline is AI-powered. We can go
            from an idea typed into Telegram to a fully formatted, SEO-optimized blog post
            deployed to production in under 60 seconds. We don&apos;t just write about AI — we
            build with it.
          </p>
        </div>
      </section>

      {/* ── Values / Principles ───────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-surface-50/50 dark:bg-surface-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-10 text-center">
            How We Build
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((val) => (
              <div key={val.title} className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-accent-400/10 flex items-center justify-center text-accent-500 dark:text-accent-400 mb-4">
                  {val.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-surface-900 dark:text-surface-50 mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-4 text-center">
            Powered By
          </h2>
          <p className="text-center text-surface-500 dark:text-surface-400 mb-10">
            The tech stack behind this blog — open source, fast, and developer-friendly.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="glass-card p-4 text-center"
              >
                <p className="font-display font-bold text-surface-900 dark:text-surface-50 mb-1">
                  {tech.name}
                </p>
                <p className="text-xs font-mono text-surface-400 dark:text-surface-500">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-4">
            Start Reading
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8">
            Explore our latest articles on AI engineering, React architecture, and developer productivity.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5"
          >
            Browse Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
