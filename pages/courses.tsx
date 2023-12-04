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
            <h2>{courseShown?.info.title}</h2>
            <p>{courseShown?.info.description}</p>
            {courseShown?.info.notes && <p>{courseShown.info.notes}</p>}
            <p>Prerequisites: {courseShown?.info.prerequisites}</p>
          </div>
          <div className="course-info course-last-sections">
            <h2>Last available - {courseShown?.last_sections.term}</h2>
            <div className="sections-container">
              {courseShown?.last_sections.sections
                .filter((s) => s.info.type !== "n")
                .map((section) => {
                  const instructorNames =
                    section.info.instructorNames.length > 0
                      ? section.info.instructorNames
                      : ["Unknown"];
                  return (
                    <div
                      className="section-unit"
                      key={section.info.classNumber}
                    >
                      <p>
                        {section.info.section} - {instructorNames.join(", ")}
                      </p>
                      {section.info.campus !== "None" && (
                        <p>{section.info.campus}</p>
                      )}
                      <ul className="schedule-list">
                        {section.courseSchedule
                          .filter((schedule) => schedule.days !== "")
                          .map((schedule) => {
                            return (
                              <li
                                key={schedule.sectionCode}
                                className="schedule-unit"
                              >
                                {schedule.days}; {schedule.startTime}-{" "}
                                {schedule.endTime}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="course-info course-last-sections">
            {courseShown?.future_sections.sections.length > 0 ? (
              <>
                <h2>Next available - {courseShown?.future_sections.term}</h2>
                <div className="sections-container">
                  {courseShown?.future_sections.sections
                    .filter((s) => s.info.type !== "n")
                    .map((section) => {
                      const instructorNames =
                        section.info.instructorNames.length > 0
                          ? section.info.instructorNames
                          : ["Unknown"];
                      return (
                        <div
                          className="section-unit"
                          key={section.info.classNumber}
                        >
                          <p>
                            {section.info.section} -{" "}
                            {instructorNames.join(", ")}
                          </p>
                          {section.info.campus !== "None" && (
                            <p>{section.info.campus}</p>
                          )}

                          <ul className="schedule-list">
                            {section.courseSchedule
                              .filter((schedule) => schedule.days !== "")
                              .map((schedule) => {
                                return (
                                  <li
                                    key={schedule.sectionCode}
                                    className="schedule-unit"
                                  >
                                    {schedule.days}; {schedule.startTime}-{" "}
                                    {schedule.endTime}
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <h2>
                Currently not offered for {courseShown?.future_sections.term}
              </h2>
            )}
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
