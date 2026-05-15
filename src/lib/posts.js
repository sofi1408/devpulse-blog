/**
 * ═══════════════════════════════════════════════════
 * Post Library — Markdown Blog Engine
 *
 * Reads .md files from /src/content/posts, parses
 * YAML frontmatter with gray-matter, and converts
 * markdown body to HTML with remark.
 *
 * Designed for easy integration with AI-generated
 * content: just drop a .md file with valid frontmatter
 * and it's instantly available.
 * ═══════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * Get sorted array of all blog posts with frontmatter metadata.
 * Used on the homepage and blog listing page.
 */
export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        readingTime: stats.text,
        ...data,
      };
    });

  // Sort by date descending (newest first)
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get all unique categories from every post.
 */
export function getAllCategories() {
  const posts = getSortedPosts();
  const categories = new Set();
  posts.forEach((post) => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories);
}

/**
 * Get all unique tags across all posts.
 */
export function getAllTags() {
  const posts = getSortedPosts();
  const tags = new Set();
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
}

/**
 * Get all valid post slugs for static path generation.
 */
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }));
}

/**
 * Get a single post by slug with full HTML content.
 * Includes reading time, table of contents extraction,
 * and related post suggestions.
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML with GFM support (tables, strikethrough, etc.)
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  // Calculate reading time
  const stats = readingTime(content);

  // Extract headings for table of contents
  const headings = extractHeadings(content);

  // Find related posts (same category or overlapping tags)
  const allPosts = getSortedPosts();
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== slug &&
        (post.category === data.category ||
          (post.tags && data.tags && post.tags.some((t) => data.tags.includes(t))))
    )
    .slice(0, 3);

  return {
    slug,
    contentHtml,
    readingTime: stats.text,
    headings,
    relatedPosts,
    ...data,
  };
}

/**
 * Extract h2 and h3 headings from raw markdown for TOC generation.
 */
function extractHeadings(markdownContent) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length; // 2 or 3
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ level, text, id });
  }

  return headings;
}
