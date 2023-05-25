import { Types } from "mongoose";
import { Domain } from "./Domain";

export interface Key {
  name: string;
  treasury: Types.ObjectId | null;
  domain: Domain;
  description: string;
  comment: string;
  isActive: boolean;
}

export interface KeyResponse extends Omit<Key, "isActive" | "treasury"> {
  id: string;
  treasury: string | null;
}

export interface KeyAddRequest
  extends Omit<Key, "isActive" | "treasury" | "description" | "comment"> {
  treasury: string | null;
  description?: string;
  comment?: string;
}

export interface KeyUpdateRequest
  extends Omit<KeyAddRequest, "name" | "domain" | "treasury"> {
  name?: string;
  treasury?: string | null;
  domain?: Domain;
}
