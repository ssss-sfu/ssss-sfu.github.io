import { Button, Logo, SocialIcon } from "@components";
import FacebookIcon from "@icons/facebook.svg";
import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import GithubIcon from "@icons/github.svg";
import Link from "next/link";

export const HeaderNav: React.FC = () => {
  return (
    <div className="header-nav">
      <div className="container">
        <Link href="/">
          <Logo />
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
            <Link href="/about" className="page-link">
              About
            </Link>
            <Link href="/events" className="page-link">
              Events
            </Link>
            <Link href="/get-involved" className="page-link">
              Get Involved
            </Link>
            <Link href="/resources" className="page-link">
              Resources
            </Link>
            {/* <Link href="/blog" className="page-link">
              Blog
            </Link> */}
          </nav>

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
              alt="Discord icon"
            />
          </div>
          <div className="socials">
            <a href="mailto:ssss-exec@sfu.ca" rel="noreferrer">
              <Button label="Contact Us" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
