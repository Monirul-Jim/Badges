import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
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

const getAllStudents = catchAsync(async (req, res) => {
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
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single student get successfully",
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "student deleted successfully",
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
