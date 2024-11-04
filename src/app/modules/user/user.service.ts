import mongoose from "mongoose";
import config from "../../config/config";
import { AcademicSemester } from "../academicSemester/academicSemester.models";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.models";
import { TUser } from "./user.interface";
import { UserModel } from "./user.models";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given use default password
  //   if (!password) {
  //     user.password = config.default_password as string;
  //     }
  //   else {
  //       user.password = password;
  //     }
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  if (!admissionSemester) {
    throw new AppError(404, "Admission semester not found");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // manually generate id
    userData.id = await generateStudentId(admissionSemester);
    // create a user (here transaction-1)
    const NewUser = await UserModel.create([userData], { session });
    // create a student
    if (!NewUser.length) {
      throw new AppError(400, "Failed to create user");
    }
    // set id, _id as user
    payload.id = NewUser[0].id; //embed id
    payload.user = NewUser[0]._id; //ref id
    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};
export const UserService = {
  createStudentIntoDB,
};
