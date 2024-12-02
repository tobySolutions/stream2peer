import { useEffect } from "react";
import { create } from "zustand";
import { Theme, defaultTheme, storageKey } from "./types";

const useThemeStore = create<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>((set) => ({
  theme: (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  setTheme: (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    set({ theme });
  },
}));

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      console.log("theme is system");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
};
