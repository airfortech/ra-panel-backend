import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { ItemDurability } from "../../../../../types/ItemDurability";
import { randomFromArray } from "../generatorUtils/randomFromArray";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomShorts } from "../generatorUtils/randomShorts";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import {
  jewelleryAdjectives1,
  jewelleryAdjectives2,
  jewelleryNouns,
} from "../generatorData/items/jewellery";
import { config } from "../../../../../config/config";

export const jewellery: Item[] = randomShorts(
  config.tests.jewellery,
  jewelleryAdjectives1,
  jewelleryAdjectives2,
  jewelleryNouns
).map(short => {
  const isMagic = randomFromOptions(
    true,
    false,
    config.tests.magicJewelleryPercentage
  );
  return {
    short,
    isMagic,
    type: ItemTypes.jewellery,
    slot: randomFromOptions(true, false, config.tests.magicWeaponsPercentage),
    weight: randomFromOptions(
      null,
      randomNumberFromRange(20, 800),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(8, 200),
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
