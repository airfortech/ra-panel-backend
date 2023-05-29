import dayjs from "dayjs";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";

export const createRandomDate = (
  maxMonthsBack: number,
  maxMonthsAhead?: number
): number => {
  const now = dayjs();
  const aDate = now.subtract(maxMonthsBack, "month").unix();
  const bDate = (
    maxMonthsAhead ? now.add(maxMonthsAhead, "month") : now
  ).unix();
  const date = randomNumberFromRange(aDate, bDate);
  return date;
};
