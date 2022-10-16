export interface KeyGiver {
  name: string;
  description?: string;
  respawnTime: number;
  respawns: {
    date: string;
    keyName: string;
  }[];
  lastRespawn?: string;
  nextRespawn?: string;
  isActive: boolean;
}
