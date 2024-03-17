import { Language } from "./Language";
import { User } from "./User";

export interface Config {
  app: {
    host: string;
    port: number;
  };
  frontend: {
    host: string;
  };
  db: {
    url: string;
  };
  secret?: {
    jwt?: string;
  };
  users?: User[];
  lang: Language;
  keyGiverDrops: {
    maxEditTime: number;
    maxAddTime: number;
  };
  tests: {
    enemies: number;
    enemiesDefaultPercentage: number;
    keyGiversDefaultPercentage: number;
    locations: number;
    locationsDefaultPercentage: number;
    keyGiverDrops: number;
    keyGiverDropsMonthsBack: number;
    keyGiverDropsNoDropPercentage: number;
    keyGiverDropsNoNextDatePercentage: number;
    weapons: number;
    magicWeaponsPercentage: number;
    weaponHandSpecifiedPercentage: number;
    weaponDamageTypeSpecifiedPercentage: number;
    weaponStatsPercentage: number;
    silverWeaponsPercentage: number;
    weightPercentage: number;
    volumePercentage: number;
    costPercentage: number;
    vendorCostPercentage: number;
    itemsDescriptionPercentage: number;
    itemsCommentPercentage: number;
  };
}
