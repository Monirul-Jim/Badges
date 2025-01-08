import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { changeStatusValidationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(changeStatusValidationSchema),
  UserControllers.changeStatus
);
router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserControllers.getMe
);
export const UserRoutes = router;
