#!/usr/bin/env node
/**
 * Generates README.md from config/profile.json.
 * Edit the config file, then run: npm run generate:readme
 */
import { writeFileSync } from "node:fs";
import { readConfig } from "./lib/read-config.mjs";
import { renderReadme } from "./lib/render-readme.mjs";
import { README_PATH } from "./lib/paths.mjs";

function main() {
  const config = readConfig();
  const content = renderReadme(config);

  writeFileSync(README_PATH, content, "utf8");
  console.log(`Generated ${README_PATH}`);
}

main();
