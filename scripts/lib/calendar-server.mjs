import { createServer } from "node:http";

/**
 * Serves contribution calendar JSON for generate-snake-animation.
 * The library expects a GitLab-style /calendar.json endpoint.
 *
 * @param {Record<string, number>} calendar
 * @returns {Promise<{ port: number, close: () => Promise<void> }>}
 */
export function startCalendarServer(calendar) {
  return new Promise((resolvePromise, reject) => {
    const server = createServer((request, response) => {
      if (request.url?.endsWith("/calendar.json")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(calendar));
        return;
      }

      response.writeHead(404);
      response.end();
    });

    server.on("error", reject);

    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Failed to bind calendar server"));
        return;
      }

      resolvePromise({
        port: address.port,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          }),
      });
    });
  });
}

/**
 * @param {string} user
 * @param {typeof import("./fetch-with-retry.mjs").fetchWithRetry} fetchFn
 * @returns {Promise<Record<string, number>>}
 */
export async function fetchContributions(user, fetchFn) {
  const response = await fetchFn(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
  );

  const data = await response.json();
  /** @type {Record<string, number>} */
  const calendar = {};

  for (const item of data.contributions ?? []) {
    calendar[item.date] = item.count;
  }

  return calendar;
}
