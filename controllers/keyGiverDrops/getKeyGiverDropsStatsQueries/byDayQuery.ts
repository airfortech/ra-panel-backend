import { KeyGiverDropsStats } from "../../../types/KeyGiverDrop";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import { KeyGiverDrop } from "../../../db/models/KeyGiverDrop";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

export const byDayQuery = async (
  days: number,
  timezone: string,
  startOf: "day" | "isoWeek" | "month"
) => {
  const now = dayjs().tz(timezone);
  const time = now
    .subtract(days - 1, "day")
    .startOf(startOf)
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
        // INFO: not provided values are set [] to avoid errors after schema changes to existing database
        magicDrops: {
          $ifNull: ["$magicDrops", []],
        },
      },
    },
    {
      $group: {
        _id: "$dropDate",
        keyGiversDone: { $count: {} },
        keys: { $sum: { $cond: [{ $ne: ["$drop", null] }, 1, 0] } },
        magicDrops: {
          $sum: {
            $size: {
              $filter: {
                input: "$magicDrops",
                as: "magicDrop",
                cond: { $ne: ["$$magicDrop", null] },
              },
            },
          },
        },
        keyGiversWithMagicDrops: {
          $sum: {
            $cond: [{ $gt: [{ $size: "$magicDrops" }, 0] }, 1, 0],
          },
        },
        keyGiversWithAnyDrops: {
          $sum: {
            $cond: [
              {
                $or: [
                  { $ne: ["$drop", null] },
                  { $gt: [{ $size: "$magicDrops" }, 0] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        date: "$_id",
        keyGiversDone: 1,
        keys: 1,
        magicDrops: 1,
        keyGiversWithMagicDrops: 1,
        keyGiversWithAnyDrops: 1,
        _id: 0,
      },
    },
    {
      $sort: { date: 1 },
    },
  ])) as KeyGiverDropsStats[];
};
