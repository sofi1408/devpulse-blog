'use client';

/**
 * BlogListClient — Client-side wrapper for the blog listing
 * that handles search and category filtering interactively.
 */

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';

export default function BlogListClient({ posts, categories }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || null;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Filter posts by search query and category
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, searchQuery, activeCategory]);

  return (
    <section className="pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Search + Filter controls */}
        <div className="space-y-4 mb-10">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Post count */}
        <p className="text-sm text-surface-400 dark:text-surface-500 mb-6 font-mono">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {activeCategory ? ` in ${activeCategory}` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
        </p>

        {/* Post grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 mb-4">
              <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">
              No articles found
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
