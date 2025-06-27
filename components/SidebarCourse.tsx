import { SFUCourseResponse } from "pages/courses";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Course, SectionsPerTerm } from "types/course";

interface SidebarCourseProps {
  course: SFUCourseResponse;
  closeCourseShown: MouseEventHandler<HTMLSpanElement>;
}

interface OfferingPerTerm {
  offering: {
    instructors: string[];
    term: string;
  };
}

export const SidebarCourse: React.FC<SidebarCourseProps> = ({
  course,
  closeCourseShown,
}) => {
  return (
    <div
      className="sidebar-course"
      key={course.dept + course.number + course.title}
    >
      <div className="course-info">
        <p className="space-between">
          <a
            href={`https://sfucourses.com/explore/${course.dept.toLowerCase()}-${
              course.number
            }`}
            target="_blank"
            rel="noreferrer"
          >
            {course.dept} {course.number} ({course.units})
          </a>
          <span className="close-sidebar" onClick={closeCourseShown}>
            Close
          </span>
        </p>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        {course.notes && <p>{course.notes}</p>}
        <p>
          Prerequisites:{" "}
          {course.prerequisites !== "" ? course.prerequisites : "None"}
        </p>
      </div>
      <h2>Offerings</h2>
      <div className="offerings-container">
        <ul>
          {course.offerings &&
            course.offerings.map((offering) => {
              const [semester, year] = offering.term.split(" ");
              const semesterLower = semester.toLowerCase();
              const calendarUrl = `https://www.sfu.ca/students/calendar/${year}/${semesterLower}/courses/${course.dept.toLowerCase()}/${course.number.toLowerCase()}.html`;
              return (
                <li className="offering" key={offering.term}>
                  <a href={calendarUrl} target="_blank" rel="noreferrer">
                    {offering.term}
                  </a>
                  &nbsp;-&nbsp;{offering.instructors.join(", ") || "N/A"}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
