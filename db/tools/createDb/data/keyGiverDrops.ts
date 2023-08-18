import { randomFromOptions } from "./generatorUtils/randomFromOptions";
import { config } from "../../../../config/config";
import { createRandomDate } from "./generatorUtils/createRandomDate";

export const keyGiverDrops = (keys?: string[], keyGivers?: string[]) =>
  new Array(config.tests.keyGiverDrops).fill(null).map(item => {
    const data = {
      dropDate: createRandomDate(1),
      keyGiver: keyGivers[Math.floor(Math.random() * keyGivers.length)],
      drop: randomFromOptions(
        null,
        keys[Math.floor(Math.random() * keys.length)],
        config.tests.keyGiverDropsNoDropPercentage
      ),
      nextRespawnDate: randomFromOptions(
        null,
        createRandomDate(1, 1),
        config.tests.keyGiverDropsNoNextDatePercentage
      ),
    };
    return data;
  });
