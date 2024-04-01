import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import { stoneItems } from "../generatorData/items/stones";
import { config } from "../../../../../config/config";

export const stones: Item[] = stoneItems.map(short => {
  return {
    short,
    type: ItemTypes.stone,
    weight: randomFromOptions(
      null,
      randomNumberFromRange(1, 2000),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(8, 200),
      config.tests.volumePercentage
    ),
    cost: randomFromOptions(
      null,
      randomNumberFromRange(1, 200),
      config.tests.costPercentage
    ),
    vendorCost: randomFromOptions(
      null,
      randomNumberFromRange(1, 89),
      config.tests.vendorCostPercentage
    ),
    description: randomFromOptions(
      "",
      generateText(0, 18),
      config.tests.itemsDescriptionPercentage
    ),
    comment: randomFromOptions(
      "",
      generateText(0, 18),
      config.tests.itemsCommentPercentage
    ),
  } as Item;
});
