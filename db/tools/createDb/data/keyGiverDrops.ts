import { randomFromOptions } from "./generatorUtils/randomFromOptions";
import { config } from "../../../../config/config";
import { createRandomDate } from "./generatorUtils/createRandomDate";

export const keyGiverDrops = (
  keys?: string[],
  keyGivers?: string[],
  magicItems?: string[]
) =>
  new Array(config.tests.keyGiverDrops).fill(null).map(item => {
    const dropDate = createRandomDate(config.tests.keyGiverDropsMonthsBack);

    const data = {
      dropDate,
      keyGiver: keyGivers[Math.floor(Math.random() * keyGivers.length)],
      drop: randomFromOptions(
        null,
        keys[Math.floor(Math.random() * keys.length)],
        config.tests.keyGiverDropsNoDropPercentage
      ),
      magicDrops:
        magicItems?.length > 0
          ? randomFromOptions(
              [],
              Array.from(
                new Set(
                  new Array(Math.floor(Math.random() * 3))
                    .fill(null)
                    .map(
                      () =>
                        magicItems[
                          Math.floor(Math.random() * magicItems.length)
                        ]
                    )
                )
              ),
              config.tests.keyGiverDropsNoMagicItemsDropPercentage
            )
          : [],
      nextRespawnDate: randomFromOptions(
        null,
        createRandomDate(1, 1),
        config.tests.keyGiverDropsNoNextDatePercentage
      ),
      createdAt: dropDate,
    };
    return data;
  });
