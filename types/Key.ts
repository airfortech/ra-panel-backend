import { Domain } from "./Domain";

export interface Key {
  name: string;
  treasuryName: string;
  domain: Domain;
  foundTimestamps: {
    date: string;
    npcName: string;
  }[];
  averageCaptureTime?: number;
  isActive: boolean;
}
