import { Realm } from "./Realm";

export interface Key {
  name: string;
  treasuryName: string;
  domain: Realm;
  foundTimestamps: {
    date: string;
    npcName: string;
  }[];
  isActive: boolean;
}
