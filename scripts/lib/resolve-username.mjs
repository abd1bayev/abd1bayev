/**
 * Resolves GitHub username from CLI arg, env var, or config fallback.
 * @param {string | undefined} cliArg
 * @param {string} configUsername
 * @returns {string}
 */
export function resolveUsername(cliArg, configUsername) {
  const username = cliArg ?? process.env.GITHUB_USERNAME ?? configUsername;

  if (!/^[a-zA-Z0-9-]+$/.test(username)) {
    throw new Error(`Invalid GitHub username: ${username}`);
  }

  return username;
}
