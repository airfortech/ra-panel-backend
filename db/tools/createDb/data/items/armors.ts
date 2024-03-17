import { Item } from "../../../../../types/Item";
import { ItemTypes } from "../../../../../types/ItemTypes";
import { ItemArmorClass } from "../../../../../types/ItemArmorClass";
import { ItemDurability } from "../../../../../types/ItemDurability";
import { randomFromArray } from "../generatorUtils/randomFromArray";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomShorts } from "../generatorUtils/randomShorts";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import {
  armorAdjectives1,
  armorAdjectives2,
  armorNouns,
} from "../generatorData/items/armors";
import { config } from "../../../../../config/config";

export const armors: Item[] = randomShorts(
  config.tests.armors,
  armorAdjectives1,
  armorAdjectives2,
  armorNouns
).map(short => {
  const isMagic = randomFromOptions(
    true,
    false,
    config.tests.magicArmorsPercentage
  );
  const areStatsProvided = randomFromOptions(
    true,
    false,
    config.tests.armorStatsPercentage
  );
  const areBodyPartsProvided = randomFromOptions(
    true,
    false,
    config.tests.armorBodyPartSpecifiedPercentage
  );
  return {
    short,
    isMagic,
    type: ItemTypes.armor,
    armorClass: randomFromOptions(
      randomFromArray(Object.values(ItemArmorClass)) as ItemArmorClass,
      null,
      config.tests.armorClassSpecifiedPercentage
    ),
    armorHead: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorLeftArm: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorRightArm: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorChest: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorLegs: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorFoots: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorHands: areBodyPartsProvided ? randomFromArray([true, false]) : null,
    armorPiercingRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
    armorSlashingRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
    armorBluntRes: areStatsProvided ? randomNumberFromRange(1, 12) : null,
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
