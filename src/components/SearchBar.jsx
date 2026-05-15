'use client';

/**
 * SearchBar — Full-text search input for blog posts.
 * Debounces input and calls onSearch callback.
 */

import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search articles…' }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={`relative transition-all duration-200 ${focused ? 'scale-[1.01]' : ''}`}>
      {/* Search icon */}
      {/* <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg> */}

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`
          w-full pl-12 pr-20 py-3.5 rounded-xl
          bg-white dark:bg-surface-800/80
          border border-surface-200 dark:border-surface-700
          text-sm font-body text-surface-900 dark:text-surface-100
          placeholder-surface-400 dark:placeholder-surface-500
          focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-400
          transition-all duration-200
        `}
      />

      {/* Keyboard shortcut hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
        {query ? (
          <button
            onClick={() => setQuery('')}
            className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <kbd className="px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 text-[11px] font-mono text-surface-400">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  );
}
