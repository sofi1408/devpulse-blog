/**
 * ═══════════════════════════════════════════════════
 * Home Page
 *
 * Sections:
 * 1. Hero — large headline with CTA
 * 2. Featured Posts — highlighted articles
 * 3. Latest Posts — chronological list
 * 4. Categories — browseable tag cloud
 * 5. Newsletter — email subscription
 * ═══════════════════════════════════════════════════
 */

import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { getSortedPosts, getAllCategories } from '@/lib/posts';
import Link from 'next/link';

export default function HomePage() {
  const allPosts = getSortedPosts();
  const featuredPosts = allPosts.filter((p) => p.featured);
  const latestPosts = allPosts.slice(0, 6);
  const categories = getAllCategories();

  return (
    <>
      {/* ── 1. Hero Section ───────────────────── */}
      <Hero />

      {/* ── 2. Featured Posts ─────────────────── */}
      {featuredPosts.length > 0 && (
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono font-medium text-accent-500 dark:text-accent-400 uppercase tracking-wider mb-2 block">
                  Featured
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
                  Editor&apos;s Picks
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
              >
                View all
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.slice(0, 3).map((post, i) => (
                <div
                  key={post.slug}
                  className="animate-fade-up opacity-0"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <BlogCard post={post} featured />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Latest Posts ───────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-surface-50/50 dark:bg-surface-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-mono font-medium text-glow-emerald uppercase tracking-wider mb-2 block">
                Latest
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
                Recent Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
            >
              Browse all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, i) => (
              <div
                key={post.slug}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Categories / Topics ────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono font-medium text-glow-violet uppercase tracking-wider mb-2 block">
            Topics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-4">
            Explore by Category
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-10 max-w-xl mx-auto">
            From AI agent architectures to CSS performance — deep technical content curated for modern developers.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="group relative px-6 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-accent-400/50 bg-white dark:bg-surface-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-400/5 hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300 group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. About / Intro Section ──────────── */}
      <section className="py-16 px-4 sm:px-6 bg-surface-50/50 dark:bg-surface-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-4">
            Built for the AI-Native Developer
          </h2>
          <p className="text-surface-500 dark:text-surface-400 leading-relaxed mb-6">
            DevPulse is an engineering blog designed for the next generation of developers — those who build with AI
            copilots, automate with LLM agents, and ship faster with modern toolchains. Every article is crafted
            to be practical, code-heavy, and immediately applicable to your work.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
          >
            Learn more about DevPulse
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 6. Newsletter ─────────────────────── */}
      <Newsletter />
    </>
  );
}
