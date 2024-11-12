import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../../interfaces/error";

const handleCastErrors = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID Error",
    errorSources,
  };
};

export default handleCastErrors;
