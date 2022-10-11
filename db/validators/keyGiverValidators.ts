import { messages, Status } from "../../types/responseMessages";
import { CustomError } from "../../utils/customError";

export const dateValidator = (date: string): string => {
  try {
    const validatedDate = new Date(date.toString()).toUTCString();
    return validatedDate;
  } catch (e) {
    throw e;
  }
};
