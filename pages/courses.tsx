import { Hero } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import { useEffect, useState } from "react";
import { Course, Requirement, RequirementSchema } from "types/course";
import { z } from "zod";
import { SidebarCourse } from "components/SidebarCourse";
import CourseTree from "components/CourseTree";
import { formatDate } from "utils";

const COURSES_JSON_URL =
  "https://raw.githubusercontent.com/ssss-sfu/course-explorer-script/main/result/courses.json";

const COURSES_API_COMMITS_URL =
  "https://api.github.com/repos/ssss-sfu/course-explorer-script/commits?per_page=1";

const Courses: React.FC = () => {
  // Parse the JSON data using Zod schemas
  const [courseShown, setCourseShown] = useState<Course | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string | null>(null);

  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

  useEffect(() => {
    const fetchLastUpdatedDate = async () => {
      try {
        const response = await fetch(COURSES_API_COMMITS_URL, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const commits = await response.json();

        if (commits.length === 0) {
          throw new Error("No commits found.");
        }

        const lastUpdatedDate = commits[0].commit.author.date;
        localStorage.setItem("lastUpdatedDate", lastUpdatedDate);
        setLastUpdatedDate(lastUpdatedDate);
      } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
      }
    };
    fetchLastUpdatedDate();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const lastUpdatedDateLocalStorage =
          localStorage.getItem("lastUpdatedDate");
        const cachedCourses = localStorage.getItem("courses");

        let json = "";
        if (cachedCourses && lastUpdatedDate == lastUpdatedDateLocalStorage) {
          json = JSON.parse(cachedCourses);
        } else {
          json = await (await fetch(COURSES_JSON_URL)).json();
          localStorage.setItem("courses", JSON.stringify(json));
        }
        setRequirements(z.array(RequirementSchema).parse(json));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [lastUpdatedDate]);

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
          <p>Last updated: {lastUpdatedDate && formatDate(lastUpdatedDate)}</p>
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
        <section>
          <h2>Course Tree For Spring 2025</h2>
          <CourseTree />
        </section>
      </main>
    </div>
  );
};

export default Courses;
