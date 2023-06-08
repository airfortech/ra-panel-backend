const { readdir } = require("fs").promises;

export const getFilesList = async () => await readdir("./backups");
