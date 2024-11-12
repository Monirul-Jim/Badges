import { TErrorSource, TGenericErrorResponse } from "../../interfaces/error";

const handleDuplicateErrors = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${extractMessage} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleDuplicateErrors;
