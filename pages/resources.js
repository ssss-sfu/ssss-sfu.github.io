import { Helmet } from "@components";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { Dropdown } from "components/Dropdown.jsx";

const links = [
  {
    text: "Software Systems Main page",
    href: "https://www.sfu.ca/computing/prospective-students/undergraduate-students/programs/degree-programs/softwaresystems.html",
  },
  {
    text: "Software Systems Program Requirements page",
    href: "http://www.sfu.ca/students/calendar/2023/summer/programs/software-systems/major/bachelor-of-science.html",
  },
  {
    text: "Constitution",
    href: "https://www.sfu.ca/computing/about/constitution-and-mission-.html",
  },
  {
    text: "Looking to enroll in Software Systems",
    href: "https://www.sfu.ca/coop/programs/sosy/prospective.html",
  },
  {
    text: "SoSy 101",
    href: "https://www.reddit.com/r/simonfraser/comments/bmt2zc/software_systems_program_bsc_masterpost/",
  },
  // { text: "Academic Repo", href: "" }, Temporarily commented by Brian because I don't know if Academic Repo is here yet
  {
    text: "SFU Free Software",
    href: "https://www.sfu.ca/information-systems/services/software/list-of-software-at-sfu.html",
  },
  {
    text: "Software Systems Co-op program",
    href: "https://www.sfu.ca/coop/programs/sosy.html",
  },
];

const faqs = [
  {
    title: "What is Software Systems?",
    content:
      "Software Systems (SoSy) is a program within the School of Computing Science, that offers courses at both the Surrey and Burnaby campuses. By completing the program, students earn the degree of BSc Software Systems. SoSy is an applied area of computer science that focuses on teaching the skills to develop high-quality software.",
  },
  {
    title:
      "What is the difference between Computer Science and Software Systems?",
    content:
      "SoSy focuses more on applied, practical programming, while Computing Science focuses more on math and the theory of programming. Computing Science requires more math- and theory-heavy courses than SoSy. Another thing to note here is the structure of the two programs; Computing Science allows for more of a specialization in different areas if you plan your courses correctly, while SoSy is more structured, and doesn’t allow for as much freedom.",
  },
  {
    title: "How do I get on co-op?",
    content:
      "Students need at least a 2.50 CGPA and 30 credits before applying. New students are required to apply at least 2 terms before the semester they intend to do their first co-op work term. More info about the co-op program is provided on the link above",
  },
];

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
          <br />
          <ul className="resources-links">
            {links.map(({ text, href }, id) => (
              <li key={id}>
                <a href={href} target="_blank">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="container">
          <header>
            <h2>FAQs</h2>
          </header>

          <div>
            {faqs.map(({ title, content }, id) => (
              <Dropdown id={id} title={title} content={content} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
