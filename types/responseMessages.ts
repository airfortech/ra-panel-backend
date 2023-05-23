import { messagesEn } from "./translations/responseMessagesEn";
import { messagesPl } from "./translations/responseMessagesPl";

export enum Status {
  success = "success",
  error = "error",
}

export const messages = {
  en: messagesEn,
  // INFO: change it later to messagesPL back
  pl: messagesEn,
};
