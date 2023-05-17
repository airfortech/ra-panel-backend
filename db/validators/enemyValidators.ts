import { messages, Status } from "../../types/responseMessages";
import { CustomError } from "../../utils/customError";
import { config } from "../../config/config";

export const enemyNameValidator = (name: string): string => {
  try {
    const validatedName = name.trim();
    if (!validatedName)
      throw new CustomError(
        messages[config.lang].enemies.nameIsRequired,
        400,
        Status.error
      );
    const isLettersOnly = /^[a-zA-Z]+$/.test(validatedName);
    const isOneWord = /^\S+$/.test(validatedName);
    if (isLettersOnly && isOneWord)
      return (
        validatedName[0].toUpperCase() + validatedName.slice(1).toLowerCase()
      );
    throw new CustomError(
      messages[config.lang].enemies.wrongNameProvided,
      400,
      Status.error
    );
  } catch (e) {
    throw e;
  }
};
