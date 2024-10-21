import { z } from "zod";
const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum,
  }),
});
export const AcademicSemesterValidations = {
  createAcademicSemesterValidation,
};
