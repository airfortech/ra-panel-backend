import { Key } from "../../models/Key";
import { keys } from "./data/keys";

export const createKeys = async () => {
  try {
    console.log("Creating keys...");
    await Key.deleteMany({});
    await Key.insertMany(keys);
    console.log("Keys created. ✔");
  } catch (e) {
    throw e;
  }
};
