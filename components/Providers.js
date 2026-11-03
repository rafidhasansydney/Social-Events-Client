"use client";

import { createContext, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { ThemeProvider } from "next-themes";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Authentication provider is missing.");
  return context;
}

export default function Providers({ children }) {
  const session = authClient.useSession();
  useEffect(() => {
    if (!session.data?.user) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") !== "google") return;
    url.searchParams.delete("auth");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
    toast.success("Welcome to Bandhan. It’s good to have you here.");
  }, [session.data?.user]);
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      storageKey="bandhan-theme"
      disableTransitionOnChange
    >
      <AuthContext.Provider
        value={{ ...session, user: session.data?.user || null }}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4500,
            style: {
              fontSize: 13,
              background: "var(--surface)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
            },
          }}
        />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
