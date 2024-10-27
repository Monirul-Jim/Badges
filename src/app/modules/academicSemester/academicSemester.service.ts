import { TAcademicSemesterCode } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.models";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemesterCode) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
