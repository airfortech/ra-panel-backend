import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { ItemDurability } from "../../../../../types/ItemDurability";
import { randomFromArray } from "../generatorUtils/randomFromArray";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomShorts } from "../generatorUtils/randomShorts";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import {
  armorAdjectives1,
  armorAdjectives2,
} from "../generatorData/items/armors";
import { shieldNouns } from "../generatorData/items/shields";
import { config } from "../../../../../config/config";

export const shields: Item[] = randomShorts(
  config.tests.armors,
  armorAdjectives1,
  armorAdjectives2,
  shieldNouns
).map(short => {
  const isMagic = randomFromOptions(
    true,
    false,
    config.tests.magicShieldsPercentage
  );
  const areStatsProvided = randomFromOptions(
    true,
    false,
    config.tests.shieldStatsPercentage
  );
  return {
    short,
    isMagic,
    type: ItemTypes.shield,
    slot: randomFromOptions(true, false, config.tests.magicWeaponsPercentage),
    armorPiercingRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
    armorSlashingRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
    armorBluntRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
    shieldParry: randomFromOptions(
      randomNumberFromRange(1, 12),
      null,
      config.tests.shieldParrySpecifiedPercentage
    ),
    weight: randomFromOptions(
      null,
      randomNumberFromRange(400, 40000),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(200, 4000),
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
