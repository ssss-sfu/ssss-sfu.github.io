import { Hero } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import { useState, useEffect } from "react";
import { Course, Requirement } from "types/course";
import { SidebarCourse } from "components/SidebarCourse";
import { formatDate } from "utils";
import ClipLoader from "react-spinners/ClipLoader";

// API endpoint for SFU Courses
const SFU_COURSES_API_BASE = "https://api.sfucourses.com/v1/rest/outlines";

export interface SFUCourseResponse {
  dept: string;
  number: string;
  title: string;
  units: string;
  description: string;
  notes: string;
  designation: string;
  deliveryMethod: string;
  prerequisites: string;
  corequisites: string;
  degreeLevel: string;
  offerings: Array<{
    instructors: string[];
    term: string;
  }>;
}

const REQUIREMENT_COURSES = {
  "Lower Division Core": [
    { dept: "CMPT", number: "105w" },
    { dept: "CMPT", number: "130" },
    { dept: "CMPT", number: "135" },
    { dept: "CMPT", number: "210" },
    { dept: "CMPT", number: "213" },
    { dept: "CMPT", number: "225" },
    { dept: "CMPT", number: "276" },
    { dept: "CMPT", number: "295" },
    { dept: "MACM", number: "101" },
    { dept: "MSE", number: "110" },
    { dept: "STAT", number: "271" },
    { dept: "MATH", number: "150" },
    { dept: "MATH", number: "151" },
    { dept: "MATH", number: "152" },
    { dept: "MATH", number: "232" },
  ],
  "Upper Division Core": [
    { dept: "CMPT", number: "307" },
    { dept: "CMPT", number: "376w" },
  ],
  "Systems Requirements": [
    { dept: "CMPT", number: "300" },
    { dept: "CMPT", number: "354" },
    { dept: "CMPT", number: "371" },
    { dept: "CMPT", number: "372" },
    { dept: "CMPT", number: "431" },
    { dept: "CMPT", number: "433" },
    { dept: "CMPT", number: "454" },
    { dept: "CMPT", number: "471" },
  ],
  "Software Engineering Requirements": [
    { dept: "CMPT", number: "373" },
    { dept: "CMPT", number: "473" },
    { dept: "CMPT", number: "379" },
    { dept: "CMPT", number: "383" },
    { dept: "CMPT", number: "384" },
    { dept: "CMPT", number: "474" },
    { dept: "CMPT", number: "477" },
  ],
  "Capstone Project Requirements": [
    { dept: "CMPT", number: "494" },
    { dept: "CMPT", number: "495" },
  ],
};

const Courses: React.FC = () => {
  const [courseShown, setCourseShown] = useState<SFUCourseResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDataUpdate, setLastDataUpdate] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.sfucourses.com/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.lastDataUpdate) {
          setLastDataUpdate(data.lastDataUpdate);
        }
      });
  }, []);

  function formatHealthDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      year: "numeric",
      hour12: true,
      timeZone: "America/Los_Angeles",
    };
    return date.toLocaleString("en-US", options) + " PST";
  }

  function formatRelativeTime(dateString: string): string {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) {
      return `(${diffMins} min${diffMins === 1 ? "" : "s"} ago)`;
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `(${diffHours} hour${diffHours === 1 ? "" : "s"} ago)`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `(${diffDays} day${diffDays === 1 ? "" : "s"} ago)`;
  }

  const handleCourseClick = async (dept: string, number: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${SFU_COURSES_API_BASE}/${dept.toLowerCase()}/${number}`
      );
      if (!response.ok) {
        setError(`Failed to fetch ${dept} ${number}: ${response.statusText}`);
        setCourseShown(null);
        setLoading(false);
        return;
      }
      const data: SFUCourseResponse = await response.json();
      setCourseShown(data);
    } catch (err) {
      setError("Failed to fetch course data. Please try again later.");
      setCourseShown(null);
    } finally {
      setLoading(false);
    }
  };

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
          <p>
            Data powered by{" "}
            <a
              href="https://api.sfucourses.com"
              target="_blank"
              rel="noreferrer"
            >
              api.sfucourses.com
            </a>
            {lastDataUpdate && (
              <>
                {" as of "}
                {formatHealthDate(lastDataUpdate)}{" "}
                {formatRelativeTime(lastDataUpdate)}
              </>
            )}
          </p>
        </section>
        <section className="requirements-section">
          <div
            className={`requirements-container ${
              courseShown !== null ? "half-width" : ""
            }`}
          >
            {Object.entries(REQUIREMENT_COURSES).map(
              ([requirement, courseList]) => (
                <div className="requirement-block" key={requirement}>
                  <h2>{requirement}</h2>
                  <div className="courses-container">
                    {courseList.map((course) => (
                      <div
                        className="btn secondary course-node"
                        key={`${course.dept}-${course.number}-${requirement}`}
                        onClick={() =>
                          handleCourseClick(course.dept, course.number)
                        }
                      >
                        {`${course.dept} ${course.number}`}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          {loading && (
            <div className="sidebar-course">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "16px 0",
                }}
              >
                <ClipLoader size={32} color="#555" />
              </div>
              <p>Loading course data...</p>
            </div>
          )}
          {courseShown && !loading && (
            <div>
              <SidebarCourse
                course={courseShown}
                closeCourseShown={() => setCourseShown(null)}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Courses;
