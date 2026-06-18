/**
 * Persists the bearer session token in localStorage and mirrors it in memory
 * so the axios request interceptor can read it synchronously without touching
 * localStorage on every call.
 *
 * This is the single place that knows *how* the token is stored — AuthProvider
 * owns *when* it changes.
 */

const STORAGE_KEY = "wff.token";

let inMemoryToken: string | null = null;

const isBrowser = () => typeof window !== "undefined";

export const tokenStorage = {
  get(): string | null {
    if (inMemoryToken !== null) return inMemoryToken;
    if (!isBrowser()) return null;
    inMemoryToken = window.localStorage.getItem(STORAGE_KEY);
    return inMemoryToken;
  },

  set(token: string) {
    inMemoryToken = token;
    if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, token);
  },

  clear() {
    inMemoryToken = null;
    if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
  },
};
