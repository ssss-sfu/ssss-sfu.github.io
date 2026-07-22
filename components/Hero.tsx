interface HeroProps {
  subtitle: string;
  title: string;
  backgroundImage: string;
}

export const Hero: React.FC<HeroProps> = ({
  subtitle,
  title,
  backgroundImage,
}) => {
  return (
    <header
      className="container hero"
      style={{
        backgroundImage: `linear-gradient(
    180deg,
    var(--colour-neutral-1200) 0%,
    color-mix(in srgb, var(--colour-neutral-1200) 75%, transparent) 100%
  ),
  url("${backgroundImage}")`,
      }}
    >
      <p>{subtitle}</p>
      <h1>{title}</h1>
    </header>
  );
};

export default Hero;
