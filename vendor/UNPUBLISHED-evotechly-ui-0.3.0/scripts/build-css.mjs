import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandTokens = join(root, "..", "..", "tokens", "tokens.css");
const src = join(root, "src", "styles.css");
const outDir = join(root, "dist");
const out = join(outDir, "styles.css");

mkdirSync(outDir, { recursive: true });

const tokens = readFileSync(brandTokens, "utf8");
const ui = readFileSync(src, "utf8").replace(
  /@import\s+["']@evotechly\/brand\/tokens\.css["'];\s*/g,
  "",
);

writeFileSync(out, `${tokens}\n${ui}`);
copyFileSync(out, join(root, "src", "styles.bundled.css"));
console.log("Wrote dist/styles.css");
