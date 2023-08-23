import Image from "next/image";
import { Button, Logo } from "@components";
import FacebookIcon from "@icons/facebook.svg";
import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import Link from "next/link";

export const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="container">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <input
          type="checkbox"
          className="mobile-only menu-toggle"
          id="menu-toggle"
        />

        <label htmlFor="menu-toggle">
          <a className="menu-icon">
            <div className="line"></div>
            <div className="line"></div>
          </a>
        </label>

        <div className="content">
          <nav className="pages">
            <Link href="/about">
              <a className="page-link">About</a>
            </Link>
            <Link href="/events">
              <a className="page-link">Events</a>
            </Link>
            <Link href="/get-involved">
              <a className="page-link">Get Involved</a>
            </Link>
            <Link href="/resources">
              <a className="page-link">Resources</a>
            </Link>
          </nav>

          <div className="socials">
            <a href="https://www.facebook.com/ssss.sfu">
              <Image
                src={FacebookIcon.src}
                alt="Facebook icon"
                height={18}
                width={18}
              />
            </a>
            <a href="https://www.linkedin.com/company/ssss-sfu/">
              <Image
                src={LinkedInIcon.src}
                alt="LinkedIn icon"
                height={18}
                width={18}
              />
            </a>
            <a href="https://www.instagram.com/ssss.sfu/">
              <Image
                src={InstagramIcon.src}
                alt="Instagram icon"
                height={18}
                width={18}
              />
            </a>
            <a href="https://discord.gg/XZUd7amxPq">
              <Image
                src={DiscordIcon.src}
                alt="Discord icon"
                height={18}
                width={18}
              />
            </a>
            <a href="mailto:ssss-exec@sfu.ca" rel="noreferrer">
              <Button label="Contact Us" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
