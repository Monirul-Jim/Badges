import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
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
});
export const UserControllers = {
  createStudent,
};
