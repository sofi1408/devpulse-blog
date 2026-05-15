/**
 * ═══════════════════════════════════════════════════
 * Root Layout
 *
 * The top-level layout for the entire blog. Wraps
 * all pages with:
 * - ThemeProvider (dark/light mode)
 * - Navbar (sticky glassmorphism)
 * - Footer
 * - SEO metadata
 * - Font loading
 * ═══════════════════════════════════════════════════
 */

import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── SEO Metadata ──────────────────────────────── */
export const metadata = {
  title: {
    default: 'DevPulse — AI-Powered Engineering Blog',
    template: '%s | DevPulse',
  },
  description:
    'Deep dives into React, Next.js, AI engineering, and developer productivity. Written by engineers, for engineers.',
  keywords: [
    'React', 'Next.js', 'AI', 'Frontend', 'TypeScript',
    'LLM', 'Engineering Blog', 'Web Development',
  ],
  authors: [{ name: 'DevPulse Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devpulse.dev',
    siteName: 'DevPulse',
    title: 'DevPulse — AI-Powered Engineering Blog',
    description:
      'Deep dives into React, Next.js, AI engineering, and developer productivity.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevPulse',
    description:
      'AI-Powered Engineering Blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content — default to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('devpulse-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-body bg-[var(--color-bg)] text-[var(--color-text-primary)] min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />

          {/* Main content area with nav offset */}
          <main className="flex-1" style={{ paddingTop: 'var(--nav-height)' }}>
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
