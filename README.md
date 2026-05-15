# DevPulse — AI-Powered Engineering Blog

A modern, developer-focused blog platform built with **Next.js 14**, **Tailwind CSS**, and **Markdown**. Designed for frontend engineers, React developers, and AI enthusiasts.

## Features

- **Next.js App Router** — Server components, SSG, streaming
- **Dark/Light Mode** — System-aware with manual toggle
- **Markdown Blog Engine** — Write in `.md`, get beautiful HTML
- **Search & Filter** — Client-side search with keyboard shortcuts (⌘K)
- **Category Filtering** — Browse by topic
- **Reading Progress Bar** — Visual scroll indicator
- **Table of Contents** — Auto-generated from headings
- **SEO Optimized** — Per-page metadata, Open Graph, Twitter Cards
- **Glassmorphism UI** — Modern glass-blur aesthetic
- **Responsive** — Mobile-first design
- **AI Publishing Pipeline** — (Optional) Publish from Telegram via AI

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

## Writing Blog Posts

Create a new `.md` file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-05-15"
excerpt: "A brief description of the post."
category: "React"
tags: ["React", "Next.js"]
author: "Your Name"
featured: false
---

## Your Content Here

Write your post in standard Markdown...
```

The post will automatically appear on the blog after rebuild (or instant in dev mode).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout (nav, footer, theme)
│   ├── page.js             # Homepage
│   ├── blog/
│   │   ├── page.js         # Blog listing
│   │   ├── BlogListClient  # Client-side search/filter
│   │   └── [slug]/
│   │       └── page.js     # Blog detail page
│   └── about/
│       └── page.js         # About page
├── components/             # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── BlogCard.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── Newsletter.jsx
│   ├── ReadingProgress.jsx
│   ├── TableOfContents.jsx
│   ├── ShareButtons.jsx
│   ├── RelatedPosts.jsx
│   └── ThemeProvider.jsx
├── lib/                    # Utilities and data layer
│   ├── posts.js            # Markdown parsing engine
│   └── utils.js            # Helper functions
└── content/
    └── posts/              # Markdown blog posts
        ├── building-ai-agents-with-react.md
        ├── react-server-components.md
        └── ...
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

Or connect your GitHub repo for auto-deploy on push.

## AI Publishing Pipeline

This blog is designed to integrate with an AI content pipeline:

1. Send a topic to a Telegram bot
2. AI generates the full article with code examples
3. The markdown file is committed to the repo
4. Auto-deploy publishes the post in seconds

See the blog post "From Telegram to Production" for the full architecture.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Content**: Markdown with gray-matter + remark
- **Fonts**: Bricolage Grotesque, DM Sans, JetBrains Mono
- **Deployment**: Vercel / Netlify

## License

MIT
