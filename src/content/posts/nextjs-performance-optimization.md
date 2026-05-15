---
title: "Next.js Performance: From 3s to 300ms Load Times"
date: "2025-04-25"
excerpt: "A practical performance audit of a Next.js app — every optimization we applied, measured, and the results that followed."
category: "Performance"
tags: ["Next.js", "Performance", "Web Vitals", "Optimization"]
author: "DevPulse Team"
featured: false
coverImage: "/images/performance.jpg"
---

## The Starting Point

Our e-commerce dashboard loaded in 3.2 seconds on a fast connection. Core Web Vitals were red across the board: LCP at 3.1s, FID at 280ms, CLS at 0.24. Users were complaining, and Google was noticing.

This is the story of how we brought it down to 300ms LCP with zero framework changes — just better architecture and informed decisions.

## Audit Results

We started with Lighthouse and Chrome DevTools Performance tab. The culprits were immediately obvious:

1. **2.4MB JavaScript bundle** — Most of it unused on initial load
2. **Render-blocking CSS** — A 180KB stylesheet loaded synchronously
3. **Unoptimized images** — Hero image was a 1.8MB PNG
4. **Client-side data fetching** — Dashboard data loaded after hydration
5. **No caching strategy** — Every visit hit the origin server

## Fix 1: Route-Based Code Splitting

The single biggest win came from splitting the bundle. Next.js does this automatically per route, but we had accidentally imported heavy libraries at the layout level:

```typescript
// ❌ Before — Chart.js loaded on every page
import { Chart } from 'chart.js/auto';

// ✅ After — Lazy load only when needed
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../components/Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

**Result**: Bundle reduced from 2.4MB to 380KB initial load.

## Fix 2: Image Optimization

Next.js `Image` component handles most of this automatically, but we had several raw `<img>` tags:

```tsx
// ✅ Optimized with next/image
import Image from 'next/image';

<Image
  src="/hero-dashboard.png"
  width={1200}
  height={630}
  alt="Dashboard overview"
  priority           // Preload LCP image
  placeholder="blur" // Show blur while loading
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

**Result**: Hero image went from 1.8MB PNG to 45KB AVIF.

## Fix 3: Server-Side Data Fetching

Moving data fetching from client `useEffect` to server components eliminated the waterfall:

```tsx
// ✅ Data loads at request time on the server
async function DashboardPage() {
  const [metrics, orders, users] = await Promise.all([
    fetchMetrics(),
    fetchRecentOrders(),
    fetchActiveUsers(),
  ]);

  return (
    <Dashboard
      metrics={metrics}
      orders={orders}
      users={users}
    />
  );
}
```

**Result**: Time to first meaningful data dropped from 2.1s to 180ms.

## Fix 4: Aggressive Caching

We added proper cache headers and used Next.js ISR for semi-static pages:

```typescript
// Revalidate dashboard data every 60 seconds
export const revalidate = 60;

// Static pages with on-demand revalidation
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}
```

## The Final Numbers

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | 3.1s | 0.3s | **90% faster** |
| FID | 280ms | 12ms | **96% faster** |
| CLS | 0.24 | 0.01 | **96% better** |
| Bundle Size | 2.4MB | 380KB | **84% smaller** |
| Lighthouse | 34 | 98 | **+64 points** |

## Key Principle

Performance isn't about micro-optimizations — it's about **architecture decisions**. Every fix above was about moving work to the right place: images to the CDN, data to the server, JavaScript to lazy boundaries.

Start with the biggest bottleneck, measure the impact, and move on. Most apps only need 3-4 fixes to go from red to green.
