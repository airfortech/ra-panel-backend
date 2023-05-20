export const lastRespawnDate = (
  respawns: { date: number; keyName: string }[]
): number => {
  if (!respawns || respawns.length === 0) return null;
  return respawns[respawns.length - 1].date;
};
