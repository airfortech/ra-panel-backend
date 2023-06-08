const { rm } = require("fs").promises;
import dayjs from "dayjs";

export const deleteBackups = async (list: string[], months: number) => {
  const files = list.map(file => {
    return { fileName: file, time: dayjs(file.split(".")[0]).unix() };
  });
  // TODO: change it to months
  const deletionTime = dayjs().subtract(months, "minutes").unix();
  files.forEach(({ fileName, time }) => {
    if (time < deletionTime) {
      rm("./backups/" + fileName);
    }
  });
};
