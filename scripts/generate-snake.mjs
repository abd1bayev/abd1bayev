#!/usr/bin/env node
/**
 * Generates contribution snake SVGs without a GitHub token.
 * Uses public contribution data and a local mock GitLab calendar endpoint.
 */
import { createServer } from "node:http";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateSnakeAnimation } from "generate-snake-animation";

const __dirname = dirname(fileURLToPath(import.meta.url));
const username = process.argv[2] ?? "abd1bayev";
const assetsDir = resolve(__dirname, "../assets");

const palettes = {
  light: {
    colorBackground: "#ffffff",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#ebedf0",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorSnake: "purple",
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
  },
  dark: {
    colorBackground: "#0c1116",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
    colorSnake: "purple",
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
  },
};

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

async function fetchContributions(user) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch contributions: ${response.statusText}`);
  }
  const data = await response.json();
  const calendar = {};
  for (const item of data.contributions ?? []) {
    calendar[item.date] = item.count;
  }
  return calendar;
}

function startCalendarServer(calendar) {
  return new Promise((resolvePromise) => {
    const server = createServer((request, response) => {
      if (request.url?.endsWith("/calendar.json")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(calendar));
        return;
      }
      response.writeHead(404);
      response.end();
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolvePromise({
        port,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          }),
      });
    });
  });
}

async function main() {
  console.log(`Fetching contributions for ${username}...`);
  const calendar = await fetchContributions(username);
  const server = await startCalendarServer(calendar);

  const outputs = [
    buildOutput(join(assetsDir, "github-contribution-grid-snake.svg"), palettes.light),
    buildOutput(
      join(assetsDir, "github-contribution-grid-snake-dark.svg"),
      palettes.dark,
    ),
  ];

  try {
    console.log("Generating snake animation...");
    const results = await generateSnakeAnimation(
      {
        platform: "gitlab",
        username,
        baseUrl: `http://127.0.0.1:${server.port}`,
      },
      outputs,
    );

    mkdirSync(assetsDir, { recursive: true });
    results.forEach((result, index) => {
      if (result && outputs[index]?.filename) {
        writeFileSync(outputs[index].filename, result);
        console.log(`Saved ${outputs[index].filename}`);
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
