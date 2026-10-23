import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = join(root, "package.json");
const original = readFileSync(pkgPath, "utf8");
const pkg = JSON.parse(original);
pkg.dependencies["@evotechly/brand"] = "file:../..";
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

const result = spawnSync("npm", ["install", "--no-fund", "--no-audit"], {
  cwd: root,
  stdio: "inherit",
});

writeFileSync(pkgPath, original);
process.exit(result.status ?? 1);
