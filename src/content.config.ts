import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z.array(z.string()).default([]),
  series: reference("series"),
  seriesOrder: z.number().int().positive(),
  postSlug: z.string().regex(/^[a-z0-9-]+$/),
  language: z.enum(["en", "pt-BR"]),
});
const seriesSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  color: z.enum(["mauve", "peach", "teal", "green"]).default("mauve"),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
});
export type BlogSchema = z.infer<typeof blogSchema>;
export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: blogSchema,
  }),
  series: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/series" }),
    schema: seriesSchema,
  }),
};
