import { messages, Status } from "../types/responseMessages";
import { Request } from "../types/Request";
import { NextFunction, Response } from "express";
import mongoose from "mongoose";

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
  } else if (err instanceof mongoose.Error.ValidationError) {
    const firstErrorKey = Object.keys(err.errors)[0];
    res.status(400).json({
      status: Status.error,
      message: err.errors[firstErrorKey].message,
    });
  } else {
    res
      .status(500)
      .json({ status: Status.error, message: messages[req.lang].default });
  }
};
