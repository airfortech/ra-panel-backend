import dayjs from "dayjs";

export const createRandomDate = (maxMonthsBack: number): number => {
  const now = dayjs();
  const past = now.subtract(maxMonthsBack, "month");
  const diffSeconds = now.diff(past, "second");
  const randomSeconds = Math.floor(Math.random() * diffSeconds);
  const randomDate = past.add(randomSeconds, "second");
  return randomDate.unix();
};
