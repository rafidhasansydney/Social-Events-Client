"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./Providers";

export default function RequireAuth({ children }) {
  const { user, isPending, error, refetch } = useAuth();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!isPending && !error && !user)
      router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [user, isPending, error, router, path]);
  if (error)
    return (
      <div className="account-state" role="alert">
        <h2>Let’s try that again.</h2>
        <p>We couldn’t check your account. Please check your connection.</p>
        <button className="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  if (isPending || !user)
    return (
      <div className="account-state" role="status">
        <span className="loading-ring" />
        <p>Getting your account ready…</p>
      </div>
    );
  return children;
}
