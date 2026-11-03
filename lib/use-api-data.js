"use client";

import { useCallback, useEffect, useState } from "react";
import { authenticatedFetch } from "./api";
import { useAuth } from "@/components/Providers";

export default function useApiData(path, { authenticated = false } = {}) {
  const { user } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ key: "", data: null, error: null });
  const key = `${authenticated ? user?.id || "anonymous" : "public"}:${path}:${attempt}`;
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        let result;
        if (authenticated)
          result = await authenticatedFetch(path, {
            signal: controller.signal,
          });
        else {
          const response = await fetch(path, {
            signal: controller.signal,
            cache: "no-store",
          });
          result = await response.json().catch(() => null);
          if (!response.ok || !result?.ok) {
            const error = new Error(
              result?.error?.message ||
                "Events are temporarily unavailable. Please try again shortly.",
            );
            error.status = response.status;
            throw error;
          }
        }
        if (!controller.signal.aborted)
          setState({ key, data: result, error: null });
      } catch (error) {
        if (!controller.signal.aborted)
          setState({
            key,
            data: null,
            error: {
              message:
                error instanceof TypeError
                  ? "Check your connection and try again."
                  : error.message,
              status: error.status,
            },
          });
      }
    }
    load();
    return () => controller.abort();
  }, [authenticated, path, key]);
  useEffect(() => {
    window.addEventListener("bandhan:events-changed", retry);
    if (authenticated)
      window.addEventListener("bandhan:participation-changed", retry);
    return () => {
      window.removeEventListener("bandhan:events-changed", retry);
      window.removeEventListener("bandhan:participation-changed", retry);
    };
  }, [authenticated, retry]);
  return {
    data: state.key === key ? state.data : null,
    error: state.key === key ? state.error : null,
    loading: state.key !== key,
    retry,
  };
}
