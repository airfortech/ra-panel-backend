import { Domain } from "./Domain";

export interface Location {
  locationId: number;
  name: string;
  domain: Domain;
  description: string;
  comment: string;
  binds: string[];
  isActive: boolean;
}
export interface LocationResponse extends Omit<Location, "isActive"> {
  id: string;
}

export interface ShortLocationResponse
  extends Omit<
    LocationResponse,
    "isActive" | "description" | "comment" | "binds"
  > {}

export interface LocationAddRequest
  extends Omit<
    Location,
    "name" | "description" | "comment" | "binds" | "isActive"
  > {
  name?: string;
  description?: string;
  comment?: string;
  binds?: string[];
}

export interface LocationUpdateRequest
  extends Omit<LocationAddRequest, "locationId" | "domain"> {
  locationId?: number;
  domain?: Domain;
}
