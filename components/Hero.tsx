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
      style={
        {
          "--hero-image": `url("${backgroundImage}")`,
        } as React.CSSProperties
      }
    >
      <p>{subtitle}</p>
      <h1>{title}</h1>
    </header>
  );
};

export default Hero;
