import * as dotenv from "dotenv";
import { Config } from "../types/config";
import { UserRole } from "../types/UserRole";

dotenv.config({ path: "./config/.env" });
const {
  APP_HOST,
  APP_PORT,
  FRONTEND_HOST,
  DB_URL,
  SECRET_JWT,
  CONSIGLIORE_PASSWORD,
  CAPOREGIME_PASSWORD,
  SOLDATO_PASSWORD,
} = process.env;

export const config: Config = {
  app: {
    host: APP_HOST,
    port: Number(APP_PORT),
  },
  frontend: {
    host: FRONTEND_HOST,
  },
  db: {
    url: DB_URL,
  },
  lang: "en",
  secret: {
    jwt: SECRET_JWT,
  },
  users: [
    { role: UserRole.consigliore, password: CONSIGLIORE_PASSWORD },
    { role: UserRole.caporegime, password: CAPOREGIME_PASSWORD },
    { role: UserRole.soldato, password: SOLDATO_PASSWORD },
  ],
  tests: {
    enemies: 4,
    enemiesDefaultPercentage: 20,
  },
};
