import Image from "next/image";
import Link from "next/link";
import { Logo } from "@components";

export const Footer = () => {
  return (
    <div className="container footer">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <div className="office-address icon-container">
        <div className="gray-backdrop left-icon">
          <Image
            src="/icons/office-building.svg"
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
              12450 102 Ave Unit 250, <br></br>
              SUR 4016, Galleria 4<br></br>
              Surrey, BC V3T 0A3<br></br>
            </a>
          </address>
        </div>
      </div>

      <div className="get-in-touch icon-container">
        <div className="gray-backdrop left-icon">
          <Image
            src="/icons/contact-us.svg"
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
        <a href="https://www.facebook.com/ssss.sfu">
          <Image
            src="/social-media/facebook.svg"
            height={24}
            width={24}
            alt="Facebook Icon"
          />
        </a>
        <a href="https://www.linkedin.com/company/ssss-sfu/">
          <Image
            src="/social-media/linkedin.svg"
            height={24}
            width={24}
            alt="LinkedIn Icon"
          />
        </a>
        <a href="https://www.instagram.com/ssss.sfu/">
          <Image
            src="/social-media/instagram.svg"
            height={24}
            width={24}
            alt="Instagram Icon"
          />
        </a>
        <a href="https://discord.gg/XZUd7amxPq">
          <Image
            src="/social-media/discord.svg"
            height={24}
            width={24}
            alt="Discord Icon"
          />
        </a>
      </div>
    </div>
  );
};
