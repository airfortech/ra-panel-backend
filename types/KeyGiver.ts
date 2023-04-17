export interface KeyGiver {
  name: string;
  description?: string;
  respawnTime: number;
  respawns: {
    date: number;
    keyName: string;
  }[];
  lastRespawn?: number;
  nextRespawn?: number;
  isActive: boolean;
}
