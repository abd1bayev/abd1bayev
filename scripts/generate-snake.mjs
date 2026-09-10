#!/usr/bin/env node
/**
 * Generates contribution snake SVGs without a GitHub token.
 *
 * Uses public contribution data served via a local mock GitLab calendar
 * endpoint — generate-snake-animation expects platform-specific APIs,
 * and GitLab's calendar.json shape matches our fetched data.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { generateSnakeAnimation } from "generate-snake-animation";
import { fetchContributions, startCalendarServer } from "./lib/calendar-server.mjs";
import { fetchWithRetry } from "./lib/fetch-with-retry.mjs";
import { ASSETS_DIR } from "./lib/paths.mjs";
import { readConfig } from "./lib/read-config.mjs";
import { resolveUsername } from "./lib/resolve-username.mjs";
import { SNAKE_OUTPUTS } from "./lib/snake-palettes.mjs";

async function main() {
  const config = readConfig();
  const username = resolveUsername(process.argv[2], config.username);

  console.log(`Fetching contributions for ${username}...`);
  const calendar = await fetchContributions(username, fetchWithRetry);
  const server = await startCalendarServer(calendar);

  try {
    console.log("Generating snake animation...");
    const results = await generateSnakeAnimation(
      {
        platform: "gitlab",
        username,
        baseUrl: `http://127.0.0.1:${server.port}`,
      },
      SNAKE_OUTPUTS,
    );

    mkdirSync(ASSETS_DIR, { recursive: true });

    results.forEach((result, index) => {
      const output = SNAKE_OUTPUTS[index];
      if (result && output?.filename) {
        writeFileSync(output.filename, result);
        console.log(`Saved ${output.filename}`);
      }
    });
  } finally {
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
