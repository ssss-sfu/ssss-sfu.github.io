import InstagramIcon from "@icons/instagram.svg";
import LinkedInIcon from "@icons/linkedin.svg";
import DiscordIcon from "@icons/discord.svg";
import Image from "next/image";

export const ProfileCard = ({ profile }) => {
  const socialIconMap = {
    discord: DiscordIcon.src,
    linkedIn: LinkedInIcon.src,
    instagram: InstagramIcon.src,
  };

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const getLastSegment = (url) => {
    const segments = url.split("/");
    const filteredSegments = segments.filter(
      (segment) => segment.trim() !== ""
    );
    const lastSegment = filteredSegments[filteredSegments.length - 1];
    return lastSegment;
  };

  Object.entries(profile.socials).map((social, socialTag) => {
    console.log(social, socialTag);
  });
  return (
    <div key={profile.id} className="profile-card">
      <img className="description-img" src={profile.imgSrc}></img>
      <div className="description">
        <div className="description-title">
          <p className="profile-role">{profile.role}</p>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-pronoun">({profile.pronoun})</p>
        </div>

        <p className="description-body">{profile.description}</p>
        <div className="description-socials">
          {Object.keys(profile.socials).map((socialType) => {
            const socialTag = profile.socials[socialType];
            return (
              <div className="description-logo">
                <Image
                  src={socialIconMap[socialType]}
                  height={24}
                  width={24}
                  alt={`${profile.name}'s ${socialType}`}
                />
                {isValidHttpUrl(socialTag) ? (
                  <a
                    href={socialTag}
                    target="_blank"
                    className="description-social-link"
                  >
                    {getLastSegment(socialTag)}
                  </a>
                ) : (
                  socialTag
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
