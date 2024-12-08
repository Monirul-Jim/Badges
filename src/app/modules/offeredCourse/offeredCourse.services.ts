import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistrationStatus } from "../semesterRegistration/semesterRegistration.constant";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  const isSemesterRegistrationIsExists = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationIsExists) {
    throw new AppError(404, "Semester registration not found");
  }
  const academicSemester = isSemesterRegistrationIsExists.academicSemester;
  const isAcademicFacultyIsExists = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyIsExists) {
    throw new AppError(404, "Academic Faculty not found");
  }
  const isDepartmentIsExists = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isDepartmentIsExists) {
    throw new AppError(404, "Academic department not found");
  }
  const isCourseIsExists = await Course.findById(course);
  if (!isCourseIsExists) {
    throw new AppError(404, "Course not found");
  }
  const isFacultyIsExists = await Faculty.findById(faculty);
  if (!isFacultyIsExists) {
    throw new AppError(404, "Faculty not found");
  }
  // check if the department is belong to the faculty
  const isTheDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isTheDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isDepartmentIsExists.name} not belong to this ${isAcademicFacultyIsExists.name}`
    );
  }
  // check if the same course same section in the same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      400,
      "Offered course with same section is already exists"
    );
  }

  // get the schedule of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");
  const newSchedules = { days, startTime, endTime };
  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      409,
      "This faculty is not available at that time ! Choose other time or day"
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const result = "am";
  return result;
};
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = "am";
  return result;
};
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered course not found !");
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(404, " Faculty not found !");
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      400,
      `You cant update this offered course as when it is ${semesterRegistrationStatus?.status}`
    );
  }
  // get the schedule of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");
  const newSchedules = { days, startTime, endTime };
  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      409,
      "This faculty is not available at that time ! Choose other time or day"
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
