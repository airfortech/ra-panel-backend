import mongoose from "mongoose";
import { config } from "../config/config";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.db.url, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("Connected to db.");
  } catch (e) {
    console.log(e.message);
  }
};
