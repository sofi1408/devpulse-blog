---
title: "From Telegram to Production: Automating Blog Publishing with AI"
date: "2025-05-01"
excerpt: "How we built a zero-friction content pipeline that turns a Telegram message into a fully formatted, SEO-optimized blog post in under 60 seconds."
category: "Automation"
tags: ["AI", "Automation", "Telegram", "CI/CD"]
author: "DevPulse Team"
featured: false
coverImage: "/images/telegram-ai.jpg"
---

## The Problem with Traditional Publishing

Every engineering team has a backlog of technical knowledge that never becomes content. The friction of opening a CMS, formatting markdown, adding metadata, and deploying is enough to kill most blog post ideas before they start.

We wanted to reduce the publishing workflow to a single message: type a topic into Telegram, and have a polished blog post live in minutes.

## The Architecture

Our pipeline consists of four stages:

1. **Trigger** — A Telegram bot receives the topic or rough draft
2. **Generate** — An AI model expands it into a full article with code examples
3. **Format** — The output is converted to markdown with proper frontmatter
4. **Deploy** — A Git commit triggers automatic deployment via Vercel/Netlify

```
Telegram Message
    ↓
Telegram Bot API (webhook)
    ↓
AI Content Engine (Claude/GPT)
    ↓
Markdown + Frontmatter Generator
    ↓
Git Push → Auto-Deploy
    ↓
Live Blog Post 🚀
```

## Building the Telegram Bot

The bot is surprisingly simple. We use a webhook-based approach for instant response times:

```javascript
// bot/handler.js
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.command('publish', async (ctx) => {
  const topic = ctx.message.text.replace('/publish ', '');

  await ctx.reply(`✍️ Generating post about: "${topic}"...`);

  // Trigger the content pipeline
  const result = await generateAndPublish(topic);

  if (result.success) {
    await ctx.reply(
      `✅ Published!\n\n` +
      `📝 ${result.title}\n` +
      `🔗 ${result.url}\n` +
      `⏱ Generated in ${result.duration}s`
    );
  }
});
```

## The AI Content Engine

The generation step is where the magic happens. We provide the AI model with structured prompts that ensure consistent quality:

```javascript
async function generatePost(topic) {
  const systemPrompt = `
    You are a senior technical writer at an AI engineering blog.
    Write a detailed, practical blog post about the given topic.

    Requirements:
    - Include real code examples (TypeScript/React preferred)
    - Use clear section headings
    - Include a practical "Getting Started" section
    - End with key takeaways
    - Tone: authoritative but approachable
    - Length: 1200-1800 words
  `;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: `Write a post about: ${topic}` }],
  });

  return response.content[0].text;
}
```

## Frontmatter Generation

Every post needs proper metadata for SEO and rendering. We auto-generate this from the content:

```javascript
function generateFrontmatter(title, content) {
  const excerpt = content.split('\n').find(l => l.length > 50) || '';
  const tags = extractTags(content);
  const date = new Date().toISOString().split('T')[0];

  return [
    '---',
    `title: "${title}"`,
    `date: "${date}"`,
    `excerpt: "${excerpt.slice(0, 160)}"`,
    `category: "${detectCategory(tags)}"`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `author: "DevPulse AI"`,
    `featured: false`,
    '---',
  ].join('\n');
}
```

## Deployment Integration

The final step pushes the new markdown file to the blog's Git repository, triggering an automatic deployment:

```javascript
async function deployPost(slug, content) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  await octokit.repos.createOrUpdateFileContents({
    owner: 'your-org',
    repo: 'devpulse-blog',
    path: `src/content/posts/${slug}.md`,
    message: `feat: add post — ${slug}`,
    content: Buffer.from(content).toString('base64'),
  });

  // Vercel/Netlify auto-deploys on push
  return { success: true, url: `https://devpulse.dev/blog/${slug}` };
}
```

## Results

After two weeks of using this pipeline:

- **23 posts published** (up from ~2/month manually)
- **Average generation time**: 47 seconds
- **Zero formatting issues** thanks to consistent templates
- **SEO scores**: 90+ across all posts

## Key Takeaways

The best content automation doesn't replace human creativity — it removes the friction around it. Our pipeline lets engineers focus on **what** to write about, while AI handles the **how** of formatting, structuring, and publishing.

The entire system took less than a weekend to build. If your team has knowledge worth sharing, the only thing stopping you is the publishing workflow.
