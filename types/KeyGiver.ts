export interface KeyGiver {
  name: string;
  description?: string;
  respawnTime: number;
  respawns: {
    date: string;
    wasEmpty: boolean;
  }[];
  lastRespawn?: string;
  nextRespawn?: string;
  isActive: boolean;
}
