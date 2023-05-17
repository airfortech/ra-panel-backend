import dayjs from "dayjs";

export const averageKeyCaptureTime = (
  foundTimestamps: {
    date: number;
    npcName: string;
  }[]
): number => {
  if (foundTimestamps?.length < 2) return null;
  const startTime = dayjs(foundTimestamps[0].date);
  const endTime = dayjs(foundTimestamps[foundTimestamps.length - 1].date);
  return Math.round(
    endTime.diff(startTime, "h", true) / (foundTimestamps.length - 1)
  );
};
