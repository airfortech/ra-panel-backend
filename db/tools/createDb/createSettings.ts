import { Settings } from "../../models/Settings";

export const createSettings = async () => {
  try {
    console.log("Creating settings...");
    await Settings.deleteMany({});
    await Settings.create({});
    console.log("Settings created. ✔");
  } catch (e) {
    throw e;
  }
};
