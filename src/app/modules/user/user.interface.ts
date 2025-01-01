import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "active" | "blocked";
  isDeleted: boolean;
}
export interface UserModelStatic extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
  // isUserDeleted(id: string): Promise<boolean>;
  // isUserBlocked(id: string): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
