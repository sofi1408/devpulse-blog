/**
 * Footer — Site footer with navigation, social links, and branding.
 */

import Link from 'next/link';

const footerLinks = {
  Blog: [
    { label: 'All Articles', href: '/blog' },
    { label: 'AI Engineering', href: '/blog?category=AI+Engineering' },
    { label: 'React', href: '/blog?category=React' },
    { label: 'Performance', href: '/blog?category=Performance' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Newsletter', href: '#newsletter' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter / X', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-400" />
              </span>
              <span className="font-display text-lg font-bold text-surface-900 dark:text-surface-50">
                Dev<span className="gradient-text">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-xs">
              Engineering insights at the intersection of frontend development, AI, and developer productivity.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-4 font-mono">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-600 dark:text-surface-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400 dark:text-surface-500">
            &copy; {new Date().getFullYear()} DevPulse. Built with Next.js, Tailwind CSS, and AI.
          </p>
          <div className="flex items-center gap-1 text-xs text-surface-400 dark:text-surface-500">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-glow-emerald animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
