// export interface KeyGiver {
//   name: string;
//   description?: string;
//   respawnTime: number;
//   respawns: {
//     date: number;
//     keyName: string;
//   }[];
//   lastRespawn?: number;
//   nextRespawn?: number;
//   isActive: boolean;
// }

import { Domain } from "./Domain";

export interface KeyGiver {
  name: string;
  short: string;
  description: string;
  respawnTime: number;
  domain: Domain;
  playersToComplete: number | null;
  comment: string;
  locations: Location[];
  isActive: boolean;
}

export interface KeyGiverResponse extends Omit<KeyGiver, "isActive"> {
  id: string;
}

export interface KeyGiverAddRequest
  extends Omit<
    KeyGiver,
    | "description"
    | "respawnTime"
    | "domain"
    | "playersToComplete"
    | "comment"
    | "locations"
    | "isActive"
  > {
  description?: string;
  respawnTime?: number;
  domain?: Domain;
  playersToComplete?: number | null;
  comment?: string;
  locations?: Location[];
}

export interface KeyGiverUpdateRequest
  extends Omit<KeyGiverAddRequest, "name" | "short"> {
  name?: string;
  short?: string;
}
