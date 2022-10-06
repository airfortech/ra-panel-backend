import { NextFunction, Request, Response } from "express";

const messages = {
  default: "Try again later.",
};

enum Status {
  error = "error",
}

export class CustomError extends Error {
  statusCode: number;
  status: string;

  constructor(
    message: string,
    statusCode: number,
    status: string = Status.error
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
  }
}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: Status.error, message: messages.default });
  }
};
