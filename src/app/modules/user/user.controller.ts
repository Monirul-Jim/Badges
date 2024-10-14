import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);
    // call service function
    const result = await UserService.createStudentIntoDB(password, studentData);
    // res.status(200).json({
    //   success: true,
    //   message: "user created successfully",
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const UserControllers = {
  createStudent,
};
