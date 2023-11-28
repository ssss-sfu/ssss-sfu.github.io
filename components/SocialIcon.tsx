import Image from "next/image";

interface SocialIconProps {
  href: string;
  src: string;
  alt: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ href, src, alt }) => {
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
};
