import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { postUrl, shortTitle } from "../lib/series";
export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return rss({
    title: "Hannah Harrisonn — posts from the workshop",
    description: "Projects, notes, and things learned along the way.",
    site: context.site,
    items: posts.map((post) => ({
      title: shortTitle(post.data.title),
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post),
    })),
  });
}
