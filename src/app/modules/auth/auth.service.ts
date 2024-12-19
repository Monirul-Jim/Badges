import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.models";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
const loginUserDB = async (payload: TLoginUser) => {
  // if the user is exists

  const isUserExists = await UserModel.findOne({ id: payload?.id });

  console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(404, "This user is not found!");
  }
  // check if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This user is already deleted");
  }
  // check if the user is blocked
  const userStatus = isUserExists?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This user is blocked");
  }
  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists.password
  );
  // access granted :send access token and refresh token

  return {};
};
export const AuthServices = {
  loginUserDB,
};
