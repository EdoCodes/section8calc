import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  calculatorTopic: z.string().optional(),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: guideSchema,
});

const guidesEs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides-es' }),
  schema: guideSchema,
});

/** Optional long-form articles for high-traffic city pages only. */
const cityArticleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  stateSlug: z.string().min(2),
  citySlug: z.string().min(1),
  /** Overrides default city page &lt;title&gt; when set (first article by order wins). */
  seoTitle: z.string().optional(),
  /** Overrides meta description when set (first article by order wins). */
  seoDescription: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  /** Lower numbers appear first when multiple articles target one city. */
  order: z.number().default(0),
  extraFaq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
});

const cityArticles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-articles' }),
  schema: cityArticleSchema,
});

const cityArticlesEs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-articles-es' }),
  schema: cityArticleSchema,
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const blogEs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog-es' }),
  schema: blogSchema,
});

export const collections = { guides, 'guides-es': guidesEs, 'city-articles': cityArticles, 'city-articles-es': cityArticlesEs, blog, 'blog-es': blogEs };
