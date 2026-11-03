# Pixel Press + Workshop

Selected design, developed on branch codex/blog-pixel-workshop. The original main checkout and Console comparison are unchanged. Nothing is published.

## Run

Use Bun 1.4.4 (mise.toml). Install with `bun install --frozen-lockfile`, build with `bun run build`, and preview with `bun run preview --host 127.0.0.1 --port 4321`.

## Structure

- Home: /
- Feed with search and combined filters: /feed/
- Series: /series/:series/
- Posts: /series/:series/:post/
- About, resume, and contact: /me/

All 20 original posts are in src/content/posts. Every post requires a series reference, reading order, stable postSlug, and language. Seven Markdown series in src/content/series provide project and topic overviews; series may contain zero posts. Adding a post updates its parent series and the feed at build time.

The feed combines recent series activity and post publication, newest first. Search matches titles, descriptions, series names, and topics. Type, series, topic, and language filters combine and persist in the URL. Without JavaScript, the complete static feed and all content remain available.

Previous blog URLs (both generated title slugs and filename links), project URLs, pagination, tag URLs, resume, and thesis entrypoint redirect to their new homes. Fragment identifiers are preserved. RSS links to canonical post URLs. The thesis PDF remains at its existing URL. The canonical site domain now matches public/CNAME.

## Content mapping

- Patch Hub: project overview and 4 posts.
- Free Software Diary: all 12 MAC0470 posts.
- rs-edn: project overview, crate, and source links; no posts.
- Lazy Cogs: library overview and 1 post.
- Vaca: language overview and 1 post.
- Tools & Setup: equipment reference and linter tutorial, 2 posts.
- Actor Model outside Distributed Systems: thesis summary, objectives, roadmap, references, and PDF; no posts.

## Verification

Keep checks small: `bun run build`, `node --test tests/prototype.test.mjs`, and `git diff --check`. Three checks cover discovery, nested posts and empty series, and legacy URLs/Me/RSS. Browser review covers desktop/mobile layout, filtering, empty results, deep links, keyboard focus, and reduced motion. Original article text is retained. Six decorative Nerd Font shell prompts in one code example were normalized to ASCII.

Me has print styling and a Print resume action. Typography is self-hosted with its licenses. The pixel workspace is an original local SVG.
