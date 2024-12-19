import express from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
export const UserRoutes = router;
