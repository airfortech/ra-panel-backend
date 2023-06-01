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
  };
  tests: {
    enemies: number;
    enemiesDefaultPercentage: number;
    keyGiversDefaultPercentage: number;
    locations: number;
    locationsDefaultPercentage: number;
    keyGiverDrops: number;
    keyGiverDropsNoDropPercentage: number;
    keyGiverDropsNoNextDatePercentage: number;
  };
}
