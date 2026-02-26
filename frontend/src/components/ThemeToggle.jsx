import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Load stored theme or use system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [mounted, setMounted] = useState(false);

  // Apply theme to <html> and persist it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setMounted(true);
  }, [theme]);

  // Prevent flash of wrong theme on initial load
  if (!mounted) {
    return <button className="theme-toggle-btn" style={{ visibility: 'hidden' }}>...</button>;
  }

  return (
    <button
      aria-label="Toggle theme"
      className="theme-toggle-btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon size={22} strokeWidth={2.5} />
      ) : (
        <Sun size={22} strokeWidth={2.5} />
      )}
    </button>
  );
}