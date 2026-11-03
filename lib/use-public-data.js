"use client";

import { useCallback, useEffect, useState } from "react";

export default function usePublicData(path) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ key: "", data: null, error: null });
  const key = `${path}:${attempt}`;
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(path, {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result?.ok) {
          const error = new Error(
            result?.error?.message ||
              "Events are temporarily unavailable. Please try again shortly.",
          );
          error.status = response.status;
          throw error;
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
  }, [path, key]);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  return {
    data: state.key === key ? state.data : null,
    error: state.key === key ? state.error : null,
    loading: state.key !== key,
    retry,
  };
}
