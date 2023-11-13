import Image from "next/image";
import Link from "next/link";
import { Logo } from "@components";
import FacebookIcon from "@icons/facebook.svg";
import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import GithubIcon from "@icons/github.svg";
import OfficeBuildingIcon from "@icons/office-building.svg";
import ContactUsIcon from "@icons/contact-us.svg";
import SocialIcon from "./SocialIcon";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div className="office-address icon-container">
          <div className="gray-backdrop left-icon">
            <Image
              src={OfficeBuildingIcon.src}
              height={48}
              width={48}
              alt="Office Building Icon"
            />
          </div>
          <div className="address icon-right-content">
            <h4>Office Address</h4>
            <address>
              <a
                href="https://goo.gl/maps/2wMi25z6FqiZ6NC57"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Software Systems Student Society</strong>
                <br />
                250 - 13450 - 102nd Avenue, <br></br>
                SYRC 4016, Galleria 4<br></br>
                Surrey, BC V3T 0A3<br></br>
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
              alt="Contact Us Icon"
            />
          </div>
          <div className="address icon-right-content">
            <h4>Get in Touch</h4>
            <address>
              <a href="mailto:ssss-exec@sfu.ca">ssss-exec@sfu.ca</a>
            </address>
          </div>
        </div>

        <div className="footer-socials icon-contianer">
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
      </div>
    </div>
  );
};
