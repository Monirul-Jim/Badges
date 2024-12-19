import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
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
  // isUserDeleted(id: string): Promise<boolean>;
  // isUserBlocked(id: string): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
