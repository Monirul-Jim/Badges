import { TUser } from "./user.interface";
import { UserModel } from "./user.models";

const createStudentIntoDB = async (studentData: TUser) => {
  // custom static method
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error("User already exists static");
  //   }
  const result = await UserModel.create(studentData);

  return result;
};
export const UserService = {
  createStudentIntoDB,
};
