import { expect, test } from "bun:test";
import { courseKey, groupCourses } from "./courses";

const cmpt = (number: string) => ({ dept: "cmpt", number });

test("groupCourses sorts courses into the right sections", () => {
  const upperRequired = new Set([courseKey("CMPT", "307")]);
  const allRequired = new Set([
    courseKey("CMPT", "307"),
    courseKey("CMPT", "225"),
  ]);

  const { depthElectives, otherCmpt } = groupCourses(
    [
      cmpt("305"),
      cmpt("105w"),
      cmpt("726"), // graduate course: belongs in neither list
      cmpt("307"), // required: not an elective
      cmpt("225"), // required: not "other"
      cmpt("305"), // duplicate
    ],
    [{ dept: "macm", number: "316" }],
    upperRequired,
    allRequired
  );

  expect(depthElectives.map((c) => `${c.dept} ${c.number}`)).toEqual([
    "CMPT 305",
    "MACM 316",
  ]);
  expect(otherCmpt.map((c) => `${c.dept} ${c.number}`)).toEqual(["CMPT 105W"]);
});
