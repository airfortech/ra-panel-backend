import { Config } from "../types/config";
import { UserRole } from "../types/UserRole";

export const config: Config = {
  app: {
    host: "localhost",
    port: 3001,
  },
  frontend: {
    host: "http://localhost:3000",
  },
  db: {
    url: "mongodb://localhost:27017/ra-panel-db",
  },
  users: [
    { role: UserRole.consigliore, password: "test1234" },
    { role: UserRole.caporegime, password: "test1234" },
    { role: UserRole.soldato, password: "test1234" },
  ],
};
