import { KeyGiverDropsStats } from "../../../types/KeyGiverDrop";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { KeyGiverDrop } from "../../../db/models/KeyGiverDrop";

dayjs.extend(utc);
dayjs.extend(timezone);

export const byWeekQuery = async (months: number, timezone: string) => {
  const now = dayjs().tz(timezone);
  const time = now
    .startOf("month")
    .subtract(months - 1, "month")
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
          $toDate: { $multiply: ["$dropDate", 1000] },
        },
      },
    },
    {
      $addFields: {
        dropDate: {
          $dateFromParts: {
            isoWeekYear: { $isoWeekYear: "$dropDate" },
            isoWeek: { $isoWeek: "$dropDate" },
            isoDayOfWeek: 1,
            timezone: timezone,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y.%m.%d",
            date: "$dropDate",
            timezone: timezone,
          },
        },
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
