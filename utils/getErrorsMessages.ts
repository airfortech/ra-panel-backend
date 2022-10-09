import { MongooseError } from "mongoose";

export const getErrorsMessages = (errors: MongooseError[]) => {
  const messages: string[] = [];
  for (const key in errors) {
    messages.push(errors[key].message);
  }
  return messages;
};
