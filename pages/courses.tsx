import { Hero, Dropdown } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import { useState, useEffect } from "react";
import { SidebarCourse } from "components/SidebarCourse";
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

type CourseRef = {
  dept: string;
  number: string;
  note?: string;
};

type RequirementGroup = {
  title: string;
  rule: string;
  courses: CourseRef[];
  footnote?: string;
};

type TextRequirementSection = {
  heading: string;
  description: string;
  rules: { title: string; body: string }[];
  footnote?: string;
};

const LOWER_DIVISION_REQUIREMENTS: {
  heading: string;
  description: string;
  groups: RequirementGroup[];
} = {
  heading: "Lower Division Requirements",
  description:
    "It is recommended to complete these courses within your first two years.",
  groups: [
    {
      title: "Writing",
      rule: "Choose one W course:",
      courses: [
        { dept: "CMPT", number: "105W" },
        { dept: "ENSC", number: "105W" },
        { dept: "MSE", number: "101W" },
        { dept: "SEE", number: "101W" },
      ],
    },
    {
      title: "Core",
      rule: "Complete all of the following:",
      courses: [
        { dept: "CMPT", number: "130" },
        { dept: "CMPT", number: "135" },
        { dept: "CMPT", number: "201" },
        { dept: "CMPT", number: "210" },
        { dept: "CMPT", number: "213" },
        { dept: "CMPT", number: "225" },
        { dept: "CMPT", number: "276" },
        { dept: "CMPT", number: "295" },
        { dept: "MACM", number: "101" },
        { dept: "STAT", number: "271" },
      ],
    },
    {
      title: "Calculus I",
      rule: "Choose one of the following:",
      courses: [
        { dept: "MATH", number: "150" },
        { dept: "MATH", number: "151" },
        { dept: "MATH", number: "154" },
        { dept: "MATH", number: "157" },
      ],
      footnote:
        "MATH 154 and MATH 157 require a grade of B+ or better and school permission.",
    },
    {
      title: "Calculus II",
      rule: "Choose one of the following:",
      courses: [
        { dept: "MATH", number: "152" },
        { dept: "MATH", number: "155" },
        { dept: "MATH", number: "158" },
      ],
      footnote:
        "MATH 155 and MATH 158 require a grade of B+ or better and school permission.",
    },
    {
      title: "Linear Algebra",
      rule: "Choose one of the following:",
      courses: [
        { dept: "MATH", number: "232" },
        { dept: "MATH", number: "240" },
      ],
    },
  ],
};

const UPPER_DIVISION_REQUIREMENTS: {
  heading: string;
  description: string;
  groups: RequirementGroup[];
} = {
  heading: "Upper Division Requirements",
  description:
    "It is recommended to consult with an Academic Advisor before commencing upper division courses.",
  groups: [
    {
      title: "Main Requirements",
      rule: "Complete at least 45 upper division units including the following 2 courses:",
      courses: [
        { dept: "CMPT", number: "307" },
        { dept: "CMPT", number: "376W" },
      ],
    },
    {
      title: "Systems Requirements",
      rule: "Complete at least 12 upper division units from the following:",
      courses: [
        { dept: "CMPT", number: "303" },
        { dept: "CMPT", number: "354" },
        { dept: "CMPT", number: "371" },
        { dept: "CMPT", number: "372" },
        { dept: "CMPT", number: "431" },
        { dept: "CMPT", number: "433" },
        { dept: "CMPT", number: "454" },
        { dept: "CMPT", number: "471" },
      ],
    },
    {
      title: "Software Engineering Requirements",
      rule: "Complete at least 12 upper division units including the following:",
      courses: [
        { dept: "CMPT", number: "373" },
        { dept: "CMPT", number: "473" },
      ],
    },
    {
      title: "Additional Software Engineering Requirements",
      rule: "and at least two of the following:",
      courses: [
        { dept: "CMPT", number: "379" },
        { dept: "CMPT", number: "383" },
        { dept: "CMPT", number: "384" },
        { dept: "CMPT", number: "474" },
        { dept: "CMPT", number: "477" },
      ],
    },
    {
      title: "Capstone Project Requirements",
      rule: "Complete either the following or see the alternative requirements below:",
      courses: [
        { dept: "CMPT", number: "494" },
        { dept: "CMPT", number: "495" },
      ],
    },
    {
      title: "Capstone Alternative Requirements",
      rule: "Complete two of the following:",
      courses: [
        { dept: "CMPT", number: "379" },
        { dept: "CMPT", number: "431" },
        { dept: "CMPT", number: "433" },
      ],
    },
  ],
};

const DEPTH_REQUIREMENTS: TextRequirementSection = {
  heading: "Depth Requirements",
  description:
    "Depth requirements ensure you take enough upper-level CMPT or MACM coursework beyond the core lists above.",
  rules: [
    {
      title: "Additional 300/400-level units",
      body: "Complete 6 additional CMPT or MACM units at the 300- or 400-level.",
    },
    {
      title: "400-level minimum",
      body: "Overall, complete at least 12 CMPT or MACM units at the 400-level.",
    },
  ],
  footnote:
    "CMPT 415, 416, and 498 may only be included with permission of the school.",
};

function courseKey(dept: string, number: string) {
  return `${dept.toUpperCase()}-${number.toUpperCase()}`;
}

function isUpperLevelCourse(number: string): boolean {
  const match = number.match(/^(\d{3})/i);
  if (!match) return false;
  const level = Number(match[1]);
  return level >= 300 && level < 500;
}

function sortCourses(a: CourseRef, b: CourseRef): number {
  const deptCompare = a.dept.localeCompare(b.dept);
  if (deptCompare !== 0) return deptCompare;
  return a.number.localeCompare(b.number, undefined, { numeric: true });
}

// Flattening requirement courses into a single list of courses
function flattenRequirementCourses(
  sections: { groups: RequirementGroup[] }[]
): CourseRef[] {
  return sections.flatMap((section) =>
    section.groups.flatMap((group) => group.courses)
  );
}

const Courses: React.FC = () => {
  const [courseShown, setCourseShown] = useState<SFUCourseResponse | null>(
    null
  );
  // Which chip stays green while its panel is open (e.g. "CMPT-105W")
  const [selectedCourseKey, setSelectedCourseKey] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDataUpdate, setLastDataUpdate] = useState<string | null>(null);
  const [depthElectiveCourses, setDepthElectiveCourses] = useState<CourseRef[]>(
    []
  );
  const [otherCmptCourses, setOtherCmptCourses] = useState<CourseRef[]>([]);

  useEffect(() => {
    fetch("https://api.sfucourses.com/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.lastDataUpdate) {
          setLastDataUpdate(data.lastDataUpdate);
        }
      });

    const upperRequiredSet = new Set(
      flattenRequirementCourses([UPPER_DIVISION_REQUIREMENTS]).map((c) =>
        courseKey(c.dept, c.number)
      )
    );
    const allRequiredSet = new Set(
      flattenRequirementCourses([
        LOWER_DIVISION_REQUIREMENTS,
        UPPER_DIVISION_REQUIREMENTS,
      ]).map((c) => courseKey(c.dept, c.number))
    );

    Promise.all([
      fetch(`${SFU_COURSES_API_BASE}?dept=cmpt`).then(
        (res) => res.json() as Promise<{ dept: string; number: string }[]>
      ),
      fetch(`${SFU_COURSES_API_BASE}?dept=macm`).then(
        (res) => res.json() as Promise<{ dept: string; number: string }[]>
      ),
    ]).then(([cmptCourses, macmCourses]) => {
      const toCourseRef = (c: { dept: string; number: string }): CourseRef => ({
        dept: c.dept.toUpperCase(),
        number: c.number.toUpperCase(),
      });

      const uniqueByKey = (courses: CourseRef[]) =>
        courses.filter(
          (course, index, list) =>
            list.findIndex(
              (c) =>
                courseKey(c.dept, c.number) ===
                courseKey(course.dept, course.number)
            ) === index
        );

      const depthElectives = uniqueByKey(
        [...cmptCourses, ...macmCourses]
          .map(toCourseRef)
          .filter(
            (c) =>
              (c.dept === "CMPT" || c.dept === "MACM") &&
              isUpperLevelCourse(c.number) &&
              !upperRequiredSet.has(courseKey(c.dept, c.number))
          )
      ).sort(sortCourses);

      const otherCmpt = uniqueByKey(
        cmptCourses
          .map(toCourseRef)
          .filter(
            (c) =>
              !allRequiredSet.has(courseKey(c.dept, c.number)) &&
              !isUpperLevelCourse(c.number)
          )
      ).sort(sortCourses);

      setDepthElectiveCourses(depthElectives);
      setOtherCmptCourses(otherCmpt);
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
    const key = courseKey(dept, number);
    // highlight immediately so the chip feels selected before the fetch finishes
    setSelectedCourseKey(key);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${SFU_COURSES_API_BASE}?dept=${dept.toLowerCase()}&number=${number}`
      );
      if (!response.ok) {
        setError(`Failed to fetch ${dept} ${number}: ${response.statusText}`);
        setCourseShown(null);
        setSelectedCourseKey(null);
        return;
      }
      const data = await response.json();
      setCourseShown(data[0]);
    } catch (err) {
      setError("Failed to fetch course data. Please try again later.");
      setCourseShown(null);
      setSelectedCourseKey(null); // revert UI to original state
    } finally {
      setLoading(false);
    }
  };

  // Close clears both the panel and the green chip
  const closeCourse = () => {
    setCourseShown(null);
    setSelectedCourseKey(null);
  };

  // shared chip class: green sticks when this course matches selectedCourseKey
  const courseChipClass = (dept: string, number: string) =>
    `btn secondary course-node${selectedCourseKey === courseKey(dept, number) ? " is-selected" : ""
    }`;

  const renderCourseSection = (section: {
    heading: string;
    description: string;
    groups: RequirementGroup[];
  }) => (
    <Dropdown
      key={section.heading}
      id={section.heading.toLowerCase().replace(/\s+/g, "-")}
      title={<h2>{section.heading}</h2>}
    >
      <div className="requirement-block-content">
        <p className="requirement-description">{section.description}</p>
        {section.groups.map((group) => (
          <div className="requirement-group" key={group.title}>
            <h3>{group.title}</h3>
            <p className="rule-description">{group.rule}</p>
            <div className="courses-container">
              {group.courses.map((course) => (
                <div
                  className={courseChipClass(course.dept, course.number)}
                  key={courseKey(course.dept, course.number)}
                  onClick={() => handleCourseClick(course.dept, course.number)}
                >
                  {`${course.dept} ${course.number}`}
                </div>
              ))}
            </div>
            {group.footnote && (
              <p className="requirement-footnote">{group.footnote}</p>
            )}
          </div>
        ))}
      </div>
    </Dropdown>
  );

  const renderTextSection = (
    section: TextRequirementSection,
    electiveCourses?: CourseRef[]
  ) => (
    <Dropdown
      key={section.heading}
      id={section.heading.toLowerCase().replace(/\s+/g, "-")}
      title={<h2>{section.heading}</h2>}
    >
      <div className="requirement-block-content">
        <p className="requirement-description">{section.description}</p>
        {section.rules.map((rule) => (
          <div className="requirement-group" key={rule.title}>
            <h3>{rule.title}</h3>
            <p className="rule-description">{rule.body}</p>
          </div>
        ))}
        {electiveCourses && (
          <div className="requirement-group">
            <h3>Eligible electives</h3>
            <p className="rule-description">
              CMPT and MACM 300/400-level courses not already listed in the
              Upper Division pools above:
            </p>
            <div className="courses-container">
              {electiveCourses.map((course) => (
                <div
                  className={courseChipClass(course.dept, course.number)}
                  key={courseKey(course.dept, course.number)}
                  onClick={() => handleCourseClick(course.dept, course.number)}
                >
                  {`${course.dept} ${course.number}`}
                </div>
              ))}
            </div>
          </div>
        )}
        {section.footnote && (
          <p className="requirement-footnote">{section.footnote}</p>
        )}
      </div>
    </Dropdown>
  );

  return (
    <div className="page courses-page">
      <Hero
        title="See the courses available at Software Systems"
        subtitle="Courses"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>Software Systems Course Requirements</h1>
          <p>
            This page summarizes the course requirements for the Software
            Systems major. Click any course to view its description,
            prerequisites, and recent offerings.
          </p>
          <p>
            This is a student-friendly summary, not the official program
            document. To see official requirements, see the{" "}
            <a
              href="https://www.sfu.ca/students/calendar/2026/fall/programs/software-systems/major/bachelor-of-science.html"
              target="_blank"
              rel="noreferrer"
            >
              program calendar site
            </a>{" "}
            or contact an{" "}
            <a
              href="https://www.sfu.ca/fas/study/support-services/academic-advising.html"
              target="_blank"
              rel="noreferrer"
            >
              Applied Sciences Advisor
            </a>
            .
          </p>
        </section>
        <section className="requirements-section">
          <div className="requirements-container">
            {renderCourseSection(LOWER_DIVISION_REQUIREMENTS)}
            {renderCourseSection(UPPER_DIVISION_REQUIREMENTS)}
            {renderTextSection(DEPTH_REQUIREMENTS, depthElectiveCourses)}

            {otherCmptCourses.length > 0 && (
              <Dropdown
                id="other-cmpt-courses"
                title={<h2>Other CMPT Courses</h2>}
              >
                <div className="requirement-block-content">
                  <p className="requirement-description">
                    Lower-level CMPT courses not listed in the degree
                    requirements above.
                  </p>
                  <div className="courses-container">
                    {otherCmptCourses.map((course) => (
                      <div
                        className={courseChipClass(course.dept, course.number)}
                        key={courseKey(course.dept, course.number)}
                        onClick={() =>
                          handleCourseClick(course.dept, course.number)
                        }
                      >
                        {`${course.dept} ${course.number}`}
                      </div>
                    ))}
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
          {(loading || courseShown) && (
            <aside className="course-panel-column" aria-live="polite">
              {loading ? (
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
              ) : (
                courseShown && (
                  <SidebarCourse
                    course={courseShown}
                    closeCourseShown={closeCourse}
                  />
                )
              )}
            </aside>
          )}
        </section>
        <section className="data-section">
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
      </main>
    </div>
  );
};

export default Courses;
