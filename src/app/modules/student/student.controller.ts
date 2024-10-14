import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
// import studentValidationSchema from "./student.validation";
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     const zodParsedData = studentValidationSchema.parse(studentData);
//     // call service function
//     const result = await StudentServices.createStudentIntoDB(zodParsedData);
//     res.status(200).json({
//       success: true,
//       message: "student created successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "something went wrong",
//       error: err,
//     });
//   }
// };
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: "student retrieve successfully",
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "student retrieve successfully",
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "something went wrong",
    //   error: err,
    // });
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "single student get successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "student deleted successfully",
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "something went wrong",
    //   error: err,
    // });
    next(err);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
