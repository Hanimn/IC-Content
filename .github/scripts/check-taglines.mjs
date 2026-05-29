#!/usr/bin/env node
// Frontmatter tagline sanity check.
//
// During the 2026-05 audit we found three lessons (F08, F09, F10) where the
// `tagline:` field was a copy-paste accident: an interior section header
// had been pasted into the YAML, leaving lines like:
//   tagline: "### Key Ranges to Memorise"
//   tagline: "### What Is a Cipher?"
//
// The user-facing renderer then either showed the literal `### ...` text
// to kids OR rendered it as a broken inner heading. Either way, ugly.
//
// This script catches three variants:
//   1. Tagline starts with markdown heading characters (#, ##, ###, etc.)
//   2. Tagline is empty
//   3. Tagline is shorter than a useful sentence (< 10 chars after trim)
//
// Skips the _template/ folder.
//
// Usage:
//   node .github/scripts/check-taglines.mjs
//
// Exit code: 0 if every lesson has a sensible tagline, 1 if any fail.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TRACK_DIRS = [
  { label: "foundation", dir: path.join(ROOT, "foundation") },
  { label: "modules",    dir: path.join(ROOT, "modules") },
];
const MIN_TAGLINE_LEN = 10;

async function collectLessons() {
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
      const lesson = path.join(dir, entry.name, "lesson.md");
      if (existsSync(lesson)) collected.push(lesson);
    }
  }
  return collected;
}

// Minimal frontmatter extraction: grab the `tagline:` line if it sits between
// the first two `---` markers. Avoids importing gray-matter — keeps this
// script dependency-free so it can run before the validator's npm install.
function extractTagline(raw) {
  const lines = raw.split("\n");
  if (lines[0] !== "---") return { tagline: null, present: false };
  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") { endIdx = i; break; }
  }
  if (endIdx === -1) return { tagline: null, present: false };
  for (let i = 1; i < endIdx; i++) {
    const m = lines[i].match(/^tagline:\s*(.*)$/);
    if (m) {
      let val = m[1].trim();
      // Strip surrounding quotes (YAML scalar) — both ' and ".
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      return { tagline: val, present: true };
    }
  }
  return { tagline: null, present: false };
}

function classify(tagline) {
  if (tagline === null) return { ok: false, reason: "no `tagline:` field in frontmatter" };
  const trimmed = tagline.trim();
  if (trimmed.length === 0) return { ok: false, reason: "tagline is empty" };
  if (/^#+\s/.test(trimmed)) return { ok: false, reason: `tagline starts with markdown heading characters: ${JSON.stringify(trimmed.slice(0, 40))}` };
  if (trimmed.length < MIN_TAGLINE_LEN) return { ok: false, reason: `tagline is too short (${trimmed.length} < ${MIN_TAGLINE_LEN} chars): ${JSON.stringify(trimmed)}` };
  return { ok: true };
}

function rel(p) {
  return path.relative(ROOT, p);
}

async function main() {
  console.log(`Checking lesson taglines under ${ROOT}\n`);
  const lessons = await collectLessons();
  if (lessons.length === 0) {
    console.error("no lesson.md files found — is this an IC-Content checkout?");
    process.exit(2);
  }

  const failures = [];
  for (const file of lessons) {
    const raw = await readFile(file, "utf8");
    const { tagline, present } = extractTagline(raw);
    const verdict = classify(present ? tagline : null);
    if (verdict.ok) {
      console.log(`ok   ${rel(file)}`);
    } else {
      failures.push({ file, reason: verdict.reason });
      console.log(`FAIL ${rel(file)}`);
      console.log(`     ${verdict.reason}`);
    }
  }

  console.log("");
  if (failures.length === 0) {
    console.log(`all ${lessons.length} lesson tagline(s) look sensible`);
    process.exit(0);
  }

  console.log(`${failures.length} of ${lessons.length} tagline(s) failed`);
  console.log("");
  console.log("Fix each by editing the `tagline:` line in the lesson's frontmatter.");
  console.log("A good tagline is one sentence, hooks the reader, and reads well as a subtitle. Examples:");
  console.log(`  tagline: "Julius Caesar encrypted his battle plans with a shift. Modern computers crack it in milliseconds. Let's learn why."`);
  console.log(`  tagline: "Every letter you see on a screen is, underneath, just a number — and Base64 is the trick that lets numbers travel as letters."`);
  process.exit(1);
}

main().catch((err) => {
  console.error("check crashed:", err);
  process.exit(2);
});
