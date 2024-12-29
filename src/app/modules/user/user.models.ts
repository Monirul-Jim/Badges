import { model, Schema } from "mongoose";
import { TUser, UserModelStatic } from "./user.interface";
import config from "../../config/config";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser, UserModelStatic>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// pre save middleware/hook
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// userSchema.statics.isUserDeleted = async function (id: string) {
//   const user = await UserModel.findOne({ id });
//   return user ? user.isDeleted : false;
// };
// userSchema.statics.isUserBlocked = async function (id: string) {
//   const user = await UserModel.findOne({ id });
//   return user ? user.status === "blocked" : false;
// };
export const UserModel = model<TUser, UserModelStatic>("User", userSchema);
