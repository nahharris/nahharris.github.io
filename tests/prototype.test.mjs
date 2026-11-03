import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
const dist = new URL("../dist/", import.meta.url);
const page = (path) => readFileSync(new URL(path, dist), "utf8");
test("the feed contains all series and posts with search and filters", () => {
  assert.ok(existsSync(new URL("feed/index.html", dist)), "A unified feed must be generated");
  const feed = page("feed/index.html");
  assert.equal(
    (feed.match(/<article[^>]+data-feed-entry/g) || []).length,
    27,
    "All seven series and twenty posts must be discoverable",
  );
  for (const label of ["Search", "Series", "Topic", "Language"])
    assert.ok(feed.includes(label), label);
});
test("posts belong to series and retain their original content", () => {
  const path = "series/patch-hub/renderizando-patches/index.html";
  assert.ok(existsSync(new URL(path, dist)), "Posts must have a URL beneath their series");
  const article = page(path);
  assert.ok(article.includes("diff --git"));
  assert.ok(article.includes("asciinema.org/a/nDKHt1Q1eyg7eKr1xGuZPzJXF"));
  assert.ok(article.includes("/series/patch-hub/logger/"));
  assert.ok(article.includes("/series/patch-hub/ux/"));
  assert.ok(
    !page("series/rs-edn/index.html").includes('id="posts"'),
    "A series without posts omits the Posts section",
  );
});
test("Me and all original URLs remain accessible", () => {
  assert.ok(
    existsSync(new URL("me/index.html", dist)),
    "Me combines the profile, resume, and contact",
  );
  const me = page("me/index.html");
  for (const label of ["Experience", "Education", "Contact", "Brex", "BikeSP"])
    assert.ok(me.includes(label), label);
  const baseline = JSON.parse(
    readFileSync(new URL("./baseline-routes.json", import.meta.url), "utf8"),
  );
  for (const path of baseline)
    assert.ok(existsSync(new URL(path, dist)), "Missing legacy route " + path);
  assert.ok(
    page("blog/patch-hub-03---renderizando-patches/index.html").includes(
      "/series/patch-hub/renderizando-patches/",
    ),
  );
  assert.ok(page("rss.xml").includes("/series/patch-hub/renderizando-patches/"));
});
