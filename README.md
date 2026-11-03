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

The site has five page types: Home, Feed, Series, Post, and Me. Series are project or topic entrypoints and may contain zero posts. An entry with no posts is presented as a project; once it has posts, it is presented as a series. Every post belongs to one series.

- src/content/series: Markdown overviews, resources, and project links.
- src/content/posts: original articles and translations side by side, each named `<post>.<language>.md`. Original articles carry series, seriesOrder, postSlug, and language frontmatter.
- src/data/profile.ts: experience, education, technologies, and contact details.

The Feed combines recent series activity and published posts. Its search and filters run locally in the browser; the full feed is available without JavaScript. Previous blog, project, tag, and resume URLs remain as redirects.

To translate a post, add a Markdown file next to its original in `src/content/posts`, using the same filename stem and a language suffix: for example, `vaca-lang-summer-project.en.md` and `vaca-lang-summer-project.pt.md`. Set `post` to the original filename without `.md` (including its language suffix), and provide `language`, `title`, and `description` in the translation frontmatter. Use `pt` in filenames for `pt-BR` content; the other filename suffixes are `en`, `es`, `sv`, `fr`, and `it`. Each language can occur once per post. The original keeps its existing URL; translations live at `/series/<series>/<post>/<language>/`. The language switcher appears when a translation exists. Supported codes are `en`, `pt-BR`, `es`, `sv`, `fr`, and `it`; only published translations are shown.

## Checks

`bun run build`, `node --test tests/prototype.test.mjs`, and `git diff --check`. See PROTOTYPE.md for the migration mapping and local preview notes.

The existing GitHub Pages workflow publishes only when changes are pushed to main. This local worktree has not been published.

## Icons

Use Lucide components from `react-icons/lu` for UI icons, including arrows, decorative symbols, and status indicators. Do not use Unicode glyphs or icon fonts as substitutes. Portraits and the earring favicon use the selected personal branding assets.
