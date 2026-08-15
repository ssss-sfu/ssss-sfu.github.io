import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef } from "react";

type SocialType = "discord" | "instagram" | "linkedIn";

export interface Profile {
  imgSrc: string;
  name: string;
  role: string;
  description: string;
  socials: {
    [key in SocialType]?: string;
  };
}

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const socialIconMap: Record<SocialType, string> = {
    discord: DiscordIcon.src,
    linkedIn: LinkedInIcon.src,
    instagram: InstagramIcon.src,
  };

  const isValidHttpUrl = (string: string): boolean => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const getLastSegment = (url: string): string => {
    const segments = url.split("/");
    const filteredSegments = segments.filter(
      (segment) => segment.trim() !== ""
    );
    return filteredSegments[filteredSegments.length - 1];
  };

  // Shrink bio text so bio + socials fit inside the overlay, including bottom padding.
  const fitDescriptionText = useCallback(() => {
    const text = descriptionRef.current;
    const container = secondaryRef.current;
    if (!text || !container) {
      return;
    }

    text.style.fontSize = "";
    const socials = container.querySelector(".description-socials");
    let socialsHeight: number = 0; // default height of socials is 0.
    if (socials) {
      socialsHeight = socials.getBoundingClientRect().height; // gets the current height of the socials container
    }
    const styles = getComputedStyle(container);
    const gap = parseFloat(styles.rowGap || "0");
    const paddingTop = parseFloat(styles.paddingTop || "0");
    const paddingBottom = parseFloat(styles.paddingBottom || "0");
    // clientHeight includes padding — reserve top + bottom so socials aren't flush
    const availableHeight = container.clientHeight - paddingTop - paddingBottom;
    const maxTextHeight = availableHeight - socialsHeight - gap;

    if (maxTextHeight <= 0) {
      // if the max height is not larger than 0, text will fit in the container
      return; // dont need to resize the text
    }

    let fontSize = parseFloat(getComputedStyle(text).fontSize); // get current font size
    const minFontSize = 10;

    while (text.scrollHeight > maxTextHeight && fontSize > minFontSize) {
      // decrease font size until it fits.
      fontSize -= 0.5;
      text.style.fontSize = `${fontSize}px`;
    }
  }, []);

  // fits the text to the container if its too long.
  useLayoutEffect(() => {
    fitDescriptionText(); // fit the text to the container initially

    const container = secondaryRef.current; // container of description and socials
    if (!container) {
      return;
    }
    // resize observer if the container changes its size.
    const resizeObserver = new ResizeObserver(fitDescriptionText);
    resizeObserver.observe(container);

    // if the window is resized,
    // window.addEventListener("resize", fitDescriptionText);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", fitDescriptionText);
    };
  }, [profile.description, fitDescriptionText]);

  function displaySocials(): React.ReactNode {
    return Object.entries(profile.socials).map(([key, value]) => (
      <div className="description-logo" key={`${profile.name}-${key}`}>
        <Image
          src={socialIconMap[key as SocialType]} // Ensure key is of type SocialType
          height={24}
          width={24}
          alt={`${profile.name}'s ${key}`}
        />
        {isValidHttpUrl(value) ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="description-social-link"
          >
            {getLastSegment(value)}
          </a>
        ) : (
          value
        )}
      </div>
    ));
  }

  return (
    <div className="profile-card" onMouseEnter={fitDescriptionText}>
      <div className="description-main">
        <img
          className="description-img"
          src={profile.imgSrc}
          alt={`${profile.name}'s profile image`}
          loading="lazy"
          decoding="async"
        ></img>
        <div className="description">
          <div className="description-title">
            <p className="profile-name">{profile.name}</p>
            <p className="profile-role">{profile.role}</p>
          </div>
        </div>
      </div>
      <div className="description-secondary description" ref={secondaryRef}>
        <p className="description-body" ref={descriptionRef}>
          {profile.description}
        </p>
        <div className="description-socials">{displaySocials()}</div>
      </div>
    </div>
  );
};
