import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();
// router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllStudents);
router.patch(
  "/:id",

  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.get("/:id", StudentControllers.getSingleStudent);
router.delete("/:id", StudentControllers.deleteSingleStudent);
export const StudentRoutes = router;
