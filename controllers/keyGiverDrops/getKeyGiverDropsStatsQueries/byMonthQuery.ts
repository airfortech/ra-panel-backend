import { KeyGiverDropsStats } from "../../../types/KeyGiverDrop";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { KeyGiverDrop } from "../../../db/models/KeyGiverDrop";

dayjs.extend(utc);
dayjs.extend(timezone);

export const byMonthQuery = async (
  years: number,
  timezone: string,
  startOf: "month" | "year"
) => {
  const now = dayjs().tz(timezone);
  const time = now
    .startOf(startOf)
    .subtract(startOf === "month" ? years * 12 - 1 : (years - 1) * 12, "month")
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
        magicDrops: {
          $ifNull: ["$magicDrops", []],
        },
        dropDate: {
          $dateToString: {
            format: "%Y.%m",
            timezone,
            date: { $toDate: { $multiply: ["$dropDate", 1000] } },
          },
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
