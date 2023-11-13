import { Hero, Button, EventsCalendar } from "@components";
import HeroImage from "@images/landing-page/discover-ssss-get-involved.png";

export default function EventsPage() {
  return (
    <div className="page events-page">
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
              href="https://discord.com/invite/whdfmJbVF7"
              rel="noreferrer"
            >
              <h3>Frosh</h3>
              <p>The annual first year&apos;s kick off week</p>
            </a>
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://systemshacks.com/"
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
              <p>Job fair in collaboration with the MSESS and SEESS</p>
            </a>
          </section>
          <div className="annual-events__subscribe-button">
            <a
              href="https://calendar.google.com/calendar/u/0?cid=ajdxZmNuZ2Q5Y3JiaGVsaWI2dGdkaWhpM2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
              target="_blank"
              rel="noreferrer"
            >
              <Button label="Subscribe to Events Calendar" type="secondary" />
            </a>
          </div>
          <section className="annual-events__events-calendar">
            <EventsCalendar />
          </section>
        </article>
      </main>
    </div>
  );
}
