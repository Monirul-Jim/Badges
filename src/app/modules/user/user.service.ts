import config from "../../config/config";
import { AcademicSemester } from "../academicSemester/academicSemester.models";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.models";
import { TUser } from "./user.interface";
import { UserModel } from "./user.models";
import { generateStudentId } from "./user.utils";

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
  // manually generate id
  userData.id = generateStudentId(admissionSemester);
  // create a user
  const NewUser = await UserModel.create(userData);
  // create a student
  if (Object.keys(NewUser).length) {
    // set id, _id as user
    payload.id = NewUser.id; //embed id
    payload.user = NewUser._id; //ref id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserService = {
  createStudentIntoDB,
};
