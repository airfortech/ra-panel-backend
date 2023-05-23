import { Domain } from "../../../../types/Domain";
import { KeyGiver } from "../../../../types/KeyGiver";
import { randomFromArray } from "./generatorUtils/randomFromArray";
import { randomFromOptions } from "./generatorUtils/randomFromOptions";
import { generateText } from "./generatorUtils/randomText";
import { shorts } from "./generatorData/shorts";
import { keyGiversShorts } from "./generatorData/keygiversShorts";
import { names } from "./generatorData/names";
import { randomNames } from "./generatorUtils/randomNames";
import { config } from "../../../../config/config";

export const keyGivers: KeyGiver[] = randomNames(
  keyGiversShorts.length,
  names
).map((name, i) => {
  return {
    name: name,
    short: shorts[i],
    description: randomFromOptions(
      "",
      generateText(0, 8),
      config.tests.keyGiversDefaultPercentage
    ),
    respawnTime: randomFromOptions(
      0,
      Math.floor(Math.random() * 24),
      config.tests.keyGiversDefaultPercentage
    ),
    domain: randomFromOptions(
      Domain.unknown,
      randomFromArray(Object.values(Domain)) as Domain,
      config.tests.keyGiversDefaultPercentage
    ),
    playersToComplete: randomFromOptions(
      null,
      Math.floor(Math.random() * 4),
      config.tests.keyGiversDefaultPercentage
    ),
    comment: randomFromOptions(
      "",
      generateText(0, 8),
      config.tests.keyGiversDefaultPercentage
    ),
    locations: [],
    isActive: true,
  };
});
