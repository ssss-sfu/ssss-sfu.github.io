import Head from "next/head";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { useState } from "react";

const roles = [
  {
    name: "President",
    content: [
      "Carry out the business of the Software Systems Student Society as directed by decisions of the membership, and in accordance with this constitution, by delegation of duties to other members of the Society as necessary in order to ensure well being of the Society",
      "Be responsible for calling regular and special general meetings.",
      "Assume ex officio membership on all committees wit… Systems Student Society appoints representatives.",
      "Act as official spokesperson and representative for the Software Systems Student Society.",
      "Be the official contact with the School of Computing Science and its representatives.",
      "Be the official contact with the Software Systems program staff and its representatives.",
      "Be the official contact with the Simon Fraser Student Society and its representatives.",
      "Be a signing officer of the Society, including the Society's Bank Account, if one exists.",
      "Be responsible for monitoring all projects funded through the society.",
      "Write a continuity report at the end of their term…next executive member who will fill this position.",
    ],
  },
  {
    name: "Vice President",
    content: [
      "Chair the Year Representative committee, and be responsible for presenting items of interest at the regular meetings as well as supplying a copy of the meeting's minutes to the Secretary.",
      "Chair all meetings or shall share or delegate this task on direction from a general meeting.",
      "Perform public relations tasks on behalf of the SSSS in order to promote the SSSS and expand its membership.",
      "Co-ordinate volunteers for the continued operation of the SSSS.",
      "Provide a line of communication between the SSSS and graduate students and alumni.",
      "Assume the duties of the President in the event that the President is unable or unavailable to carry them out, or that the position of President becomes vacant.",
      "Be a signing officer of the Society, including the Society's Bank Account, if one exists.",
      "Write a continuity report at the end of their term for the next executive member who will fill this position",
    ],
  },
  {
    name: "Secretary",
    content: ["lols"],
  },
  {
    name: "Treasurer",
    content: ["lols"],
  },
  {
    name: "Director of Marketing",
    content: ["lols"],
  },
  {
    name: "Director of Activities (2)",
    content: ["lols"],
  },
  {
    name: "Director of Visual Design",
    content: ["lols"],
  },
  {
    name: "External Representative",
    content: ["lols"],
  },
  {
    name: "Internal Representative",
    content: ["lols"],
  },
  {
    name: "Second Year Representative",
    content: ["lols"],
  },
  {
    name: "Third Year Representative",
    content: ["lols"],
  },
  {
    name: "Fourth Year Representative",
    content: ["lols"],
  },
];

export default function GetInvolved() {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const selectRole = (roleIndex) => setSelectedRoleIndex(roleIndex);
  return (
    <div>
      <Head>
        <title>Software Systems Student Society</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="get-involved-page container">
        <section className="section-container space-vertically-full">
          <h1>SSSS Elections</h1>
          <p>
            Join the Software Systems Student Society by running for any of the
            elected positions. Join our Discord server to stay up to date with
            election dates.
          </p>
        </section>
        <section className="roles-and-selected-role-container section-container">
          <DisplayRoles
            roles={roles}
            selectedRoleId={selectedRoleIndex}
            selectRole={selectRole}
          />
          <DisplaySelectedRole
            role={roles.find((role, index) => index === selectedRoleIndex)}
          />
        </section>
        <section id="past-elections">
          <h2>Past Elections</h2>
          <p>is;adjfa;dksjkf</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function DisplayRoles({ roles, selectedRoleId, selectRole }) {
  return (
    <ul id="roles-section" className="role-list-container">
      {roles.map(({ name }, index) => {
        const active = index === selectedRoleId;
        return (
          <li key={index}>
            <div className={`selected-bar ${active ? "show-bar" : ""}`}></div>
            <button
              className={`${active ? "active-button" : ""}`}
              onClick={() => selectRole(index)}
            >
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DisplaySelectedRole({ role }) {
  return (
    <article id="selected-role-section" className="selected-role-container">
      <h2>{role.name}</h2>
      <div className="space-vertically-half">
        {role.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
