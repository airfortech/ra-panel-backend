import { Item } from "../../models/Item";
import { weapons } from "./data/items/weapons";

export const createItems = async () => {
  try {
    console.log("Creating items...");
    await Item.deleteMany({});
    console.log("Creating weapons...");
    await Item.insertMany(weapons);
    console.log("Weapons created. ✔");
    console.log("Items created. ✔");
  } catch (e) {
    throw e;
  }
};
