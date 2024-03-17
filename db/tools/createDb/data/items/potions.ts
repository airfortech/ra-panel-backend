import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import { stoneItems } from "../generatorData/items/stones";
import { config } from "../../../../../config/config";
import { potionItems } from "../generatorData/items/potions";

export const potions: Item[] = potionItems.map(short => {
  return {
    short,
    type: ItemTypes.potion,
    weight: randomFromOptions(
      null,
      randomNumberFromRange(50, 200),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(50, 200),
      config.tests.volumePercentage
    ),
    cost: randomFromOptions(
      null,
      randomNumberFromRange(100, 200),
      config.tests.costPercentage
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
