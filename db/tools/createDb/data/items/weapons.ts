import { ItemTypes } from "../../../../../types/ItemTypes";
import { ItemWeapon } from "../../../../../types/ItemWeapon";
import { ItemWeaponHand } from "../../../../../types/ItemWeaponHand";
import { Item } from "../../../../../types/Item";
import { ItemDurability } from "../../../../../types/ItemDurability";
import { randomFromArray } from "../generatorUtils/randomFromArray";
import { randomFromOptions } from "../generatorUtils/randomFromOptions";
import { generateText } from "../generatorUtils/randomText";
import { randomShorts } from "../generatorUtils/randomShorts";
import {
  axeNouns,
  clubNouns,
  daggerNouns,
  hammerNouns,
  poleArmNouns,
  swordNouns,
  weaponAdjectives1,
  weaponAdjectives2,
} from "../generatorData/items/weapons";
import { randomNumberFromRange } from "../../../../../utils/randomNumberFromRange";
import { config } from "../../../../../config/config";

export const weapons: Item[] = randomShorts(
  config.tests.weapons,
  weaponAdjectives1,
  weaponAdjectives2,
  [
    ...swordNouns,
    ...axeNouns,
    ...daggerNouns,
    ...hammerNouns,
    ...clubNouns,
    ...poleArmNouns,
  ]
).map(short => {
  const weaponType = short.split(" ")[2];
  const isMagic = randomFromOptions(
    true,
    false,
    config.tests.magicWeaponsPercentage
  );
  const areStatsProvided = randomFromOptions(
    true,
    false,
    config.tests.weaponStatsPercentage
  );
  return {
    short,
    isMagic,
    type: ItemTypes.weapon,
    slot: randomFromOptions(true, false, config.tests.magicWeaponsPercentage),
    weaponType: swordNouns.includes(weaponType)
      ? ItemWeapon.sword
      : axeNouns.includes(weaponType)
      ? ItemWeapon.axe
      : daggerNouns.includes(weaponType)
      ? ItemWeapon.dagger
      : hammerNouns.includes(weaponType)
      ? ItemWeapon.hammer
      : clubNouns.includes(weaponType)
      ? ItemWeapon.club
      : ItemWeapon.poleArm,
    weaponHand: randomFromOptions(
      randomFromArray(Object.values(ItemWeaponHand)) as ItemWeaponHand,
      null,
      config.tests.weaponHandSpecifiedPercentage
    ),
    weaponSlashingDamage: randomFromOptions(
      true,
      false,
      config.tests.weaponDamageTypeSpecifiedPercentage
    ),
    weaponPiercingDamage: randomFromOptions(
      true,
      false,
      config.tests.weaponDamageTypeSpecifiedPercentage
    ),
    weaponBluntDamage: randomFromOptions(
      true,
      false,
      config.tests.weaponDamageTypeSpecifiedPercentage
    ),
    weaponEffectiveness: areStatsProvided ? randomNumberFromRange(1, 14) : null,
    weaponBalance: areStatsProvided ? randomNumberFromRange(1, 14) : null,
    isWeaponSilver: randomFromOptions(
      true,
      false,
      config.tests.silverWeaponsPercentage
    ),
    weight: randomFromOptions(
      null,
      randomNumberFromRange(20, 9000),
      config.tests.weightPercentage
    ),
    volume: randomFromOptions(
      null,
      randomNumberFromRange(20, 2000),
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
