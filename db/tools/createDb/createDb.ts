import { connection } from "mongoose";
import { connectToDB } from "../../mongoose";
import { createEnemies } from "./createEnemies";
import { createKeys } from "./createKeys";
import { createUsers } from "./createUsers";

const createDb = async () => {
  try {
    await connectToDB();
    await createUsers();
    await createEnemies();
    await createKeys();
  } catch (e) {
    console.log(e.message);
  } finally {
    connection.close();
    console.log("Done. ✔");
  }
};

createDb();
