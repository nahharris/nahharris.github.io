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
  language: z.enum(["en", "pt-BR", "es", "sv", "fr", "it"]),
});
const translationSchema = z.object({
  post: reference("posts"),
  language: z.enum(["en", "pt-BR", "es", "sv", "fr", "it"]),
  title: z.string(),
  description: z.string(),
});
const suffixLanguages: Record<string, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
  sv: "sv",
  fr: "fr",
  it: "it",
};
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
export type TranslationSchema = z.infer<typeof translationSchema>;
export const collections = {
  posts: defineCollection({
    loader: glob({
      pattern: "**/*.md",
      base: "./src/content/posts",
      generateId: ({ entry, data }) => {
        const name = entry.replace(/\\/g, "/");
        const match = name.match(/^(.+)\.(en|pt|es|sv|fr|it)\.md$/);
        if (!match || data.language !== suffixLanguages[match[2]])
          throw new Error("Post filename must end in the matching language suffix: " + name);
        if (
          data.post &&
          (typeof data.post !== "string" ||
            data.post.replace(/\.(en|pt|es|sv|fr|it)$/, "") !== match[1])
        )
          throw new Error("Translation must reference an original with the same filename: " + name);
        return name.slice(0, -3);
      },
    }),
    schema: z.union([blogSchema, translationSchema]),
  }),
  series: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/series" }),
    schema: seriesSchema,
  }),
};
