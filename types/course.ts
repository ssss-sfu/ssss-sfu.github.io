import { z, ZodType } from "zod";

// Define Zod schemas for each data class

const CourseScheduleSchema = z.object({
  days: z.string(),
  sectionCode: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

type CourseSchedule = z.infer<typeof CourseScheduleSchema>;

const SectionInfoSchema = z.object({
  section: z.string(),
  classNumber: z.string(),
  type: z.string(),
  campus: z.string(),
  instructorNames: z.array(z.string()),
});

export type SectionInfo = z.infer<typeof SectionInfoSchema>;

const CourseInfoSchema = z.object({
  dept: z.string(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  prerequisites: z.string(),
  corequisites: z.string(),
  notes: z.string(),
  deliveryMethod: z.string(),
  units: z.string(),
});

export type CourseInfo = z.infer<typeof CourseInfoSchema>;

const SectionSchema = z.object({
  info: SectionInfoSchema,
  courseSchedule: z.array(CourseScheduleSchema),
});

type Section = z.infer<typeof SectionSchema>;

const SectionsPerTermSchema = z.object({
  term: z.string(),
  sections: z.array(SectionSchema),
});

export type SectionsPerTerm = z.infer<typeof SectionsPerTermSchema>;

export const CourseSchema = z.object({
  info: CourseInfoSchema,
  future_sections: SectionsPerTermSchema,
  last_sections: SectionsPerTermSchema,
});

export type Course = z.infer<typeof CourseSchema>;

export const RequirementSchema = z.object({
  requirement: z.string(),
  courses: z.array(CourseSchema),
});

export type Requirement = z.infer<typeof RequirementSchema>;
