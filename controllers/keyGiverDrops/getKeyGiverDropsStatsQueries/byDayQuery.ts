import { KeyGiverDropsStats } from "../../../types/KeyGiverDrop";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { KeyGiverDrop } from "../../../db/models/KeyGiverDrop";

dayjs.extend(utc);
dayjs.extend(timezone);

export const byDayQuery = async (
  days: number,
  timezone: string,
  startOf: "day" | "week" | "month"
) => {
  const now = dayjs().tz(timezone);
  const time = now
    .subtract(days - 1, "day")
    .startOf(startOf)
    .add(startOf === "week" ? 1 : 0, "day")
    .unix();
  return (await KeyGiverDrop.aggregate([
    {
      $match: {
        isActive: true,
        dropDate: { $gt: time },
      },
    },
    {
      $addFields: {
        dropDate: {
          $dateToString: {
            format: "%Y.%m.%d",
            timezone,
            // INFO: multiply by 1000 because format in seconds (not miliseconds) not supported
            date: { $toDate: { $multiply: ["$dropDate", 1000] } },
          },
        },
      },
    },
    {
      $group: {
        _id: "$dropDate",
        keyGiversDone: { $count: {} },
        drops: { $sum: { $cond: [{ $ne: ["$drop", null] }, 1, 0] } },
      },
    },
    {
      $project: {
        date: "$_id",
        keyGiversDone: 1,
        drops: 1,
        _id: 0,
      },
    },
    {
      $sort: { date: 1 },
    },
  ])) as KeyGiverDropsStats[];
};
