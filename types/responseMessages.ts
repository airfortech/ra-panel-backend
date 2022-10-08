export enum Status {
  success = "success",
  error = "error",
}

export const messages = {
  default: "Try again later.",
  auth: {
    wrongRole: "Role doesn't exist.",
    wrongPassword: "Wrong password.",
    unauthorized: "You have no permission.",
  },
};
