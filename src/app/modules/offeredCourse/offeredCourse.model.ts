import mongoose, { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constant";
// import { Days } from "./offeredCourse.constant";
const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "AcademicDepartment",
    },
    course: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      require: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const OfferedCourse = model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
