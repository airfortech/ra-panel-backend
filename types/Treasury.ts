import { Domain } from "./Domain";

export interface Location {
  locationId: number;
  name: string;
  domain: Domain;
  description: string;
  comment: string;
  bind: string[];
  isActive: boolean;
}

export interface Treasury {
  name: string;
  keyToOpen: string | null;
  description: string;
  domain: Domain;
  playersToComplete: number;
  comment: string;
  entrance: Location[];
  importantPlaces: Location[];
  isActive: boolean;
}

export interface TreasuryResponse extends Omit<Treasury, "isActive"> {
  id: string;
}

export interface Key {
  name: string;
  treasury: string | null;
  description: string;
  domain: Domain;
  comment: string;
  isActive: boolean;
}

export interface KeyResponse extends Omit<Key, "isActive"> {
  id: string;
}

export interface KeyGiverDrop {
  // ref to KeyGiver or name
  keyGiver: string;
  // ref to Key or name
  drop: string | null;
  dropDate: number;
  nextRespawnDate: number;
  isActive: boolean;
}
