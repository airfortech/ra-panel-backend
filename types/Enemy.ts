import { Profession } from "./Profession";
import { Guild } from "./Guild";
import { Level } from "./Level";
import { Race } from "./Race";
import { Weapon } from "./Weapon";

export interface Enemy {
  name: string;
  short: string;
  race: Race;
  profession: Profession;
  guild: Guild;
  level: Level;
  weapon: Weapon;
  comment: string;
  addDates: number[];
  removeDates: number[];
  isActiveEnemy: boolean;
}

export interface EnemyResponse
  extends Omit<Enemy, "addDates" | "removeDates" | "isActiveEnemy"> {
  id: string;
}

export interface EnemyRequest
  extends Omit<
    EnemyResponse,
    | "id"
    | "name"
    | "short"
    | "race"
    | "profession"
    | "guild"
    | "level"
    | "weapon"
    | "comment"
  > {
  name?: string;
  short?: string;
  race?: Race;
  profession?: Profession;
  guild?: Guild;
  level?: Level;
  weapon?: Weapon;
  comment?: string;
}
