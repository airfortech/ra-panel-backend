import { connection } from "mongoose";
import { connectToDB } from "../../mongoose";
import { createEnemies } from "./createEnemies";
import { createKeyGivers } from "./createKeyGivers";
import { createKeys } from "./createKeys";
import { createUsers } from "./createUsers";
import { createLocations } from "./createLocations";

const createDb = async () => {
  try {
    await connectToDB();
    await createUsers();
    await createEnemies();
    await createKeys();
    const locations = await createLocations();
    await createKeyGivers(locations);
    console.log("Done. ✔");
  } catch (e) {
    console.log(e.message);
    console.log("Something went wrong!");
  } finally {
    connection.close();
  }
};

createDb();
