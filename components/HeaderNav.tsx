import { Logo } from "@components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTheme, toggleTheme, type Theme } from "@lib/theme";

export const HeaderNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("dark");


  /**
   * Close the menu when the route changes
   */
  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  /**
   * Handle the menu open state
   */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /**
   * Handle the scroll state
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Handle the theme state
   */
  useEffect(() => {
    const fromDom = document.documentElement.dataset.theme;
    const initial = 
      fromDom === "light" || fromDom === "dark"
        ? fromDom
        : getTheme();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const onToggleTheme = () => {
    setTheme((prev) => toggleTheme(prev));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-nav__inner">
        <Link href="/" className="header-nav__logo" onClick={closeMenu}>
          <Logo />
        </Link>

        <div className={`content${menuOpen ? " content--open" : ""}`}>
          <nav className="pages">
            <Link href="/about" className="page-link" onClick={closeMenu}>
              About
            </Link>
            <Link href="/events" className="page-link" onClick={closeMenu}>
              Events
            </Link>
            <Link
              href="/get-involved"
              className="page-link"
              onClick={closeMenu}
            >
              Get Involved
            </Link>
            <Link href="/resources" className="page-link" onClick={closeMenu}>
              Resources
            </Link>
            <Link href="/blog" className="page-link" onClick={closeMenu}>
              Blog
            </Link>
            <Link href="/courses" className="page-link" onClick={closeMenu}>
              Courses
            </Link>
            <a
              href="https://merch.sfussss.org/"
              className="page-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Merch
            </a>
          </nav>

          <div className="content-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={onToggleTheme}
            >
             {theme === "dark"? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href="mailto:ssss-exec@sfu.ca"
              className="btn nav-contact-btn"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Contact Us
            </a>
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`menu-icon${menuOpen ? " menu-icon--open" : ""}`}>
            <span className="line" />
            <span className="line" />
          </span>
        </button>
      </div>
    </header>
  );
};

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
export default HeaderNav;
