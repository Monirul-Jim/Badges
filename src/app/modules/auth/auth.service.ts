import config from "../../config/config";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.models";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
const loginUserDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomId(payload?.id);
  // if the user is exists

  if (!user) {
    throw new AppError(404, "This user is not found!");
  }
  // check if the user is already deleted
  // if (await UserModel.isUserDeleted(user?.id)) {
  //   throw new AppError(403, "This user is already deleted");
  // }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This user is already deleted");
  }
  // check if the user is blocked
  // if (await UserModel.isUserBlocked(user?.id)) {
  //   throw new AppError(403, "This user is blocked");
  // }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This user is blocked");
  }
  // checking if the password is correct
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(403, "Password does not match!");
  }

  // access granted :send access token and refresh token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expired_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expired_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await UserModel.isUserExistsByCustomId(userData.userId);
  // if the user is exists

  if (!user) {
    throw new AppError(404, "This user is not found!");
  }
  // check if the user is already deleted
  // if (await UserModel.isUserDeleted(user?.id)) {
  //   throw new AppError(403, "This user is already deleted");
  // }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This user is already deleted");
  }
  // check if the user is blocked
  // if (await UserModel.isUserBlocked(user?.id)) {
  //   throw new AppError(403, "This user is blocked");
  // }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This user is blocked");
  }
  // checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  ) {
    throw new AppError(403, "Password does not match!");
  }
  // hashed new password
  const newHashedPassword = await bcrypt.hash(
    payload?.oldPassword,
    Number(config.bcrypt_salt_round)
  );
  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};
const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  const { userId, iat } = decoded;

  const user = await UserModel.isUserExistsByCustomId(userId);
  // if the user is exists

  if (!user) {
    throw new AppError(404, "This user is not found!");
  }
  // check if the user is already deleted
  // if (await UserModel.isUserDeleted(user?.id)) {
  //   throw new AppError(403, "This user is already deleted");
  // }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This user is already deleted");
  }
  // check if the user is blocked
  // if (await UserModel.isUserBlocked(user?.id)) {
  //   throw new AppError(403, "This user is blocked");
  // }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This user is blocked");
  }
  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number
    )
  ) {
    throw new AppError(401, "You are not authorized!");
  }
  // access granted :send access token and refresh token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expired_in as string
  );
  return {
    accessToken,
  };
};
const forgetPassword = async (userId: string, token: string) => {
  const user = await UserModel.isUserExistsByCustomId(userId);
  // if the user is exists

  if (!user) {
    throw new AppError(404, "This user is not found!");
  }
  // check if the user is already deleted
  // if (await UserModel.isUserDeleted(user?.id)) {
  //   throw new AppError(403, "This user is already deleted");
  // }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This user is already deleted");
  }
  // check if the user is blocked
  // if (await UserModel.isUserBlocked(user?.id)) {
  //   throw new AppError(403, "This user is blocked");
  // }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This user is blocked");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );
  const resetUiLink = `http://localhost:3000?id=${user?.id}&token=${accessToken}`;
  console.log(resetUiLink);
};
export const AuthServices = {
  loginUserDB,
  changePassword,
  refreshToken,
  forgetPassword,
};
