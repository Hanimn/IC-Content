#!/usr/bin/env node
// Inter-lesson markdown link checker.
//
// During the 2026-05 audit we found four broken inter-lesson links from
// directory-rename drift:
//   F09/lesson.md -> ../F10-xor-cipher/README.md   (actual: F10-xor-key)
//   F11/lesson.md -> ../F12-the-computers-notebook/README.md
//   F13/lesson.md -> ../F12-computers-notebook/README.md
//   F10/lesson.md -> ../../advanced/README.md      (does not exist)
//
// All four were 404s for any kid following the recommended path. After
// hand-fixing them, this script catches the regression class for good.
//
// What it checks:
//   - Every relative-path markdown link in foundation/**/*.md and
//     modules/**/*.md (lesson.md, concept-cards.md, README.md)
//   - The target must exist on disk relative to the link's source file
//   - Trailing #anchor fragments are stripped before existence check
//
// What it skips:
//   - http(s)://, mailto:, tel:, ftp:, javascript:, data: URIs
//   - Pure-anchor links (#something) — intra-page, depends on the
//     renderer slugifier, out of scope here.
//   - Lines inside fenced code blocks (``` ... ``` or ~~~ ... ~~~)
//   - Inline code spans (single-backtick) — same reason
//
// This script does not invoke any subprocess. Pure node fs only.
//
// Usage:
//   node .github/scripts/check-links.mjs
//
// Exit code: 0 if every relative link resolves, 1 if any are broken.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TRACK_DIRS = [
  { label: "foundation", dir: path.join(ROOT, "foundation") },
  { label: "modules",    dir: path.join(ROOT, "modules") },
];
const SCAN_NAMES = ["lesson.md", "concept-cards.md", "README.md"];

const EXTERNAL_SCHEME = /^(?:https?|mailto|tel|ftp|javascript|data):/i;

async function collectMdFiles() {
  const collected = [];
  for (const { label, dir } of TRACK_DIRS) {
    if (!existsSync(dir)) {
      console.warn(`skip: ${label} (${dir}) does not exist`);
      continue;
    }
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("_")) continue;
      for (const name of SCAN_NAMES) {
        const filePath = path.join(dir, entry.name, name);
        if (existsSync(filePath)) collected.push(filePath);
      }
    }
  }
  return collected;
}

// Strip fenced code blocks and inline code spans so links that appear inside
// example markdown are not reported. Replace removed regions with same-length
// blank padding to keep line numbers accurate.
function maskCode(text) {
  const fenced = text.replace(/(^|\n)(```|~~~)[\s\S]*?\n\2(?=\n|$)/g, (m) =>
    m.replace(/[^\n]/g, " "),
  );
  return fenced.replace(/`[^`\n]*`/g, (m) => m.replace(/[^\n]/g, " "));
}

function extractLinks(masked) {
  const out = [];
  // Inline links of the form [text](url ...optional title...)
  const inlineRe = /\[(?:[^\]]*)\]\(\s*([^)\s]+?)(?:\s+"[^"]*")?\s*\)/g;
  let m;
  while ((m = inlineRe.exec(masked)) !== null) {
    const idx = m.index;
    const before = masked.slice(0, idx);
    const line = before.split("\n").length;
    const col = idx - before.lastIndexOf("\n");
    out.push({ rawTarget: m[1], line, col, kind: "inline" });
  }
  // Reference-style definitions of the form [label]: url
  const defRe = /^\s{0,3}\[([^\]]+)\]:\s+(\S+)/gm;
  while ((m = defRe.exec(masked)) !== null) {
    const idx = m.index + m[0].indexOf(m[2]);
    const before = masked.slice(0, idx);
    const line = before.split("\n").length;
    const col = idx - before.lastIndexOf("\n");
    out.push({ rawTarget: m[2], line, col, kind: "reference-def" });
  }
  return out;
}

function classifyTarget(rawTarget) {
  if (!rawTarget) return { kind: "skip", why: "empty target" };
  if (EXTERNAL_SCHEME.test(rawTarget)) return { kind: "skip", why: "external" };
  if (rawTarget.startsWith("#")) return { kind: "skip", why: "anchor-only" };
  return { kind: "check" };
}

function rel(p) {
  return path.relative(ROOT, p);
}

async function main() {
  console.log(`Checking inter-lesson links under ${ROOT}\n`);
  const files = await collectMdFiles();
  if (files.length === 0) {
    console.error("no markdown files found — is this an IC-Content checkout?");
    process.exit(2);
  }

  let totalLinks = 0;
  let externalCount = 0;
  let anchorCount = 0;
  const failures = [];

  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const masked = maskCode(raw);
    const links = extractLinks(masked);
    const fileDir = path.dirname(file);

    for (const link of links) {
      totalLinks++;
      const c = classifyTarget(link.rawTarget);
      if (c.kind === "skip") {
        if (c.why === "external") externalCount++;
        if (c.why === "anchor-only") anchorCount++;
        continue;
      }
      const pathPart = link.rawTarget.split("#")[0];
      let decoded;
      try { decoded = decodeURIComponent(pathPart); }
      catch { decoded = pathPart; }
      const resolved = path.resolve(fileDir, decoded);

      if (!existsSync(resolved)) {
        failures.push({
          file,
          line: link.line,
          col: link.col,
          target: link.rawTarget,
          resolved,
        });
      }
    }
  }

  if (failures.length === 0) {
    console.log(`ok   scanned ${files.length} file(s), checked ${totalLinks - externalCount - anchorCount} relative link(s); skipped ${externalCount} external, ${anchorCount} anchor-only`);
    console.log("");
    console.log("all links resolve");
    process.exit(0);
  }

  const byFile = new Map();
  for (const f of failures) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, fails] of byFile) {
    console.log(`FAIL ${rel(file)}`);
    for (const f of fails) {
      console.log(`     line ${f.line}: -> ${f.target}`);
      console.log(`        resolves to: ${rel(f.resolved)} (does not exist)`);
    }
  }
  console.log("");
  console.log(`${failures.length} broken link(s) across ${byFile.size} file(s).`);
  console.log("");
  console.log("Common causes:");
  console.log("  - Folder rename without updating other lessons that link to it (rename-drift)");
  console.log("  - Typo in the slug — double-check against the actual directory name");
  console.log("  - Link points to a planned-but-unbuilt resource — remove or repoint");
  process.exit(1);
}

main().catch((err) => {
  console.error("check crashed:", err);
  process.exit(2);
});
