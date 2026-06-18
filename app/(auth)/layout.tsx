import type { ReactNode } from "react";
import { RedirectIfAuthenticated } from "@/components/auth/AuthGuards";

/** All auth screens: signed-in users are redirected into the app. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <RedirectIfAuthenticated>{children}</RedirectIfAuthenticated>;
}
