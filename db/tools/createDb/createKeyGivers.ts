import { KeyGiver } from "../../models/KeyGiver";
import { keyGivers } from "./data/keyGivers";

export const createKeyGivers = async (locations?: string[]) => {
  try {
    console.log("Creating keygivers...");
    await KeyGiver.deleteMany({});
    await KeyGiver.insertMany(keyGivers(locations));
    console.log("Keygivers created. ✔");
  } catch (e) {
    throw e;
  }
};
