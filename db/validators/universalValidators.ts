import { Status } from "../../types/responseMessages";
import mongoose from "mongoose";
import { CustomError } from "../../utils/customError";

export const isIdValid = (
  id: string,
  errorMessage: string,
  statusCode: number
): void => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error();
  } catch (e) {
    throw new CustomError(errorMessage, statusCode, Status.error);
  }
};
