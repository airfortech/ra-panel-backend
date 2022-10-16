export const lastRespawnDate = (
  respawns: { date: string; keyName: string }[]
): string => {
  if (!respawns || respawns.length === 0) return null;
  return respawns[respawns.length - 1].date;
};
