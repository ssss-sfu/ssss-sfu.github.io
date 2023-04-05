import { Helmet } from "@components";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <Helmet />
      <Header />
      <main>
        <header className="container hero">
          <p>Resources</p>
          <h1>Useful links and software</h1>
        </header>

        <article className="container">
          <header>
            <h2>Resources</h2>
          </header>
          <br/>
          <ul className="resources-links">
            <li>
              <a href="" target="_blank">
                Software Systems Program page
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Constitution
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Looking to enroll in Software Systems
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                SoSy 101
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Academic Repo
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                SFU Free Software
              </a>
            </li>
          </ul>
        </article>

        <article className="container">
          <header>
            <h2>FAQ</h2>
          </header>
        </article>
        {/* <section className="annual-events__link-items">
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://discord.com/invite/XZUd7amxPq"
            >
              <h3>Frosh</h3>
              <p>The annual first year's kick off week</p>
            </a>
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://systemshacks.sfussss.org/"
            >
              <h3>Systems Hacks</h3>
              <p>The SSSS' annual hackathon - new theme every year!</p>
            </a>
            <a
              className="annual-events__link-item"
              target="_blank"
              href="https://systemsfair.ca/"
            >
              <h3>Systems Fair</h3>
              <p>Job fair in collaboration with the MSESSS and SEESS</p>
            </a>
          </section> */}
      </main>
      <Footer />
    </div>
  );
}
