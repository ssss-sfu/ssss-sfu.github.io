export const Hero = ({ subtitle, title, backgroundImage }) => {
  return (
    <header
      className="container hero"
      style={{
        backgroundImage: `linear-gradient(
    180deg,
    #141515 0%,
    rgba(20, 21, 21, 0.75) 100%
  ),
  url("${backgroundImage}")`,
      }}
    >
      <p>{subtitle}</p>
      <h1>{title}</h1>
    </header>
  );
};
