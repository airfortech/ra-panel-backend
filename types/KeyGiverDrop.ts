import { Types } from "mongoose";
import { ShortKeyResponse } from "./Key";
import { ShortKeyGiverResponse, ShortestKeyGiverResponse } from "./KeyGiver";

export interface KeyGiverDrop {
  keyGiver: Types.ObjectId;
  drop: Types.ObjectId | null;
  dropDate: number;
  nextRespawnDate: number | null;
  createdAt: number;
  isActive: boolean;
}

export interface KeyGiverDropResponse
  extends Omit<KeyGiverDrop, "isActive" | "keyGiver" | "drop"> {
  id: string;
  keyGiver: ShortKeyGiverResponse;
  drop: ShortKeyResponse | null;
}

export interface KeyGiverDropShortResponse
  extends Omit<KeyGiverDrop, "isActive" | "keyGiver" | "drop" | "createdAt"> {
  id: string;
  drop: ShortKeyResponse | null;
}

export interface KeyDropShortResponse
  extends Omit<KeyGiverDropShortResponse, "drop"> {
  keyGiver: ShortestKeyGiverResponse;
}

export interface KeyGiverDropAddRequest
  extends Omit<
    KeyGiverDrop,
    "isActive" | "keyGiver" | "drop" | "nextRespawnDate" | "createdAt"
  > {
  keyGiver: string;
  drop: string | null;
}

export interface KeyGiverDropUpdateRequest
  extends Omit<
    KeyGiverDropAddRequest,
    "keyGiver" | "drop" | "dropDate" | "nextRespawnDate"
  > {
  keyGiver: string;
  drop?: string | null;
  dropDate?: number;
}

export interface KeyGiverDropsStats {
  keyGiversDone: number;
  drops: number;
  date: number;
}
