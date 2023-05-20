import dayjs from "dayjs";
import { Status, messages } from "../../types/responseMessages";
import { CustomError } from "../../utils/customError";
import { config } from "../../config/config";

export const dateValidate = (date: number): boolean => {
  try {
    if (dayjs(date).isValid()) return true;
    throw new CustomError(
      messages[config.lang].date.invalidDate,
      400,
      Status.error
    );
  } catch (e) {
    throw e;
  }
};
