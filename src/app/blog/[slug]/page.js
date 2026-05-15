/**
 * ═══════════════════════════════════════════════════
 * Blog Detail Page — /blog/[slug]
 *
 * Renders a full blog post with:
 * - Reading progress bar
 * - Estimated reading time
 * - Table of contents (desktop sidebar)
 * - Beautiful prose typography
 * - Syntax-highlighted code blocks
 * - Share buttons
 * - Related posts
 * ═══════════════════════════════════════════════════
 */

import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import RelatedPosts from '@/components/RelatedPosts';
import Newsletter from '@/components/Newsletter';
import Link from 'next/link';

/* ── Static path generation for all posts ───────── */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

/* ── Dynamic metadata for SEO ───────────────────── */
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress />

      <article className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* ── Article Header ───────────────────── */}
          <header className="max-w-3xl mb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm font-mono text-surface-400 dark:text-surface-500 mb-6">
              <Link
                href="/blog"
                className="hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-surface-600 dark:text-surface-300 truncate">
                {post.title}
              </span>
            </nav>

            {/* Category badge */}
            <span className="tag-pill mb-4 inline-block">{post.category}</span>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-surface-900 dark:text-surface-50 mb-6 text-balance">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mb-6 max-w-2xl">
              {post.excerpt}
            </p>

            {/* Meta row: author, date, reading time, share */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-glow-violet flex items-center justify-center text-white text-xs font-bold">
                  {post.author?.charAt(0) || 'D'}
                </div>
                <span className="font-medium text-surface-700 dark:text-surface-300">
                  {post.author}
                </span>
              </div>

              <time
                dateTime={post.date}
                className="font-mono text-surface-400 dark:text-surface-500"
              >
                {formatDate(post.date)}
              </time>

              <span className="font-mono text-surface-400 dark:text-surface-500">
                {post.readingTime}
              </span>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </header>

          {/* ── Main Content + TOC Sidebar ────────── */}
          <div className="flex gap-12">
            {/* Article body */}
            <div
              className="prose prose-lg dark:prose-invert max-w-3xl flex-1 min-w-0"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Sidebar TOC (desktop only) */}
            {post.headings && post.headings.length > 0 && (
              <aside className="hidden xl:block w-64 shrink-0">
                <TableOfContents headings={post.headings} />
              </aside>
            )}
          </div>

          {/* ── Tags at bottom ───────────────────── */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mt-12 pt-8 border-t border-surface-200 dark:border-surface-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?category=${encodeURIComponent(tag)}`}
                    className="tag-pill"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Related Posts ────────────────────── */}
          <div className="max-w-6xl">
            <RelatedPosts posts={post.relatedPosts} />
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <Newsletter />
    </>
  );
}
