import { Types } from "mongoose";
import { ShortKeyResponse } from "./Key";
import { ShortKeyGiverResponse } from "./KeyGiver";

export interface KeyGiverDrop {
  keyGiver: Types.ObjectId;
  drop: Types.ObjectId | null;
  dropDate: number;
  nextRespawnDate: number;
  createdAt: number;
  isActive: boolean;
}

export interface KeyGiverDropResponse
  extends Omit<KeyGiverDrop, "isActive" | "keyGiver" | "drop" | "createdAt"> {
  id: string;
  keyGiver: ShortKeyGiverResponse;
  drop: ShortKeyResponse | null;
}

export interface KeyGiverAddRequest
  extends Omit<
    KeyGiverDrop,
    "isActive" | "keyGiver" | "drop" | "nextRespawnDate" | "createdAt"
  > {
  keyGiver: string;
  drop: string | null;
}

export interface KeyGiverUpdateRequest
  extends Omit<
    KeyGiverAddRequest,
    "keyGiver" | "drop" | "dropDate" | "nextRespawnDate"
  > {
  keyGiver?: string;
  drop?: string | null;
  dropDate?: number;
}
