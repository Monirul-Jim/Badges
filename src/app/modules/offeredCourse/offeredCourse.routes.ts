import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";
const router = express.Router();
router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);
router.get("/", OfferedCourseControllers.getAllOfferedCourse);
router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);
router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);
export const OfferedCourseRoutes = router;
