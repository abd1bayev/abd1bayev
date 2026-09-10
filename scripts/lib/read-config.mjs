import { readFileSync } from "node:fs";
import { CONFIG_PATH } from "./paths.mjs";

/** @typedef {import("./types.d.ts").ProfileConfig} ProfileConfig */

/**
 * Loads and validates the profile configuration.
 * @returns {ProfileConfig}
 */
export function readConfig() {
  const raw = readFileSync(CONFIG_PATH, "utf8");
  const config = JSON.parse(raw);

  if (!config.username || typeof config.username !== "string") {
    throw new Error("config/profile.json: 'username' is required");
  }

  if (!/^[a-zA-Z0-9-]+$/.test(config.username)) {
    throw new Error(`Invalid GitHub username: ${config.username}`);
  }

  return config;
}
