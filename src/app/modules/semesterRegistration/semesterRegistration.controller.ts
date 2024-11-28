import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Create Semester Registration Successfully",
      data: result,
    });
  }
);
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
};
