import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const averageKeyCaptureTime = (
  foundTimestamps: {
    date: string;
    npcName: string;
  }[]
): number => {
  if (foundTimestamps?.length < 2) return null;
  const startTime = dayjs.utc(foundTimestamps[0].date);
  const endTime = dayjs.utc(foundTimestamps[foundTimestamps.length - 1].date);
  return Math.round(
    endTime.diff(startTime, "h", true) / (foundTimestamps.length - 1)
  );
};
