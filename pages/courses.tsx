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
import { info } from "console";

const Courses: React.FC = () => {
  // Parse the JSON data using Zod schemas
  const [courseShown, setCourseShown] = useState<Course | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    setRequirements(z.array(RequirementSchema).parse(coursesJson));
  }, []);

  // const [currentExecs, setCurrentExecs] = useState<Profile[]>([]);

  // // TODO add validation and test cases for future PRs!
  // useEffect(() => {
  //   let json: string = JSON.stringify(execs.current);
  //   let profiles: Profile[] = JSON.parse(json);
  //   setCurrentExecs(profiles);
  // }, []);
  const renderConditionalCourseShown = () => {
    if (courseShown !== null) {
      return (
        <div className="sidebar-course">
          <div className="course-info">
            <p>
              <b>
                {courseShown?.info.dept} {courseShown?.info.number} (
                {courseShown?.info.units})
              </b>
            </p>
            <h3>{courseShown?.info.title}</h3>
            <p>{courseShown?.info.description}</p>
            {courseShown?.info.notes && <p>{courseShown.info.notes}</p>}
            <p>Prerequisites: {courseShown?.info.prerequisites}</p>
          </div>
        </div>
      );
    }
  };

  const handleClickCourseShown = (course: Course) => {
    setCourseShown(course !== courseShown ? course : null);
  };

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
        <section className="requirements-section">
          <div className="requirements-container">
            {requirements.map((req) => (
              <div className="requirement-block" key={req.requirement}>
                <h2>{req.requirement}</h2>
                <div className="courses-container">
                  {req.courses.map((course) => (
                    <div
                      className="btn secondary course-node"
                      key={`${course.info.dept}-${course.info.number}`}
                      onClick={() => handleClickCourseShown(course)}
                    >
                      {`${course.info.dept} ${course.info.number}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {renderConditionalCourseShown()}
        </section>
      </main>
    </div>
  );
};

export default Courses;
