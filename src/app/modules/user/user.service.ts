import config from "../../config/config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.models";
import { TUser } from "./user.interface";
import { UserModel } from "./user.models";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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
  // manually generate id
  userData.id = "2030100001";
  // create a user
  const NewUser = await UserModel.create(userData);
  // create a student
  if (Object.keys(NewUser).length) {
    // set id, _id as user
    studentData.id = NewUser.id;//embed id
      studentData.user = NewUser._id;//ref id
      const newStudent = await Student.create(studentData)
      return newStudent;
  }
};
export const UserService = {
  createStudentIntoDB,
};
