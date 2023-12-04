import { Hero, ProfileCard } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import execs from "@jsons/execs.json";
import { useEffect, useState } from "react";
import { Profile } from "components/ProfileCard";
import coursesJson from "@jsons/courses.json";
import {
  CourseSchema,
  Course,
  CourseInfo,
  Requirement,
  RequirementSchema,
} from "types/course";
import { z } from "zod";

const Courses: React.FC = () => {
  // Parse the JSON data using Zod schemas
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    setRequirements(z.array(RequirementSchema).parse(coursesJson));
    console.log("req", requirements);
  }, []);

  // const [currentExecs, setCurrentExecs] = useState<Profile[]>([]);

  // // TODO add validation and test cases for future PRs!
  // useEffect(() => {
  //   let json: string = JSON.stringify(execs.current);
  //   let profiles: Profile[] = JSON.parse(json);
  //   setCurrentExecs(profiles);
  // }, []);

  return (
    <div className="page about-page">
      <Hero
        title="See the courses available at Software Systems"
        subtitle="Courses"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>Courses at Software Systems</h1>
          <p>
            Mandatory courses offered as part of the degree requirement of SFU
            Software Systems.
          </p>
        </section>
        <section className="requirements-container">
          {requirements.map((req) => (
            <div className="requirement-block" key={req.requirement}>
              <h2>{req.requirement}</h2>
              <div className="courses-container">
                {req.courses.map((course) => (
                  <div
                    className="btn secondary course-node"
                    key={`${course.info.dept}-${course.info.number}`}
                  >
                    {`${course.info.dept} ${course.info.number}`}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Courses;
