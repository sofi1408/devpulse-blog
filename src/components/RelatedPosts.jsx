/**
 * RelatedPosts — Grid of related blog post cards.
 * Shown at the bottom of blog detail pages.
 */

import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-surface-200 dark:border-surface-800">
      <h2 className="font-display text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-8">
        Related Articles
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="glass-card p-5">
              <span className="tag-pill mb-3 inline-block">{post.category}</span>
              <h3 className="font-display text-lg font-bold tracking-tight text-surface-900 dark:text-surface-50 group-hover:text-accent-500 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <time className="text-xs font-mono text-surface-400">{formatDate(post.date)}</time>
                <span className="text-xs font-mono text-surface-400">{post.readingTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
