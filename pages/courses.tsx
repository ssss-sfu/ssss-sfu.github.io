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
            Mandatory courses offered as part of the degree requirement of SFU
            Software Systems.
          </p>
        </section>
        <section className="requirements-section">
          <div
            className={`requirements-container ${
              courseShown === null ? "full-width" : ""
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
