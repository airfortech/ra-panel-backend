import dayjs from "dayjs";
import { KeyGiverDropsStats } from "../types/KeyGiverDrop";

export const fillKeyGiverDropsStatsDays = (
  keyGiverDropsStats: KeyGiverDropsStats[]
) => {
  const startedDate = dayjs(keyGiverDropsStats[0].date).unix();
  const endDate = dayjs(keyGiverDropsStats.at(-1).date).unix();
  const dayInMs = 86400;
  const newKeyGiverDropsStats: KeyGiverDropsStats[] = [];

  for (let i = startedDate; i <= endDate; i += dayInMs) {
    const date = dayjs.unix(i).format("YYYY.MM.DD");
    const index = keyGiverDropsStats.findIndex(item => item.date === date);
    if (index > -1) {
      newKeyGiverDropsStats.push(keyGiverDropsStats[index]);
    } else
      newKeyGiverDropsStats.push({
        keyGiversDone: 0,
        drops: 0,
        date: dayjs.unix(i).format("YYYY.MM.DD"),
      });
  }

  return newKeyGiverDropsStats;
};
