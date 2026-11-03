# Hannah Harrisonn — personal site

A static personal site built with Astro and Markdown, using a Catppuccin Mocha-inspired Pixel Press + Workshop design.

## Development

Use Bun 1.4.4, as configured in mise.toml.

```powershell
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 4321
```

Build with `bun run build`; preview the static output with `bun run preview --host 127.0.0.1 --port 4321`.

## Content

The site has five page types: Home, Feed, Series, Post, and Me. Series are project or topic entrypoints and may contain zero posts. Every post belongs to one series.

- src/content/series: Markdown overviews, resources, and project links.
- src/content/posts: original articles, with series, seriesOrder, postSlug, and language frontmatter.
- src/data/profile.ts: experience, education, technologies, and contact details.

The Feed combines recent series activity and published posts. Its search and filters run locally in the browser; the full feed is available without JavaScript. Previous blog, project, tag, and resume URLs remain as redirects.

## Checks

`bun run build`, `node --test tests/prototype.test.mjs`, and `git diff --check`. See PROTOTYPE.md for the migration mapping and local preview notes.

The existing GitHub Pages workflow publishes only when changes are pushed to main. This local worktree has not been published.

## Icons

Use Lucide components from `react-icons/lu` for UI icons, including arrows, decorative symbols, and status indicators. Do not use Unicode glyphs or icon fonts as substitutes. Portraits and the earring favicon use the selected personal branding assets.
