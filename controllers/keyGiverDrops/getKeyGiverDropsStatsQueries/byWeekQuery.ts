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
        magicDrops: {
          $ifNull: ["$magicDrops", []],
        },
        monday: {
          $dateFromParts: {
            isoWeekYear: { $isoWeekYear: "$dropDate" },
            isoWeek: { $isoWeek: "$dropDate" },
            isoDayOfWeek: 1,
            timezone: timezone,
          },
        },
        sunday: {
          $dateFromParts: {
            isoWeekYear: { $isoWeekYear: "$dropDate" },
            isoWeek: { $isoWeek: "$dropDate" },
            isoDayOfWeek: 7,
            timezone: timezone,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $concat: [
            {
              $dateToString: {
                format: "%Y.%m.%d",
                date: "$monday",
                timezone: timezone,
              },
            },
            "-",
            {
              $dateToString: {
                format: "%d",
                date: "$sunday",
                timezone: timezone,
              },
            },
          ],
        },
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
