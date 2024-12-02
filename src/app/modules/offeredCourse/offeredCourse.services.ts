import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
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
  payload: Partial<TOfferedCourse>
) => {
  const result = "am";
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
