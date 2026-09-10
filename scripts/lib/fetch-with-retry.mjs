const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRIES = 3;
const RETRY_DELAY_MS = 1_000;

/**
 * @param {string} url
 * @param {{ timeoutMs?: number, retries?: number }} [options]
 * @returns {Promise<Response>}
 */
export async function fetchWithRetry(url, { timeoutMs = DEFAULT_TIMEOUT_MS, retries = DEFAULT_RETRIES } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (response.ok) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    } finally {
      clearTimeout(timer);
    }

    if (attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}
