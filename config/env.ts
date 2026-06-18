/**
 * Centralised, validated access to public environment variables.
 * Anything the browser needs must be prefixed with NEXT_PUBLIC_.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  // Fail loudly in development; in production the build should inject it.
  // eslint-disable-next-line no-console
  console.warn(
    "[env] NEXT_PUBLIC_API_URL is not set — falling back to http://localhost:3000/api/v1",
  );
}

const apiUrl = API_URL ?? "http://localhost:3000/api/v1";

/**
 * The socket.io server shares the API's HTTP server (no path prefix), so its
 * origin is the API URL with the `/api/v1` suffix stripped.
 */
const deriveSocketUrl = (url: string) => {
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/api\/v1\/?$/, "");
  }
};

export const env = {
  apiUrl,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL ?? deriveSocketUrl(apiUrl),
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
} as const;
