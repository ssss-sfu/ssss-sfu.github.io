import Image from "next/image";
import { Button } from "@components";
import Link from "next/link";

function Header() {
  return (
    <div className="header">
      <div className="home-link">
        <Image src="/sosy-logo.svg" height={36} width={36} />
        <div>
          <h6>Software Systems</h6>
          <h5>Student Society</h5>
        </div>
      </div>

      <div className="pages">
        <Link href="/">
          <a className="page-link">About</a>
        </Link>
        <Link href="/events">
          <a className="page-link">Events</a>
        </Link>
        <Link href="/get-involved">
          <a className="page-link">Get Involved</a>
        </Link>
        <Link href="">
          <a className="page-link">Resources</a>
        </Link>
      </div>

      <div className="socials">
        <a href="https://www.facebook.com/ssss.sfu">
          <Image src="/social-media/facebook.svg" height={18} width={18} />
        </a>
        <a href="https://www.linkedin.com/company/ssss-sfu/">
          <Image src="/social-media/linkedin.svg" height={18} width={18} />
        </a>
        <a href="https://www.instagram.com/ssss.sfu/">
          <Image src="/social-media/instagram.svg" height={18} width={18} />
        </a>
        <a href="https://discord.gg/XZUd7amxPq">
          <Image src="/social-media/discord.svg" height={18} width={18} />
        </a>
        <Button label="Contact Us" />
      </div>
    </div>
  );
}
export default Header;
