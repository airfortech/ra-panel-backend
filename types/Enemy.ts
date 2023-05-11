import { Class } from "./Class";
import { Guild } from "./Guild";
import { Level } from "./Level";
import { Race } from "./Race";
import { Weapon } from "./Weapon";

export interface Enemy {
  name: string;
  short: string;
  race: Race;
  class: Class;
  guild: Guild;
  level: Level;
  weapon: Weapon;
  comment: string;
  addDates: number[];
  removeDates: number[];
  isActiveEnemy: boolean;
}
