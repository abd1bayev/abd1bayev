import { join } from "node:path";
import { ASSETS_DIR } from "./paths.mjs";

/** @type {Record<string, object>} */
export const SNAKE_PALETTES = {
  light: {
    colorBackground: "#ffffff",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#ebedf0",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorSnake: "#667eea",
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
  },
  dark: {
    colorBackground: "#0c1116",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
    colorSnake: "#667eea",
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
  },
};

/**
 * @param {string} filename
 * @param {object} palette
 */
function buildOutput(filename, palette) {
  return {
    filename,
    format: "svg",
    drawOptions: { ...palette },
    animationOptions: {
      frameByStep: 1,
      stepDurationMs: 100,
    },
  };
}

export const SNAKE_OUTPUTS = [
  buildOutput(join(ASSETS_DIR, "github-contribution-grid-snake.svg"), SNAKE_PALETTES.light),
  buildOutput(join(ASSETS_DIR, "github-contribution-grid-snake-dark.svg"), SNAKE_PALETTES.dark),
];
