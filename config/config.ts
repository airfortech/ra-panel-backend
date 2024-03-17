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
    keyGiverDrops: 500,
    keyGiverDropsMonthsBack: 50,
    keyGiverDropsNoDropPercentage: 50,
    keyGiverDropsNoNextDatePercentage: 20,
    itemsCommentPercentage: 20,
    itemsDescriptionPercentage: 20,
    weightPercentage: 30,
    volumePercentage: 30,
    costPercentage: 30,
    vendorCostPercentage: 30,
    weapons: 80,
    magicWeaponsPercentage: 20,
    weaponHandSpecifiedPercentage: 30,
    weaponDamageTypeSpecifiedPercentage: 30,
    weaponStatsPercentage: 30,
    silverWeaponsPercentage: 20,
    armors: 40,
    magicArmorsPercentage: 30,
    armorClassSpecifiedPercentage: 40,
    armorStatsPercentage: 40,
    armorBodyPartSpecifiedPercentage: 50,
    shields: 40,
    magicShieldsPercentage: 30,
    shieldStatsPercentage: 40,
    shieldParrySpecifiedPercentage: 50,
    clothes: 40,
    magicClothesPercentage: 20,
  },
};
