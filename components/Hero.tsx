interface HeroProps {
  subtitle: string;
  title: string;
  backgroundImage: string;
}

/** Same stack as hero-image-stack */
const heroOverlayGradient = `linear-gradient(
  180deg,
  rgba(var(--colour-neutral-1200-rgb), var(--colour-hero-mask-start)) 0%,
  rgba(var(--colour-neutral-1200-rgb), var(--colour-hero-mask-end)) 100%
)`;

export const Hero: React.FC<HeroProps> = ({
  subtitle,
  title,
  backgroundImage,
}) => {
  return (
    <header
      className="container hero"
      style={{
        backgroundImage: `${heroOverlayGradient}, url("${backgroundImage}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p>{subtitle}</p>
      <h1>{title}</h1>
    </header>
  );
};

export default Hero;
