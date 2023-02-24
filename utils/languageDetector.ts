import { Language } from "../types/Language";
import { Request } from "../types/Request";
import { Response, NextFunction } from "express";
import { config } from "../config/config";

export const languageDetector = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const language = req.headers["content-language"] as Language;
    req.lang = language || config.lang;
    next();
  };
};
