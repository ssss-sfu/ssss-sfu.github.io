import { Logo, SocialIcon } from "@components";
import FacebookIcon from "@icons/facebook.svg";
import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import GithubIcon from "@icons/github.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const HeaderNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div className="socials">
              <SocialIcon
                href="https://www.facebook.com/ssss.sfu"
                src={FacebookIcon.src}
                alt="Facebook icon"
              />
              <SocialIcon
                href="https://www.linkedin.com/company/ssss-sfu/"
                src={LinkedInIcon.src}
                alt="LinkedIn icon"
              />
              <SocialIcon
                href="https://www.instagram.com/ssss.sfu/"
                src={InstagramIcon.src}
                alt="Instagram icon"
              />
              <SocialIcon
                href="https://discord.com/invite/whdfmJbVF7"
                src={DiscordIcon.src}
                alt="Discord icon"
              />
              <SocialIcon
                href="https://github.com/ssss-sfu"
                src={GithubIcon.src}
                alt="GitHub icon"
              />
            </div>
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

export default HeaderNav;
