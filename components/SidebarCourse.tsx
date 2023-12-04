import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Course, SectionsPerTerm } from "types/course";

interface SidebarCourseProps {
  course: Course;
  closeCourseShown: MouseEventHandler<HTMLSpanElement>;
}

interface SectionsPerTermProps {
  title: string;
  sectionsPerTerm: SectionsPerTerm;
}

const SectionsPerTermDisplay: React.FC<SectionsPerTermProps> = ({
  title,
  sectionsPerTerm,
}) => {
  return (
    <div className="course-info course-last-sections">
      <h2>
        {title} - {sectionsPerTerm.term}
      </h2>
      <div className="sections-container">
        {sectionsPerTerm.sections
          .filter((s) => s.info.type !== "n")
          .map((section) => {
            const instructorNames =
              section.info.instructorNames.length > 0
                ? section.info.instructorNames
                : ["Unknown"];
            return (
              <div className="section-unit" key={section.info.classNumber}>
                <p>
                  {section.info.section} - {instructorNames.join(", ")}
                </p>
                {section.info.campus !== "None" && <p>{section.info.campus}</p>}
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
  );
};

export const SidebarCourse: React.FC<SidebarCourseProps> = ({
  course,
  closeCourseShown,
}) => {
  return (
    <div className="sidebar-course">
      <div className="course-info">
        <p className="space-between">
          <b>
            {course.info.dept} {course.info.number} ({course.info.units})
          </b>
          <span className="close-sidebar" onClick={closeCourseShown}>
            Close
          </span>
        </p>
        <h2>{course.info.title}</h2>
        <p>{course.info.description}</p>
        {course.info.notes && <p>{course.info.notes}</p>}
        <p>Prerequisites: {course.info.prerequisites}</p>
      </div>
      <SectionsPerTermDisplay
        title="Last available"
        sectionsPerTerm={course.last_sections}
      />
      {course.future_sections.sections.length > 0 ? (
        <SectionsPerTermDisplay
          title="Next available"
          sectionsPerTerm={course.future_sections}
        />
      ) : (
        <h2>Currently not offered for {course.future_sections.term}</h2>
      )}
    </div>
  );
};
