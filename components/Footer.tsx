import Image from "next/image";
import Link from "next/link";
import { Logo, SocialIcon } from "@components";
import FacebookIcon from "@icons/facebook.svg";
import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import GithubIcon from "@icons/github.svg";
import OfficeBuildingIcon from "@icons/office-building.svg";
import ContactUsIcon from "@icons/contact-us.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Link href="/" aria-label="Software Systems Student Society home">
          <Logo />
        </Link>
        <div className="office-address icon-container">
          <div className="gray-backdrop left-icon">
            <Image
              src={OfficeBuildingIcon.src}
              height={48}
              width={48}
              alt=""
            />
          </div>
          <div className="address icon-right-content">
            <h2>Office Address</h2>
            <address>
              <a
                href="https://maps.app.goo.gl/AkVazVCLNbaur4iB7"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Software Systems Student Society</strong>
                <br />
                10285 University Drive<br></br>
                SYRE 3006.3, Level 3000<br></br>
                Surrey, BC V3T 0N1<br></br>
              </a>
            </address>
          </div>
        </div>

        <div className="get-in-touch icon-container">
          <div className="gray-backdrop left-icon">
            <Image
              src={ContactUsIcon.src}
              height={48}
              width={48}
              alt=""
            />
          </div>
          <div className="address icon-right-content">
            <h2>Get in Touch</h2>
            <address>
              <a href="mailto:ssss-exec@sfu.ca">ssss-exec@sfu.ca</a>
            </address>
          </div>
        </div>

        <div className="footer-socials">
          <SocialIcon
            href="https://www.facebook.com/ssss.sfu"
            src={FacebookIcon.src}
            label="SSSS on Facebook"
          />
          <SocialIcon
            href="https://www.linkedin.com/company/ssss-sfu/"
            src={LinkedInIcon.src}
            label="SSSS on LinkedIn"
          />
          <SocialIcon
            href="https://www.instagram.com/ssss.sfu/"
            src={InstagramIcon.src}
            label="SSSS on Instagram"
          />
          <SocialIcon
            href="https://discord.com/invite/whdfmJbVF7"
            src={DiscordIcon.src}
            label="SSSS on Discord"
          />
          <SocialIcon
            href="https://github.com/ssss-sfu"
            src={GithubIcon.src}
            label="SSSS on GitHub"
          />
        </div>
      </div>
    </footer>
  );
};
