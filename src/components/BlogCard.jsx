/**
 * ═══════════════════════════════════════════════════
 * BlogCard — Reusable post preview card
 *
 * Glassmorphism card with hover effects,
 * category badge, reading time, and date.
 * Used on homepage and blog listing page.
 * ═══════════════════════════════════════════════════
 */

import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post, featured = false }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`
          glass-card overflow-hidden
          ${featured ? 'p-0' : 'p-6'}
        `}
      >
        {/* Featured variant has a colored top accent bar */}
        {featured && (
          <div className="h-1 bg-gradient-to-r from-accent-400 via-glow-violet to-glow-emerald" />
        )}

        <div className={featured ? 'p-6 sm:p-8' : ''}>
          {/* Top meta row: category + reading time */}
          <div className="flex items-center justify-between mb-4">
            <span className="tag-pill">
              {post.category}
            </span>
            <span className="text-xs font-mono text-surface-400 dark:text-surface-500">
              {post.readingTime}
            </span>
          </div>

          {/* Post title */}
          <h3
            className={`
              font-display font-bold tracking-tight leading-snug mb-3
              text-surface-900 dark:text-surface-50
              group-hover:text-accent-600 dark:group-hover:text-accent-400
              transition-colors duration-200
              ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}
            `}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Bottom row: date + arrow */}
          <div className="flex items-center justify-between">
            <time
              dateTime={post.date}
              className="text-xs font-mono text-surface-400 dark:text-surface-500"
            >
              {formatDate(post.date)}
            </time>

            {/* Animated arrow indicator */}
            <span className="flex items-center gap-1 text-xs font-medium text-accent-500 dark:text-accent-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
              Read more
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>

          {/* Tags row */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-200/50 dark:border-surface-700/50">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
