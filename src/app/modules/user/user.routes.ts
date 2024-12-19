import express from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
export const UserRoutes = router;
