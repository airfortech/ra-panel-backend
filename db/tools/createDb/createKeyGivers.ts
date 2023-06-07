import { KeyGiver } from "../../models/KeyGiver";
import { keyGivers } from "./data/keyGivers";

export const createKeyGivers = async (locations?: string[]) => {
  try {
    console.log("Creating keygivers...");
    await KeyGiver.deleteMany({});
    const newKeyGivers = await KeyGiver.insertMany(keyGivers(locations));
    console.log("Keygivers created. ✔");
    return newKeyGivers.map(({ id }) => id as string);
  } catch (e) {
    throw e;
  }
};
