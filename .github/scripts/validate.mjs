#!/usr/bin/env node
// MDX validator for IC-Content lesson + concept-card files.
//
// Designed to be invoked from a GitHub Action via `npx -p` so this repo
// stays dependency-free (no package.json, no node_modules, no Dependabot).
// The validator pulls @mdx-js/mdx, remark-gfm, and gray-matter at run-time
// and compiles every lesson.md / concept-cards.md with the same pipeline
// agent-x's runtime (next-mdx-remote/rsc) uses, so any failure here is a
// failure that would otherwise crash a Vercel build.
//
// Catches the bare `{` / `}` / `<` / `>` table-cell footgun: MDX reads bare
// braces as JSX expressions and bare angle brackets as JSX tag starts.
// Wrap them in backticks (`{`, `<`) inside table cells.
//
// Usage:
//   npx -p @mdx-js/mdx@^3.1.1 -p remark-gfm@^4.0.1 -p gray-matter@^4.0.3 \
//       node .github/scripts/validate.mjs
//
// Exit code: 0 if every file compiles, 1 if any fail.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";

// IC-Content layout: foundation/<F##-slug>/{lesson,concept-cards}.md
//                    modules/<##-slug>/{lesson,concept-cards}.md
// Match the runtime resolver in IC-Page/agent-x/lib/content.ts:24-25.
const ROOT = process.cwd();
const TRACK_DIRS = [
  { label: "foundation", dir: path.join(ROOT, "foundation") },
  { label: "web (modules/)", dir: path.join(ROOT, "modules") },
];
const MDX_FILES = ["lesson.md", "concept-cards.md"];

async function collectFiles() {
  const collected = [];
  for (const { label, dir } of TRACK_DIRS) {
    if (!existsSync(dir)) {
      console.warn(`skip: ${label} (${dir}) does not exist`);
      continue;
    }
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      // Skip template/scaffold folders.
      if (entry.name.startsWith("_")) continue;
      for (const fileName of MDX_FILES) {
        const filePath = path.join(dir, entry.name, fileName);
        if (existsSync(filePath)) collected.push(filePath);
      }
    }
  }
  return collected;
}

async function tryCompile(filePath) {
  const raw = await readFile(filePath, "utf8");
  // gray-matter strips frontmatter the same way agent-x's runtime does, so
  // YAML in the file head is not sent to the MDX compiler.
  const { content } = matter(raw);
  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
    return null;
  } catch (err) {
    const pos = err.place ?? err.position ?? null;
    return {
      message: err.message ?? String(err),
      line: pos?.start?.line ?? null,
      column: pos?.start?.column ?? null,
    };
  }
}

function rel(p) {
  return path.relative(ROOT, p);
}

async function main() {
  console.log(`Validating MDX in ${ROOT}\n`);
  const files = await collectFiles();
  if (files.length === 0) {
    console.error("no lesson files found — is this an IC-Content checkout?");
    process.exit(2);
  }

  let okCount = 0;
  const failures = [];
  for (const filePath of files) {
    const err = await tryCompile(filePath);
    if (err === null) {
      okCount++;
      console.log(`ok   ${rel(filePath)}`);
    } else {
      failures.push({ filePath, err });
      const where = err.line != null ? `:${err.line}${err.column != null ? `:${err.column}` : ""}` : "";
      console.log(`FAIL ${rel(filePath)}${where}`);
      console.log(`     ${err.message}`);
    }
  }

  console.log("");
  if (failures.length === 0) {
    console.log(`all ${okCount} file(s) compile cleanly`);
    process.exit(0);
  }

  console.log(`${failures.length} of ${files.length} file(s) failed`);
  console.log("");
  console.log("Hints for common failures:");
  console.log("  • bare `{` or `}` in a table cell → wrap in backticks: `{`");
  console.log("  • bare `<` or `>` in a table cell → wrap in backticks: `<`");
  console.log("  • unclosed code fence → check ``` count is even within the file");
  console.log("  • JSX-looking text outside fences → escape with backticks or HTML entities");
  process.exit(1);
}

main().catch((err) => {
  console.error("validator crashed:", err);
  process.exit(2);
});
