import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudent = catchAsync(async (req, res) => {
  // const { password, student: studentData } = req.body;
  console.log(req.file);
  console.log(req.body);

  // const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user created successfully",
    data: "result",
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status change successfully",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserService.getMe(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  changeStatus,
  getMe,
};
