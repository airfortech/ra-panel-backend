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
  MUDLET_PASSWORD,
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
  lang: "pl",
  secret: {
    jwt: SECRET_JWT,
  },
  users: [
    { role: UserRole.consigliore, password: CONSIGLIORE_PASSWORD },
    { role: UserRole.caporegime, password: CAPOREGIME_PASSWORD },
    { role: UserRole.soldato, password: SOLDATO_PASSWORD },
    { role: UserRole.mudlet, password: MUDLET_PASSWORD },
  ],
  keyGiverDrops: {
    maxEditTime: 48,
    maxAddTime: 48,
  },
  tests: {
    enemies: 9,
    enemiesDefaultPercentage: 20,
    keyGiversDefaultPercentage: 20,
    locations: 20,
    locationsDefaultPercentage: 20,
    keyGiverDrops: 50,
    keyGiverDropsNoDropPercentage: 50,
    keyGiverDropsNoNextDatePercentage: 20,
  },
};
