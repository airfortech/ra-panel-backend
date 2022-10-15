import { connection } from "mongoose";
import { connectToDB } from "../../mongoose";
import { createUsers } from "./createUsers";

const createUsersDb = async () => {
  try {
    await connectToDB();
    await createUsers();
  } catch (e) {
    console.log(e.message);
  } finally {
    connection.close();
  }
};

createUsersDb();
