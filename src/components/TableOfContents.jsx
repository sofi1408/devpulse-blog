'use client';

/**
 * TableOfContents — Sticky sidebar navigation
 * generated from extracted markdown headings.
 * Highlights the current section as the user scrolls.
 */

import { useState, useEffect } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="sticky top-28" aria-label="Table of Contents">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-4 font-mono">
        On this page
      </h4>
      <ul className="space-y-1 border-l border-surface-200 dark:border-surface-700">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`
                block text-sm leading-relaxed transition-all duration-200
                ${heading.level === 3 ? 'pl-6' : 'pl-4'}
                ${
                  activeId === heading.id
                    ? 'text-accent-500 dark:text-accent-400 border-l-2 border-accent-400 -ml-px font-medium'
                    : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
