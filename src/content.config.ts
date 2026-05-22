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

export const collections = { guides, 'guides-es': guidesEs };
