import { Request, Response, NextFunction } from "express";

import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.models";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //   check if the token send from client
    if (!token) {
      throw new AppError(401, "You are not authorized !");
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, userId, iat } = decoded;

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
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
