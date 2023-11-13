import Image from "next/image";

export default function SocialIcon({ href, src, alt }) {
  return (
    <a
      className="social-icon-wrapper"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        className="social-icon"
        src={src}
        alt={alt}
        width={24}
        height={24}
      />
    </a>
  );
}
