import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.models";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;
  //  is semester is exists
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(404, "This Academic Semester Not Found");
  }
  // semester is already register
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(409, "This semester is already registered");
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
};
