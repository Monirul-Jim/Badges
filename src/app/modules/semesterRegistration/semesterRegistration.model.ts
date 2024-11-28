import mongoose, { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredits: {
      type: Number,
      default: 3,
    },
    maxCredits: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
