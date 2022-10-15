import { connect } from "mongoose";
import { config } from "../config/config";

export const connectToDB = async () => {
  try {
    console.log("Connecting to database...");
    await connect(config.db.url, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("Connected to database. ✔");
  } catch (e) {
    throw e;
  }
};
