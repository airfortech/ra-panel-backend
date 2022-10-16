import { connection } from "mongoose";
import { connectToDB } from "../../mongoose";
import { createEnemies } from "./createEnemies";
import { createKeyGivers } from "./createKeyGivers";
import { createKeys } from "./createKeys";
import { createUsers } from "./createUsers";

const createDb = async () => {
  try {
    await connectToDB();
    await createUsers();
    await createEnemies();
    await createKeys();
    await createKeyGivers();
  } catch (e) {
    console.log(e.message);
  } finally {
    connection.close();
    console.log("Done. ✔");
  }
};

createDb();
