export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

/** Must match the fallback in the init script in pages/_document.tsx. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Check if a value is a valid theme
 * @param value - The value to check
 * @returns True if the value is a valid theme, false otherwise
 */
export function isTheme(value:unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Get the current theme from localStorage, fall back to the OS preference then the default
 */
export function getTheme(): Theme {
  // server side rendering(ssr) safe check
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (isTheme(stored)) {
    return stored;
  }
  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }else{
    return DEFAULT_THEME;
  }
}

/**
 * Apply the theme to the document.
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

// listeners for same-tab updates
const listeners = new Set<() => void>();

/**
 * Set the theme in localStorage, apply it, and notify subscribers.
 */
export function setTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  listeners.forEach((notify) => notify());
}

export function toggleTheme(current: Theme): Theme {
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * subscribe to theme changes. 
 * basically, it adds the callback to the listeners set and returns a function to remove the callback.
 */
export function subscribeTheme(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/**
 * gets the theme from the document.documentElement.dataset.theme attribute.
 * if it is not a valid theme, it falls back to the current theme.
 */
export function getThemeSnapshot(): Theme {
  const fromDom = document.documentElement.dataset.theme;
  return isTheme(fromDom) ? fromDom : getTheme();
}

/**
 * gets the default theme.
 */
export function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}
