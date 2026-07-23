export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

/**
 * Check if a value is a valid theme
 * @param value - The value to check
 * @returns True if the value is a valid theme, false otherwise
 */
export function isTheme(value:unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Get the current theme from localStorage
 * @returns The current theme
 */
export function getTheme(): Theme {
  // server side rendering(ssr) safe check, default to dark
  if (typeof window === "undefined") {
    return "dark";
  }

  const theme = window.localStorage.getItem(THEME_KEY);
  return isTheme(theme) ? theme : "dark";
}

/**
 * Apply the theme to the document
 * @param theme - The theme to apply
 * @returns void
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

/**
 * Set the theme in localStorage
 * @param theme - The theme to set
 * @returns void
 */
export function setTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme(current:Theme):Theme{
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    return next;
}