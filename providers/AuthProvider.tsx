"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { AuthSession, AuthUser } from "@/types/auth";
import { tokenStorage } from "@/lib/api/tokenStorage";
import { setUnauthorizedHandler } from "@/lib/api/client";
import { routes } from "@/config/routes";

interface AuthContextValue {
  user: AuthUser | null;
  /** True once we've read localStorage — gate redirects on this to avoid flicker. */
  isReady: boolean;
  isAuthenticated: boolean;
  /** Call after a successful login/verify/google to persist the session. */
  signIn: (session: AuthSession) => void;
  /** Clears local session state. Pass redirect=false to skip navigating. */
  signOut: (options?: { redirect?: boolean }) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_STORAGE_KEY = "wff.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Hydrate from storage once on mount.
  useEffect(() => {
    const token = tokenStorage.get();
    const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
    if (token && rawUser) {
      try {
        setUser(JSON.parse(rawUser) as AuthUser);
      } catch {
        tokenStorage.clear();
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const signIn = useCallback((session: AuthSession) => {
    tokenStorage.set(session.token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
    setUser(session.user);
  }, []);

  const signOut = useCallback(
    (options?: { redirect?: boolean }) => {
      tokenStorage.clear();
      window.localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      queryClient.clear();
      if (options?.redirect !== false) router.replace(routes.login);
    },
    [queryClient, router],
  );

  // When any API call 401s, drop the session and send them to login.
  useEffect(() => {
    setUnauthorizedHandler(() => signOut());
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [user, isReady, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
