export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "active" | "blocked";
  isDeleted: boolean;
};
