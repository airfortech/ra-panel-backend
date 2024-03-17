import { Item } from "../../models/Item";
import { armors } from "./data/items/armors";
import { shields } from "./data/items/shields";
import { weapons } from "./data/items/weapons";

export const createItems = async () => {
  try {
    console.log("Creating items...");
    await Item.deleteMany({});
    console.log("Creating weapons...");
    await Item.insertMany(weapons);
    console.log("Weapons created. ✔");
    console.log("Creating armors...");
    await Item.insertMany(armors);
    console.log("Armors created. ✔");
    console.log("Creating shields...");
    await Item.insertMany(shields);
    console.log("Shields created. ✔");
    console.log("Items created. ✔");
  } catch (e) {
    throw e;
  }
};
