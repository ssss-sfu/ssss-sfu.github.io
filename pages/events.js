import { Helmet, Footer } from "@components";
import { Hero, HeaderNav } from "@components";
import EventsCalendar from "components/EventsCalendar";
import HeroImage from "@images/landing-page/discover-ssss-get-involved.png";

export default function EventsPage() {
  return (
    <div className="events-page">
      <Helmet />
      <HeaderNav />
      <main>
        <Hero
          title="Join and meet other SoSy students"
          subtitle="Events"
          backgroundImage={HeroImage.src}
        />
        <article className="container annual-events">
          <header>
            <h2>Annual Events</h2>
          </header>
          <section className="annual-events__link-items">
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://discord.com/invite/XZUd7amxPq"
              rel="noreferrer"
            >
              <h3>Frosh</h3>
              <p>The annual first year&apos;s kick off week</p>
            </a>
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://systemshacks.sfussss.org/"
              rel="noreferrer"
            >
              <h3>Systems Hacks</h3>
              <p>The SSSS&apos; annual hackathon - new theme every year!</p>
            </a>
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://systemsfair.ca/"
              rel="noreferrer"
            >
              <h3>Systems Fair</h3>
              <p>Job fair in collaboration with the MSESSS and SEESS</p>
            </a>
          </section>
          <section className="annual-events__events-calendar">
            <EventsCalendar />
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
