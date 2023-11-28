import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import Image from "next/image";

type SocialType = "discord" | "instagram" | "linkedIn";

export interface Profile {
  id: string;
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
    const lastSegment = filteredSegments[filteredSegments.length - 1];
    return lastSegment;
  };

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
    <div key={profile.id} className="profile-card">
      <div className="description-main">
        <img
          className="description-img"
          src={profile.imgSrc}
          alt={`${profile.name}'s profile image`}
        ></img>
        <div className="description">
          <div className="description-title">
            <p className="profile-name">{profile.name}</p>
            <p className="profile-role">{profile.role}</p>
          </div>
        </div>
      </div>
      <div className="description-secondary description">
        <p className="description-body">{profile.description}</p>
        <div className="description-socials">{displaySocials()}</div>
      </div>
    </div>
  );
};
