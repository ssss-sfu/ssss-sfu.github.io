import { Hero } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import { useEffect, useState } from "react";
import coursesJson from "@jsons/courses.json";
import { Course, Requirement, RequirementSchema } from "types/course";
import { z } from "zod";
import { SidebarCourse } from "components/SidebarCourse";

const Courses: React.FC = () => {
  // Parse the JSON data using Zod schemas
  const [courseShown, setCourseShown] = useState<Course | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    setRequirements(z.array(RequirementSchema).parse(coursesJson));
  }, []);

  return (
    <div className="page courses-page">
      <Hero
        title="See the courses available at Software Systems"
        subtitle="Courses"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>Courses at Software Systems</h1>
          <p>
            Mandatory and semi-mandatory courses offered as part of the degree
            requirement of SFU Software Systems.
          </p>
          <p>
            Note: Not all the courses are mandatory. In the Systems or Software
            Engineering requirements, students only need to take 3 or 2 out of
            the listed courses as example.
          </p>
          <p>
            Refer to Software Systems{" "}
            <a
              href="https://www.sfu.ca/students/calendar/2024/spring/programs/software-systems/major/bachelor-of-science.html"
              target="_blank"
              rel="noreferrer"
            >
              program calendar site
            </a>{" "}
            or{" "}
            <a
              href="https://www.sfu.ca/computing/current-students/undergraduate-students/forms"
              target="_blank"
              rel="noreferrer"
            >
              forms site
            </a>{" "}
            for official resources.
          </p>
          <p>Last updated: June 23, 2024</p>
        </section>
        <section className="requirements-section">
          <div
            className={`requirements-container ${
              courseShown !== null ? "half-width" : ""
            }`}
          >
            {requirements.map((req: Requirement) => (
              <div className="requirement-block" key={req.requirement}>
                <h2>{req.requirement}</h2>
                <div className="courses-container">
                  {req.courses.map((course: Course) => (
                    <div
                      className="btn secondary course-node"
                      key={`${course.info.dept}-${course.info.number}`}
                      onClick={() =>
                        setCourseShown(course !== courseShown ? course : null)
                      }
                    >
                      {`${course.info.dept} ${course.info.number}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {courseShown && (
            <SidebarCourse
              course={courseShown}
              closeCourseShown={() => setCourseShown(null)}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Courses;
