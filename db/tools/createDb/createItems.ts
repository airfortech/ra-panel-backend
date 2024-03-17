import { Item } from "../../models/Item";
import { armors } from "./data/items/armors";
import { clothes } from "./data/items/clothes";
import { jewellery } from "./data/items/jewellery";
import { shields } from "./data/items/shields";
import { stones } from "./data/items/stones";
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
    console.log("Creating clothes...");
    await Item.insertMany(clothes);
    console.log("Clothes created. ✔");
    console.log("Creating jewellery...");
    await Item.insertMany(jewellery);
    console.log("Jewellery created. ✔");
    console.log("Creating stones...");
    await Item.insertMany(stones);
    console.log("Stones created. ✔");
    console.log("Items created. ✔");
  } catch (e) {
    throw e;
  }
};
