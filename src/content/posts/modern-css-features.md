---
title: "The New CSS: Container Queries, :has(), and View Transitions"
date: "2025-04-10"
excerpt: "CSS has evolved dramatically in the past year. These three features will change how you build responsive, interactive UIs — no JavaScript required."
category: "CSS"
tags: ["CSS", "Frontend", "Design", "Web Standards"]
author: "DevPulse Team"
featured: true
coverImage: "/images/modern-css.jpg"
---

## CSS Is Having a Renaissance

Remember when CSS was the thing you tolerated between writing JavaScript? Those days are over. The last 18 months have shipped more transformative CSS features than the previous decade.

Three features stand out as genuine game-changers for how we build component-based UIs: Container Queries, the `:has()` pseudo-class, and the View Transitions API.

## Container Queries: Components That Know Their Context

Media queries respond to the viewport. Container queries respond to the **parent element's size**. This is the feature component-based architecture has been waiting for since 2013.

```css
/* Define a containment context */
.card-grid {
  container-type: inline-size;
  container-name: card-grid;
}

/* Style based on the container, not the viewport */
@container card-grid (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
  }
}

@container card-grid (max-width: 599px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

This means the same card component adapts whether it's in a sidebar, a main content area, or a modal — without any JavaScript or prop-based responsive logic.

## The :has() Selector: CSS Gets Conditionals

`:has()` lets you style a parent based on its children. It's effectively a parent selector — the feature CSS developers have requested for 20 years:

```css
/* Style a form group that contains an invalid input */
.form-group:has(input:invalid) {
  border-color: var(--color-error);
}

/* Adjust layout when a figure has a caption */
figure:has(figcaption) {
  display: grid;
  gap: 0.5rem;
}

/* Change nav style when it contains a notification badge */
nav:has(.badge) .nav-icon {
  animation: pulse 2s infinite;
}
```

## View Transitions: Cinematic UI Without a Framework

The View Transitions API adds smooth animated transitions between page states — what previously required React libraries like Framer Motion or GSAP:

```css
/* Define which elements should animate */
.page-title {
  view-transition-name: page-title;
}

.hero-image {
  view-transition-name: hero-image;
}

/* Customize the transition animation */
::view-transition-old(page-title) {
  animation: fade-out 0.3s ease;
}

::view-transition-new(page-title) {
  animation: slide-in 0.3s ease;
}
```

```javascript
// Trigger a view transition in JavaScript
document.startViewTransition(() => {
  updateDOM(); // Your state update
});
```

## Combining All Three

The real power emerges when these features work together:

```css
/* A responsive card that morphs based on container,
   conditionally styles based on content,
   and animates between states */
.product-card {
  container-type: inline-size;
  view-transition-name: product-card;
}

@container (min-width: 400px) {
  .product-card {
    flex-direction: row;
  }
}

.product-card:has(.out-of-stock) {
  opacity: 0.6;
  filter: grayscale(0.4);
}

.product-card:has(.on-sale) .price {
  color: var(--color-success);
  font-weight: bold;
}
```

## Browser Support

As of early 2025, all three features have strong support:

- **Container Queries**: All modern browsers (Chrome 105+, Safari 16+, Firefox 110+)
- **:has()**: All modern browsers (Chrome 105+, Safari 15.4+, Firefox 121+)
- **View Transitions**: Chrome and Edge (Safari in development, Firefox behind a flag)

## What This Means for React Developers

If you're using Tailwind or CSS Modules with React, you can adopt these features today. Container queries especially reduce the need for JavaScript-based responsive logic, making components lighter and more portable.

The line between "what CSS can do" and "what needs JavaScript" is shifting fast. Stay on the CSS side of that line whenever possible — your bundle size and runtime performance will thank you.
