import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
const router = express.Router();
router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get("/:id", CourseControllers.getSingleCourse);
router.get("/", CourseControllers.getAllCourses);
router.patch(
  "/:id",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.updateCourse
);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultyWithCourseValidationsSchema),
  CourseControllers.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultyWithCourseValidationsSchema),
  CourseControllers.removeFacultiesFromCourse
);
router.delete("/:id", CourseControllers.deleteCourse);

export const CourseRoutes = router;
