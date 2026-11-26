export type CourseRef = {
  dept: string;
  number: string;
  note?: string;
};

export function courseKey(dept: string, number: string) {
  return `${dept.toUpperCase()}-${number.toUpperCase()}`;
}

function sortCourses(a: CourseRef, b: CourseRef): number {
  const deptCompare = a.dept.localeCompare(b.dept);
  if (deptCompare !== 0) return deptCompare;
  return a.number.localeCompare(b.number, undefined, { numeric: true });
}

function uniqueByKey(courses: CourseRef[]) {
  const seen = new Set<string>();
  return courses.filter((c) => {
    const key = courseKey(c.dept, c.number);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Splits the API's CMPT and MACM course lists into the two page sections:
 * 300/400-level depth electives, and lower-level (under 300) CMPT courses.
 * Graduate courses (500+) belong in neither.
 */
export function groupCourses(
  cmpt: CourseRef[],
  macm: CourseRef[],
  upperRequired: Set<string>,
  allRequired: Set<string>
) {
  const toRef = (c: CourseRef): CourseRef => ({
    dept: c.dept.toUpperCase(),
    number: c.number.toUpperCase(),
  });
  // parseInt reads the leading digits: "105W" -> 105
  const level = (c: CourseRef) => parseInt(c.number, 10);

  const depthElectives = uniqueByKey(
    [...cmpt, ...macm]
      .map(toRef)
      .filter(
        (c) =>
          (c.dept === "CMPT" || c.dept === "MACM") &&
          level(c) >= 300 &&
          level(c) < 500 &&
          !upperRequired.has(courseKey(c.dept, c.number))
      )
  ).sort(sortCourses);

  const otherCmpt = uniqueByKey(
    cmpt
      .map(toRef)
      .filter(
        (c) => level(c) < 300 && !allRequired.has(courseKey(c.dept, c.number))
      )
  ).sort(sortCourses);

  return { depthElectives, otherCmpt };
}
