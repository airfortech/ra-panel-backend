import {
  KeyGiverDropsStats,
  KeyGiverDropsStatsTimeOptions,
} from "../../types/KeyGiverDrop";
import { Request } from "../../types/Request";
import { Status } from "../../types/responseMessages";
import { Response } from "express";
import { byDayQuery } from "./getKeyGiverDropsStatsQueries/byDayQuery";
import { isTimezoneValid } from "../../utils/isTimezoneValid";
import { byWeekQuery } from "./getKeyGiverDropsStatsQueries/byWeekQuery";
import { byMonthQuery } from "./getKeyGiverDropsStatsQueries/byMonthQuery";

export const getKeyGiverDropsStats = async (req: Request, res: Response) => {
  try {
    const { time, timezone } = req.query;
    const defaultTimezone = isTimezoneValid(timezone)
      ? (timezone as string)
      : "Europe/Warsaw";
    let keyGiverDropsStats: KeyGiverDropsStats[] = [];

    switch (time) {
      case KeyGiverDropsStatsTimeOptions.currentWeek:
        keyGiverDropsStats = await byDayQuery(1, defaultTimezone, "isoWeek");
        break;
      case KeyGiverDropsStatsTimeOptions.last5days:
        keyGiverDropsStats = await byDayQuery(5, defaultTimezone, "day");
        break;
      case KeyGiverDropsStatsTimeOptions.last10days:
        keyGiverDropsStats = await byDayQuery(10, defaultTimezone, "day");
        break;
      case KeyGiverDropsStatsTimeOptions.last30days:
        keyGiverDropsStats = await byDayQuery(30, defaultTimezone, "day");
        break;
      case KeyGiverDropsStatsTimeOptions.currentMonth:
        keyGiverDropsStats = await byDayQuery(1, defaultTimezone, "month");
        break;
      case KeyGiverDropsStatsTimeOptions.last2months:
        keyGiverDropsStats = await byWeekQuery(2, defaultTimezone);
        break;
      case KeyGiverDropsStatsTimeOptions.last6months:
        keyGiverDropsStats = await byWeekQuery(6, defaultTimezone);
        break;
      case KeyGiverDropsStatsTimeOptions.currentYear:
        keyGiverDropsStats = await byMonthQuery(1, defaultTimezone, "year");
        break;
      case KeyGiverDropsStatsTimeOptions.last12months:
        keyGiverDropsStats = await byMonthQuery(1, defaultTimezone, "month");
        break;
      case KeyGiverDropsStatsTimeOptions.alltime:
        keyGiverDropsStats = await byMonthQuery(100, defaultTimezone, "year");
        break;
      default:
        keyGiverDropsStats = await byDayQuery(10, defaultTimezone, "day");
        break;
    }

    return res.status(200).json({
      status: Status.success,
      data: { keyGiverDropsStats },
    });
  } catch (e) {
    throw e;
  }
};
