import { User } from "../../models/User";
import { config } from "../../../config/config";

export const createUsers = async () => {
  try {
    console.log("Creating users...");
    for (let { role, password } of config.users) {
      const user = await User.findOne({ role });
      if (!user) await new User({ role, password }).save();
      else {
        user.password = password;
        await user.save();
      }
    }
    console.log("Users created. ✔");
  } catch (e) {
    throw e;
  }
};
