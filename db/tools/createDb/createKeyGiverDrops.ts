import { KeyGiverDrop } from "../../models/KeyGiverDrop";
import { keyGiverDrops } from "./data/keyGiverDrops";

export const createKeyGiverDrops = async (
  keys?: string[],
  keyGivers?: string[],
  magicItems?: string[]
) => {
  try {
    console.log("Creating keygiverDrops...");
    await KeyGiverDrop.deleteMany({});
    await KeyGiverDrop.insertMany(keyGiverDrops(keys, keyGivers, magicItems));
    console.log("KeygiverDrops created. ✔");
  } catch (e) {
    throw e;
  }
};
