import { Types } from "mongoose";
import { ShortKeyResponse } from "./Key";
import { ShortKeyGiverResponse, ShortestKeyGiverResponse } from "./KeyGiver";
import { ItemShortResponse } from "./Item";

export interface KeyGiverDrop {
  keyGiver: Types.ObjectId;
  drop: Types.ObjectId | null;
  magicDrops: Types.ObjectId[];
  dropDate: number;
  nextRespawnDate: number | null;
  createdAt: number;
  isActive: boolean;
}

export interface KeyGiverDropResponse
  extends Omit<KeyGiverDrop, "isActive" | "keyGiver" | "drop" | "magicDrops"> {
  id: string;
  keyGiver: ShortKeyGiverResponse;
  drop: ShortKeyResponse | null;
  magicDrops: ItemShortResponse[];
}

export interface KeyGiverDropShortResponse
  extends Omit<
    KeyGiverDrop,
    "isActive" | "keyGiver" | "drop" | "createdAt" | "magicDrops"
  > {
  id: string;
  drop: ShortKeyResponse | null;
  magicDrops: ItemShortResponse[];
}

export interface KeyDropShortResponse
  extends Omit<KeyGiverDropShortResponse, "drop" | "magicDrops"> {
  keyGiver: ShortestKeyGiverResponse;
}

export interface KeyGiverDropAddRequest
  extends Omit<
    KeyGiverDrop,
    | "isActive"
    | "keyGiver"
    | "drop"
    | "nextRespawnDate"
    | "createdAt"
    | "magicDrops"
  > {
  keyGiver: string;
  drop: string | null;
  magicDrops: string[];
}

export interface KeyGiverDropUpdateRequest
  extends Omit<
    KeyGiverDropAddRequest,
    "keyGiver" | "drop" | "dropDate" | "nextRespawnDate" | "magicDrops"
  > {
  keyGiver: string;
  drop?: string | null;
  dropDate?: number;
  magicDrops?: string[];
}

export interface KeyGiverDropsStats {
  keyGiversDone: number;
  drops: number;
  date: string;
}

export enum KeyGiverDropsStatsTimeOptions {
  currentWeek = "current_week",
  last5days = "last5days",
  last10days = "last10days",
  last30days = "last30days",
  currentMonth = "current_month",
  last2months = "last2months",
  last6months = "last6months",
  currentYear = "current_year",
  last12months = "last12months",
  alltime = "alltime",
}
