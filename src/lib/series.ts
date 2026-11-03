import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

import type { BlogSchema, TranslationSchema } from "../content.config";
import createSlug from "./createSlug";
export type Post = CollectionEntry<"posts"> & { data: BlogSchema };
export type Translation = CollectionEntry<"posts"> & { data: TranslationSchema };
export const isOriginalPost = (entry: CollectionEntry<"posts">): entry is Post =>
  !("post" in entry.data);
export async function getOriginalPosts(): Promise<Post[]> {
  return (await getCollection("posts")).filter(isOriginalPost);
}
export async function getTranslations(): Promise<Translation[]> {
  return (await getCollection("posts")).filter(
    (entry): entry is Translation => "post" in entry.data,
  );
}
export const originalPostId = (post: Post) => post.id.replace(/\.(en|pt|es|sv|fr|it)$/, "");
export type Series = CollectionEntry<"series">;
export const seriesUrl = (series: Series | string) =>
  "/series/" + (typeof series === "string" ? series : series.id) + "/";
export const postUrl = (post: Post) => seriesUrl(post.data.series.id) + post.data.postSlug + "/";
export const legacyPostUrl = (post: Post) =>
  "/blog/" + createSlug(post.data.title, originalPostId(post));
export const shortTitle = (title: string) =>
  title.replace(/^\[(?:Patch-Hub|MAC0470)\s*#?\d+\]\s*-\s*/i, "");
export const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
export const languageLabel = (language: string) =>
  ({
    en: "English",
    "pt-BR": "Português",
    es: "Español",
    sv: "Svenska",
    fr: "Français",
    it: "Italiano",
  })[language] ?? language;
export const translationUrl = (post: Post, language: string) => postUrl(post) + language + "/";
export async function postTranslations(post: Post) {
  const translations = (await getTranslations()).filter((t) => t.data.post.id === post.id);
  const languages = [post.data.language, ...translations.map((t) => t.data.language)];
  if (new Set(languages).size !== languages.length)
    throw new Error("Duplicate translation language for " + post.id);
  return translations;
}
export async function seriesPosts(id: string) {
  const posts = (await getOriginalPosts()).filter((post) => post.data.series.id === id);
  if (new Set(posts.map((p) => p.data.seriesOrder)).size !== posts.length)
    throw new Error("Duplicate chapter order in " + id);
  return posts.sort((a, b) => a.data.seriesOrder - b.data.seriesOrder);
}
export async function contentIndex() {
  const [series, posts, translations] = await Promise.all([
    getCollection("series"),
    getOriginalPosts(),
    getTranslations(),
  ]);
  for (const translation of translations) {
    const post = posts.find((p) => p.id === translation.data.post.id);
    if (!post) throw new Error("Translation refers to missing post: " + translation.id);
    const siblings = translations.filter(
      (t) => t.data.post.id === post.id && t.data.language === translation.data.language,
    );
    if (translation.data.language === post.data.language || siblings.length !== 1)
      throw new Error("Duplicate translation language for " + post.id);
  }
  const groups = series.map((entry) => {
    const children = posts.filter((post) => post.data.series.id === entry.id);
    const date = new Date(
      Math.max(
        entry.data.pubDate.valueOf(),
        ...children.map((p) => (p.data.updatedDate ?? p.data.pubDate).valueOf()),
      ),
    );
    return {
      entry,
      posts: children,
      date,
      languages: [
        ...new Set(
          children.length
            ? children.flatMap((p) => [
                p.data.language,
                ...translations.filter((t) => t.data.post.id === p.id).map((t) => t.data.language),
              ])
            : ["en"],
        ),
      ],
    };
  });
  return {
    series: groups.sort(
      (a, b) => b.date.valueOf() - a.date.valueOf() || a.entry.id.localeCompare(b.entry.id),
    ),
    translations,
    posts: posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
  };
}

export interface FeedItem {
  id: string;
  type: "series" | "project" | "post";
  title: string;
  description: string;
  url: string;
  seriesId: string;
  seriesTitle: string;
  date: Date;
  tags: string[];
  languages: string[];
  color: string;
  image?: string;
  count?: number;
}
export async function feedItems(): Promise<FeedItem[]> {
  const { series, posts, translations } = await contentIndex();
  const entries: FeedItem[] = series.map(({ entry, date, languages, posts }) => ({
    id: "series:" + entry.id,
    type: posts.length ? "series" : "project",
    title: entry.data.title,
    description: entry.data.description,
    url: seriesUrl(entry),
    seriesId: entry.id,
    seriesTitle: entry.data.title,
    date,
    tags: entry.data.tags,
    languages,
    color: entry.data.color,
    image: entry.data.heroImage,
    count: posts.length,
  }));
  for (const post of posts) {
    const group = series.find((s) => s.entry.id === post.data.series.id)!;
    entries.push({
      id: "post:" + post.id,
      type: "post",
      title: shortTitle(post.data.title),
      description: post.data.description,
      url: postUrl(post),
      seriesId: group.entry.id,
      seriesTitle: group.entry.data.title,
      date: post.data.pubDate,
      tags: post.data.tags,
      languages: [
        post.data.language,
        ...translations.filter((t) => t.data.post.id === post.id).map((t) => t.data.language),
      ],
      color: group.entry.data.color,
    });
  }
  return entries.sort(
    (a, b) =>
      b.date.valueOf() - a.date.valueOf() ||
      (a.type === b.type
        ? a.id.localeCompare(b.id)
        : a.type === "post"
          ? 1
          : b.type === "post"
            ? -1
            : a.id.localeCompare(b.id)),
  );
}
