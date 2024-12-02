import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.models";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;
  // check if there any registered semester that is already UPCOMING | ONGOING
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already ${isThereAnyUpcomingOrOngoingSemester.status} register semester`
    );
  }
  //  is semester is exists
  const isAcademicSemesterExists = await AcademicSemester.findOne({
    academicSemester,
  });
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
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  // check if the request register semester is exists
  //  is semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "This Semester Registration Not Found");
  }
  // if the request semester registration is ended we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `This Semester is already ${currentSemesterStatus} registered`
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      404,
      `You cannot directly change status ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      404,
      `You cannot directly change status ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
