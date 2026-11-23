// Day one, day seven — make.fun entry program (program/v1).
//
// The entry itself is the TikTok video; this program's whole job is to
// hand the video's address to the grader: it copies VIDEO.json from the
// repository root into the output directory, byte for byte.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourceFile = join(repoRoot, "VIDEO.json");

// The grader mounts the output directory; locally MAKEFUN_OUTPUT_DIR
// points the run at a scratch folder instead. The directory is only
// ever created when missing — never removed or emptied.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const targetFile = join(outputDir, "VIDEO.json");
copyFileSync(sourceFile, targetFile);
const bytes = statSync(targetFile).size;
console.log(`handed over ${targetFile} (${bytes} bytes)`);
