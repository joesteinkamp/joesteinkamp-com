import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // If set, the post links out instead of rendering a local page.
    external: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.union([z.number(), z.string()]).optional(),
    role: z.string().optional(),
    summary: z.string().optional(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    // Controls the gradient treatment on cards (see global.css).
    accent: z.enum(['p1', 'p2', 'p3', 'p4']).default('p1'),
    // Representative project image shown (desaturated, with a scrim) on the
    // work card. Projects without one fall back to the bare accent gradient.
    cardImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

const hhmm = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hhmm' }),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    films: z.number().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { writing, projects, hhmm };
