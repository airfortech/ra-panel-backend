import { connection } from "mongoose";
import { connectToDB } from "../../mongoose";
import { createEnemies } from "./createEnemies";
import { createKeyGivers } from "./createKeyGivers";
import { createKeys } from "./createKeys";
import { createUsers } from "./createUsers";
import { createLocations } from "./createLocations";
import { createKeyGiverDrops } from "./createKeyGiverDrops";
import { createSettings } from "./createSettings";
import { createItems } from "./createItems";

const createDb = async () => {
  try {
    await connectToDB();
    await createUsers();
    await createSettings();
    await createEnemies();
    const keys = await createKeys();
    const locations = await createLocations();
    const keyGivers = await createKeyGivers(locations);
    await createKeyGiverDrops(keys, keyGivers);
    await createItems();
    console.log("Done. ✔");
  } catch (e) {
    console.log(e.message);
    console.log("Something went wrong!");
  } finally {
    connection.close();
  }
};

createDb();
