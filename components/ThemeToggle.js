"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";
  const label = mounted
    ? `Switch to ${dark ? "light" : "dark"} theme`
    : "Change colour theme";

  return (
    <button
      type="button"
      className="ui-btn ui-btn-circle ui-btn-ghost theme-toggle"
      aria-label={label}
      title={label}
      disabled={!mounted}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <Sun
        className="theme-sun"
        size={19}
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <Moon
        className="theme-moon"
        size={19}
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </button>
  );
}
