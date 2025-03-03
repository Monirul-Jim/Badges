import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
const router = express.Router();
router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);
router.get(
  "/:id",

  SemesterRegistrationControllers.getSingleSemesterRegistrations
);
router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistrations
);
router.get("/", SemesterRegistrationControllers.getAllSemesterRegistrations);
export const SemesterRegistrationRoutes = router;
