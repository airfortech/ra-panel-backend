import dayjs from "dayjs";

export const nextRespawnDate = (
  lastRespawn: number,
  respawnTime: number
): number => {
  if (!respawnTime || !lastRespawn) return null;
  const date = dayjs(lastRespawn);
  if (!date.isValid()) return null;
  return date.add(respawnTime, "h").valueOf();
};
