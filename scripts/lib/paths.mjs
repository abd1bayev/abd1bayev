import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT_DIR = resolve(__dirname, "../..");
export const CONFIG_PATH = resolve(ROOT_DIR, "config/profile.json");
export const ASSETS_DIR = resolve(ROOT_DIR, "assets");
export const README_PATH = resolve(ROOT_DIR, "README.md");
