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
    logout: "You have logged out.",
  },
  users: {
    noRolesInDb: "No roles found in database. Contact with admin.",
    passwordChanged: "Password has been changed.",
    passwordMinLengthError: "Password must be at least 5 characters long.",
    passwordRequiredError: "Password is required.",
  },
};
