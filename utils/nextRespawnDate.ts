import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const nextRespawnDate = (
  lastRespawn: string,
  respawnTime: number
): string => {
  if (!respawnTime || !lastRespawn) return null;
  const date = dayjs.utc(lastRespawn);
  if (!date.isValid()) return null;
  return date.add(respawnTime, "h").format();
};
