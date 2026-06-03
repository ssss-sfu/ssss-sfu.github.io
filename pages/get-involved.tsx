import { useState } from "react";
import { Hero, Accordion } from "@components";
import HeroImage from "@images/landing-page/discover-ssss-main.png";
import Image from "next/image";
import academicRepo from "../public/images/get-involved-page/academic-repo.png";
import merch from "../public/images/get-involved-page/merch.png";
import website from "../public/images/get-involved-page/website.png";
import clock from "../public/images/get-involved-page/clock.svg";
import roles from "@jsons/exec-roles.json";

interface Role {
  name: string;
  content: string[];
}

interface GetInvolvedProps {}

const GetInvolved: React.FC<GetInvolvedProps> = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const selectRole = (roleIndex: number): void =>
    setSelectedRoleIndex(roleIndex);
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
};

interface DisplayRolesProps {
  roles: Role[];
  selectedRoleId: number;
  selectRole: (roleIndex: number) => void;
}

const DisplayRoles: React.FC<DisplayRolesProps> = ({
  roles,
  selectedRoleId,
  selectRole,
}) => {
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
};

interface DisplaySelectedRoleProps {
  role?: Role;
}

const DisplaySelectedRole: React.FC<DisplaySelectedRoleProps> = ({ role }) => {
  if (!role) return <></>;

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
};

export default GetInvolved;
