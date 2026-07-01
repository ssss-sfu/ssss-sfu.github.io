import { Hero, PastExecsAccordion, ProfileCard } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import execs from "@jsons/execs.json";
import prevExecs from "@jsons/prev-exec.json";
import { Profile } from "components/ProfileCard";

// sorting execs by year in a descending order. 
// newest year is the current year. Everything after the first year is past execs.
const currentYear = Object.keys(execs).sort((a, b) => b.localeCompare(a))[0];
const currentExecs = execs[currentYear as keyof typeof execs] as Profile[];
// sorting past execs by year in a descending order.
const pastExecYears = Object.keys(prevExecs)
  .sort((a, b) => b.localeCompare(a))
  .map((year) => ({
    year,
    execs: prevExecs[year as keyof typeof prevExecs],
  }));

const About: React.FC = () => {
  return (
    <div className="page about-page">
      <Hero
        title="Meet the Software Systems Student Society"
        subtitle="About"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>About the SSSS</h1>
          <p>
            Our mission is to represent students in the Software Systems program
            at SFU.
          </p>
          <p>
            We help students by addressing issues and concerns between the
            students and faculty, building community in and around our society,
            and sharing resources provided by students and external
            organizations.
          </p>
          <p>
            Our voice has influenced and improved our education. Our reach
            extends to over 700 students and{" "}
            <a
              href="https://systemshacks.com/"
              target="_blank"
              rel="noreferrer"
            >
              our annual hackathon
            </a>{" "}
            has over 500 registrations. We have funded conference fees, created
            career opportunities, and shared insights and materials to help
            students in their courses.
          </p>
        </section>
        <section className="current-exec">
          {currentExecs.map((profile: Profile) => (
            <ProfileCard profile={profile} key={profile.name}></ProfileCard>
          ))}
        </section>
        {pastExecYears.length > 0 && (
          <section className="past-execs">
            <h2>Past Executives</h2>
            <PastExecsAccordion data={pastExecYears} />
          </section>
        )}
      </main>
    </div>
  );
};

export default About;
