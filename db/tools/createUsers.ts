import mongoose from "mongoose";
import { config } from "../../config/config";
import { UserRole } from "../../types/UserRole";
import { User } from "../models/User";
import { connectToDB } from "../mongoose";

const createUsers = async () => {
  try {
    console.log("Connecting to database...");
    await connectToDB();
    console.log("Creating users...");
    for (let { role, password } of config.users) {
      const user = await User.findOne({ role });
      if (!user) await new User({ role, password }).save();
      else {
        user.password = password;
        await user.save();
      }
    }
  } catch (e) {
    console.log(e.message);
  } finally {
    mongoose.connection.close();
    console.log("Users created.");
  }
};

createUsers();
