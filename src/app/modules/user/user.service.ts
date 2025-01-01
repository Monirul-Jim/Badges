import mongoose from "mongoose";
import config from "../../config/config";
import { AcademicSemester } from "../academicSemester/academicSemester.models";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.models";
import { TUser } from "./user.interface";
import { UserModel } from "./user.models";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

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
  userData.email = payload.email;

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
