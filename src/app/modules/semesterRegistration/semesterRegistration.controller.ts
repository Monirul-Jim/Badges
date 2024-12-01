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
const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester Registration is retrieve Successfully",
      data: result,
    });
  }
);
const getSingleSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single Semester Registration is retrieve Successfully",
      data: result,
    });
  }
);
const updateSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single Semester Registration is retrieve Successfully",
      data: result,
    });
  }
);
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistrations,
  updateSemesterRegistrations,
};
