import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { ItemDurability } from "../../../../../types/ItemDurability";
import { randomFromArray } from "../generatorUtils/randomFromArray";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomShorts } from "../generatorUtils/randomShorts";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import {
  clothAdjectives1,
  clothAdjectives2,
  clothNouns,
} from "../generatorData/items/clothes";
import { config } from "../../../../../config/config";

export const clothes: Item[] = randomShorts(
  config.tests.clothes,
  clothAdjectives1,
  clothAdjectives2,
  clothNouns
).map(short => {
  const isMagic = randomFromOptions(
    true,
    false,
    config.tests.magicClothesPercentage
  );
  return {
    short,
    isMagic,
    type: ItemTypes.cloth,
    weight: randomFromOptions(
      null,
      randomNumberFromRange(40, 2000),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(200, 8000),
      config.tests.volumePercentage
    ),
    durability: isMagic
      ? (randomFromArray(Object.values(ItemDurability)) as ItemDurability)
      : null,
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
