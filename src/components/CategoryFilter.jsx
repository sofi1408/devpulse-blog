'use client';

/**
 * CategoryFilter — Horizontal scrollable category pills
 * for filtering blog posts by category or tag.
 */

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* "All" option */}
      <button
        onClick={() => onSelect(null)}
        className={`
          shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            !activeCategory
              ? 'bg-accent-500 text-white shadow-sm shadow-accent-500/20'
              : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
          }
        `}
      >
        All Posts
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              activeCategory === cat
                ? 'bg-accent-500 text-white shadow-sm shadow-accent-500/20'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
