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
    if (validatedName.split(" ").length > 1) {
      return validatedName
        .split(" ")
        .filter(word => word.trim() !== "")
        .map(word => word.toLowerCase())
        .join(" ");
    } else
      return (
        validatedName[0].toUpperCase() + validatedName.slice(1).toLowerCase()
      );
  } catch (e) {
    throw e;
  }
};
