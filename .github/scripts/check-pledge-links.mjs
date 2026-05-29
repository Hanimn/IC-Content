#!/usr/bin/env node
// Pledge-link presence check.
//
// Every kid-facing module README must link to the Ethical Hacking Pledge,
// because every module either teaches an offensive skill outright (F09 ROT13,
// F10 XOR, F11 strings, F14 hashes, F15 EXIF/stego, every web module) or
// builds toward one. Spaced-repetition ethics matters more for 11-14yos than
// any single ETHICS chapter — one citation in F00 is not enough.
//
// This check fails the build if any README under foundation/F*/ or modules/<N>/
// is missing a link to ETHICAL-HACKING-PLEDGE.md. Skips _template/ folders.
//
// Was added after a 2026-05 audit found 14 of 25 module READMEs had no
// Pledge link. After hand-fixing all 25, this script locks the win in.
//
// Usage:
//   node .github/scripts/check-pledge-links.mjs
//
// Exit code: 0 if every required README links the Pledge, 1 if any are missing.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TRACK_DIRS = [
  { label: "foundation", dir: path.join(ROOT, "foundation") },
  { label: "modules",    dir: path.join(ROOT, "modules") },
];

// Match the literal filename. Any markdown link or bare reference to the
// pledge file passes — we deliberately don't require a specific link shape
// (some READMEs put it in a numbered Quick Start step, some in a top
// blockquote, some in a metadata table — all fine).
const PLEDGE_PATTERN = /ETHICAL-HACKING-PLEDGE\.md/;

async function collectReadmes() {
  const collected = [];
  for (const { label, dir } of TRACK_DIRS) {
    if (!existsSync(dir)) {
      console.warn(`skip: ${label} (${dir}) does not exist`);
      continue;
    }
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      // Skip scaffolder/template directories — they aren't shipped to kids.
      if (entry.name.startsWith("_")) continue;
      const readme = path.join(dir, entry.name, "README.md");
      if (existsSync(readme)) collected.push(readme);
    }
  }
  return collected;
}

function rel(p) {
  return path.relative(ROOT, p);
}

async function main() {
  console.log(`Checking Pledge link presence under ${ROOT}\n`);
  const readmes = await collectReadmes();
  if (readmes.length === 0) {
    console.error("no module READMEs found — is this an IC-Content checkout?");
    process.exit(2);
  }

  const missing = [];
  for (const file of readmes) {
    const text = await readFile(file, "utf8");
    if (PLEDGE_PATTERN.test(text)) {
      console.log(`ok   ${rel(file)}`);
    } else {
      missing.push(file);
      console.log(`FAIL ${rel(file)}  (no reference to ETHICAL-HACKING-PLEDGE.md)`);
    }
  }

  console.log("");
  if (missing.length === 0) {
    console.log(`all ${readmes.length} module README(s) link the Pledge`);
    process.exit(0);
  }

  console.log(`${missing.length} of ${readmes.length} module README(s) missing the Pledge link.`);
  console.log("");
  console.log("Add a reference to ETHICAL-HACKING-PLEDGE.md to each. Common patterns:");
  console.log(`  • Numbered Quick Start step 1:  "1. Read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet."`);
  console.log(`  • Top callout blockquote:       "> **Before you start:** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet."`);
  console.log("  • Metadata-table row (modules/00 style)");
  process.exit(1);
}

main().catch((err) => {
  console.error("check crashed:", err);
  process.exit(2);
});
