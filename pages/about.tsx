import { Hero, ProfileCard } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import execs from "@jsons/execs.json";
import { useEffect, useState } from "react";
import { Profile } from "components/ProfileCard";
import previousExecs from "@jsons/prev-execs.json";

const About: React.FC = () => {
  const [currentExecs, setCurrentExecs] = useState<Profile[]>([]);

  // TODO add validation and test cases for future PRs!
  useEffect(() => {
    let json: string = JSON.stringify(execs["2024-2025"]);
    let profiles: Profile[] = JSON.parse(json);
    setCurrentExecs(profiles);
  }, []);

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
        <section className="previous-exec">
          {Object.entries(previousExecs).map(([year, profiles]) => (
            <div key={year} className="year-section">
              <h2>{year}</h2>
              <ul>
                {profiles.map((profile) => (
                  <li key={profile.name}>
                    <strong>{profile.role}</strong>: {profile.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default About;
