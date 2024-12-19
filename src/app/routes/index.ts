import express from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { SemesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoute,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registration",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-course",
    route: OfferedCourseRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
