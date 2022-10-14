export const lastRespawnDate = (
  respawns: { date: string; wasEmpty: boolean }[]
): string => {
  if (!respawns || respawns.length === 0) return null;
  return respawns[respawns.length - 1].date;
};
