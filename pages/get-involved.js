import { Hero, Accordion } from "@components";
import { useState } from "react";
import HeroImage from "@images/landing-page/discover-ssss-main.png";
import Image from "next/image";
import academicRepo from "../public/images/get-involved-page/academic-repo.png";
import merch from "../public/images/get-involved-page/merch.png";
import website from "../public/images/get-involved-page/website.png";
import clock from "../public/images/get-involved-page/clock.svg";
import roles from "@jsons/exec-roles.json";

export default function GetInvolved() {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const selectRole = (roleIndex) => setSelectedRoleIndex(roleIndex);
  return (
    <div className="page get-involved-page">
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
              href="https://discord.com/invite/whdfmJbVF7"
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
            <a href="https://discord.com/invite/whdfmJbVF7">
              SSSS Discord Server
            </a>{" "}
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
              Asynchronous
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
              Asynchronous
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
              Help update and maintain our main, hackathon, and other potential
              website. Figure out what can be done to help inform the society.
            </p>
            <p>
              <span className="access-time">
                <Image src={clock} height={18} width={18} alt="Clock" />
              </span>
              Asynchronous
            </p>
            <span className="discord-channel-image-row">#website</span>{" "}
          </div>
        </section>
        <section className="commitee-content">
          <h1>General Meeting</h1>
          <p>
            Join us during our public general meeting in{" "}
            <span className="discord-channel-image-text">
              #room-4016-public{" "}
            </span>{" "}
            where we discuss updates and matters including the following:
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
