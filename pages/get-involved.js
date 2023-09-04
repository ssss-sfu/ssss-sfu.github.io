import Head from "next/head";
import Accordion from "../components/Accordion";
import { Hero, HeaderNav, Footer, Helmet } from "@components";
import { useState } from "react";
import HeroImage from "@images/landing-page/discover-ssss-main.png";
import Image from "next/image";
import academicRepo from "../public/images/get-involved-page/academic-repo.png";
import merch from "../public/images/get-involved-page/merch.png";
import website from "../public/images/get-involved-page/website.png";
import clock from "../public/images/get-involved-page/clock.svg";
import { useRouter } from "next/router";

export default function GetInvolved() {
  const router = useRouter();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const selectRole = (roleIndex) => setSelectedRoleIndex(roleIndex);
  return (
    <div className="get-involved-page">
      <Helmet pageTitle={router.pathname} />
      <HeaderNav />
      <Hero
        title="Join the Software Systems Student Society"
        subtitle="Get Involved"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>SSSS Elections</h1>
          <p>
            Join the Software Systems Student Society by running for any of the
            elected positions.{" "}
            <a
              href="https://discord.gg/599e3myXPj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Discord server
            </a>{" "}
            to stay up to date with election dates.
          </p>
        </section>
        <section className="roles-and-selected-role-desktop">
          <DisplayRoles
            roles={roles}
            selectedRoleId={selectedRoleIndex}
            selectRole={selectRole}
          />
          <DisplaySelectedRole
            role={roles.find((role, index) => index === selectedRoleIndex)}
          />
        </section>
        <section className="roles-and-selected-role-mobile">
          <Accordion data={roles} />
        </section>
        <section className="commitee-content">
          <h1>Commitees</h1>
          <p>
            Have you ever wanted to help out with the SSSS but might be worried
            about the time commitment? Or maybe you’re really passionate about
            merch, web design, or helping your peers out academically? Well the
            SSSS is excited to announce committees!
            <br></br>
            <br></br>
            What are committees? They’re an extension of the SSSS that focuses
            on one specific task, and membership is voluntary and automatic so
            you can help out your student society in a way that works for you.
            <br></br>
            <br></br>
            To join, go to the{" "}
            <span className="discord-channel-image-text">
              #what-are-commitees
            </span>{" "}
            channel on our{" "}
            <a href="https://discord.com/invite/hY7WjXt">SSSS Discord Server</a>{" "}
            to get a role.
          </p>
        </section>

        <section className="committee-container">
          <div className="committee-box">
            <div className="image-alignment">
              <Image
                src={academicRepo}
                layout="fill"
                objectFit="cover"
                alt="Academic repo image"
              />
            </div>
            <h3>Academic Repo Commitee</h3>
            <p>
              Collecting course notes, professor reviews, and past exams (with
              the professor’s permission) to better prepare everyone for their
              academic journey.
            </p>
            <p>
              <span className="access-time">
                <Image src={clock} height={18} width={18} alt="Clock" />
              </span>
              Meetings TBA
            </p>
            <span className="discord-channel-image-row">#academic repo</span>{" "}
          </div>

          <div className="committee-box">
            <div className="image-alignment">
              <Image
                src={merch}
                layout="fill"
                objectFit="cover"
                alt="Merch committee image"
              />
            </div>
            <h3>Merch Commitee</h3>
            <p>
              Design and sell hoodies, t-shirts, lanyards, and whatever else you
              think people would want to purchase. Create the cool SoSy swag you
              always wanted.
            </p>
            <p>
              <span className="access-time">
                <Image src={clock} height={18} width={18} alt="Clock" />
              </span>
              Meetings TBA
            </p>
            <span className="discord-channel-image-row">#merch</span>{" "}
          </div>
          <div className="committee-box">
            <div className="image-alignment">
              <Image
                src={website}
                layout="fill"
                objectFit="cover"
                alt="Website committee image"
              />
            </div>
            <h3>Website Committee</h3>
            <p>
              Help update and maintain our website and figure out what can be
              done with it.
            </p>
            <p>
              <span className="access-time">
                <Image src={clock} height={18} width={18} alt="Clock" />
              </span>
              Meetings every 1st and 3rd Thursday at 6:30 pm
            </p>
            <span className="discord-channel-image-row">#website</span>{" "}
          </div>
        </section>
        <section className="commitee-content">
          <h1>General Meeting</h1>
          <p>
            Join us during our public general meeting in{" "}
            <span className="discord-channel-image-text">#merch</span> where we
            discuss updates and matters including the following:
          </p>
          <div className="bulletlist">
            <ul>
              <li>Event updates and plans</li>
              <li>Updates from committees</li>
              <li>SFSS Council updates</li>
              <li>Upcoming projects</li>
              <li>Open Floor</li>
            </ul>
          </div>
          <br></br>
          <p>
            Watch out for an announcement to find out when our next general
            meeting will be.
          </p>
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
    <article id="selected-role-section">
      <h2>{role.name}</h2>
      <ul className="role-description-container">
        {role.content.map((paragraph, index) => (
          <li key={index} className="role-description">
            {paragraph}
          </li>
        ))}
      </ul>
    </article>
  );
}

const roles = [
  {
    name: "President",
    content: [
      "Carry out the business of the Software Systems Student Society as directed by decisions of the membership, and in accordance with this constitution, by delegation of duties to other members of the Society as necessary in order to ensure well being of the Society.",
      "Be responsible for calling regular and special general meetings.",
      "Assume ex officio membership on all committees within and to which the Software Systems Student Society appoints representatives.",
      "Act as official spokesperson and representative for the Software Systems Student Society.",
      "Be the official contact with the School of Computing Science and its representatives.",
      "Be the official contact with the Software Systems program staff and its representatives.",
      "Be the official contact with the Simon Fraser Student Society and its representatives.",
      "Be a signing officer of the Society, including the Society's Bank Account, if one exists.",
      "Be responsible for monitoring all projects funded through the society.",
      "Write a continuity report at the end of their term for the next executive member who will fill this position.",
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
      "Write a continuity report at the end of their term for the next executive member who will fill this position.",
    ],
  },
  {
    name: "Secretary",
    content: [
      "Ensure that proper notice of general and special general meetings is given, as specified by this constitution.",
      "Keep and reproduce minutes of Software Systems Student Society meetings and written records of all decisions made at properly constituted meeting of the society.",
      "Maintain records of all correspondence between the society and other organizations.",
      "Make the minutes of all meetings available to the public, including the Student Union Organizer.",
      "Compile semester executive, representative, and committee membership lists along with maintaining the mailing lists.",
      "Compile a semester contact list of the executive members for the School of Computing Science, the Software Systems program staff, and the Student Union Organizer.",
      "Write a continuity report at the end of their term for the next executive member who will fill this position.",
      "Distribute electronic versions of the minutes to appropriate SSSS mailing lists.",
      "Maintain the records of the SSSS, including but not limited to the minutes archive and the Google Drive.",
    ],
  },
  {
    name: "Treasurer",
    content: [
      "Maintain all financial records of the SSSS, including but not limited to the Society’s Bank Account if one exists, a record of submitted, approved and rejected grant proposals, and a record of submitted, approved and rejected reimbursements both from grant proposals and trust.",
      "Work closely with the Treasurer to coordinate grant proposals, reimbursements and event budgets.",
      "Be a signing officer of the Society, including the Society's Bank Account if one exists.",
      "Make regular reports to the membership.",
      "Write a continuity report at the end of their term for the next executive member who will fill this position.",
    ],
  },
  {
    name: "Director of Marketing",
    content: [
      "Chair the marketing committee, and be responsible for presenting its reports at the regular meetings as well as keeping a record of the meeting minutes and making the Secretary aware of them.",
      "Be responsible for ensuring the administration of maintenance, upkeep and smooth operation of all SSSS resources – including but not limited to common room(s), computer(s), the office, and merchandise, such that these resources remain in good working order and are usable by the membership.",
      "Be responsible for the distribution of appropriate posters, online notifications, and other advertising materials pursuant to the creation of awareness about the Society and its events or delegate such responsibilities as necessary.",
      "Be a signing officers of the Society, including the Society's Bank Account.",
      "Write a continuity report at the end of their term for the next executive member who will fill their position.",
    ],
  },
  {
    name: "Director of Activities (2)",
    content: [
      "Chair the activities committee, and be responsible for presenting its reports at the regular meetings as well as supplying a copy of the meeting's minutes to the Secretary.",
      "Plan, organize, and execute all SSSS sponsored events and fundraisers or delegate such responsibilities as necessary.",
      "Work closely with the Treasurer to coordinate grant proposals, reimbursements and event budgets.",
      "Be signing officers of the Society, including the Society's Bank Account.",
      "Write a continuity report at the end of their term for the next executive member who will fill their position.",
      "Write a report containing procedures and contacts for each class of event for future SSSS members.",
    ],
  },
  {
    name: "Director of Visual Design",
    content: [
      "Produce art and graphics for events, meetings, merchandise, promotional materials and any other materials the Society may require",
      "Maintain communication with relevant officers to keep the content of the graphics relevant and updated.",
    ],
  },
  {
    name: "External Representative",
    content: [
      "Share responsibility for the day-to-day operations of the SSSS and its resources.",
      "Work closely with the Director(s) of Activities to recruit sponsors for relevant events.",
      "Act as a channel of communication between the Director(s) of Activities and the Director of Marketing and Director of Visual Design to produce sponsorship packages to recruit sponsors for relevant events.",
      "Be available to the other executives to assist them with tasks relating to the operations and activities of the SSSS.",
      "Work closely with the Internal Representative to make sure the society’s needs for representation outside of the school and SFSS are being met.",
      "Attend meetings external to the SSSS and the SFSS as a representative of this Society, in the cases where there is no previously appointed representative of this Society attending the aforementioned meeting or when such a representative is unable to attend and has given sufficient notice.",
      "Write a continuity report at the end of their term for the next executive member who will fill their position.",
    ],
  },
  {
    name: "Internal Representative",
    content: [
      "Share responsibility for the day-to-day operations of the SSSS and its resources.",
      "Be available to the other executives to assist them with tasks relating to the operations and activities of the SSSS.",
      "Work closely with the External Representative to make sure the society’s needs for representation within the school and SFSS are being met.",
      "Attend meetings internal to the SFSS as a representative of this Society, in the cases where there is no previously appointed representative of this Society attending the aforementioned meeting or when such a representative is unable to attend and has given sufficient notice.",
      "Write a continuity report at the end of their term for the next executive member who will fill their position.",
    ],
  },
  {
    name: "Year Representative",
    content: [
      "2 roles for first years.",
      "1 role for second, third, and fourth years.",
      "Share responsibility for the day-to-day operations of the SSSS and its resources.",
      "Ensure that issues and views pertaining to the Members in their specific year of Post-Secondary education are well represented within the Executive and the Society as a whole.",
      "Comprise a separate committee under the Vice President as well as maintaining positions on the main executive council.",
      "Write a continuity report at the end of their term for the next executive member who will fill this position.",
    ],
  },
  {
    name: "SFSS Council Representative",
    content: [
      "Sit on the executive council of the SSSS and be elected in the SSSS general election, unless otherwise filled – or previously specified to be filled – during the course of the SFSS general election.",
      "Follow all Simon Fraser Student Society requirements for a Student Union Forum Representative.",
      "Act to further the best interests of the Software Systems Student Society as directed by the membership, within the Simon Fraser Student Society Council.",
      "Report on the activities of the Simon Fraser Student Society Council at general meetings.",
      "Submit a written report for each meeting to the Secretary for distribution and filing.",
    ],
  },
];
