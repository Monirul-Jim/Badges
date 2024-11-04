import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();
// router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllStudents);
router.patch(
  "/:studentId",

  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.delete("/:studentId", StudentControllers.deleteSingleStudent);
export const StudentRoutes = router;
