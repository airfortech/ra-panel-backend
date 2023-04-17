import { Domain } from "./Domain";

export interface Key {
  name: string;
  treasuryName: string;
  domain: Domain;
  foundTimestamps: {
    date: number;
    npcName: string;
  }[];
  averageCaptureTime?: number;
  isActive: boolean;
}
