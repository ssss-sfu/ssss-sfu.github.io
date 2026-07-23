import Image from "next/image";

interface SocialIconProps {
  href: string;
  src: string;
  label: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  src,
  label,
}) => {
  return (
    <a
      className="social-icon-wrapper"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <Image
        className="social-icon"
        src={src}
        alt=""
        width={24}
        height={24}
        loading="eager"
        aria-hidden="true"
      />
    </a>
  );
};
