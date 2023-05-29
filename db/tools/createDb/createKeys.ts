import { Key } from "../../models/Key";
import { keys } from "./data/keys";

export const createKeys = async () => {
  try {
    console.log("Creating keys...");
    await Key.deleteMany({});
    const newKeys = await Key.insertMany(keys);
    console.log("Keys created. ✔");
    return newKeys.map(({ id }) => id as string);
  } catch (e) {
    throw e;
  }
};
