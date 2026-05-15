/**
 * ═══════════════════════════════════════════════════
 * Blog Listing Page — /blog
 *
 * Displays all posts with:
 * - Search bar (client-side filtering)
 * - Category filter pills
 * - Responsive card grid
 * - Post count
 * ═══════════════════════════════════════════════════
 */

import { Suspense } from 'react';
import { getSortedPosts, getAllCategories } from '@/lib/posts';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: 'Blog',
  description: 'All articles on DevPulse — AI engineering, React, Next.js, TypeScript, and more.',
};

export default function BlogPage() {
  const posts = getSortedPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-mono font-medium text-accent-500 dark:text-accent-400 uppercase tracking-wider mb-2 block">
            Blog
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50 mb-4">
            All Articles
          </h1>
          <p className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            Practical deep dives into frontend engineering, AI tooling, and the modern developer stack.
          </p>
        </div>
      </section>

      {/* Client-side interactive list (search + filter) */}
      <Suspense fallback={
        <div className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto animate-pulse space-y-4">
            <div className="h-12 bg-surface-200 dark:bg-surface-800 rounded-xl" />
            <div className="h-10 bg-surface-200 dark:bg-surface-800 rounded-xl w-2/3" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[1,2,3].map(i => <div key={i} className="h-64 bg-surface-200 dark:bg-surface-800 rounded-xl" />)}
            </div>
          </div>
        </div>
      }>
        <BlogListClient posts={posts} categories={categories} />
      </Suspense>
    </div>
  );
}
