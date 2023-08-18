import { Domain } from "./Domain";
import { ShortLocationResponse } from "./Location";
import { Types } from "mongoose";

export interface KeyGiver {
  name: string;
  short: string;
  description: string;
  respawnTime: number | null;
  domain: Domain;
  playersToComplete: number | null;
  comment: string;
  locations: Types.ObjectId[];
  isActive: boolean;
}

export interface KeyGiverResponse
  extends Omit<KeyGiver, "isActive" | "locations"> {
  id: string;
  locations: ShortLocationResponse[];
}

export interface ShortKeyGiverResponse
  extends Omit<
    KeyGiverResponse,
    "isActive" | "description" | "playersToComplete" | "comment"
  > {
  id: string;
}

export interface ShortestKeyGiverResponse
  extends Omit<ShortKeyGiverResponse, "locations" | "respawnTime"> {}

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
  locations?: string[];
}

export interface KeyGiverUpdateRequest
  extends Omit<KeyGiverAddRequest, "name" | "short"> {
  name?: string;
  short?: string;
}
