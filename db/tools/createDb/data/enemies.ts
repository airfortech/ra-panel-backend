import { Class } from "../../../../types/Class";
import { Enemy } from "../../../../types/Enemy";
import { Guild } from "../../../../types/Guild";
import { Level } from "../../../../types/Level";
import { Race } from "../../../../types/Race";
import { Weapon } from "../../../../types/Weapon";
import { randomNames } from "./generatorUtils/randomNames";
import { randomFromArray } from "./generatorUtils/randomFromArray";
import { randomFromOptions } from "./generatorUtils/randomFromOptions";
import { generateText } from "./generatorUtils/randomText";
import { createRandomDate } from "./generatorUtils/createRandomDate";
import { shorts } from "./generatorData/shorts";

export const enemies: Enemy[] = randomNames(9).map(name => {
  return {
    name: name,
    short: randomFromOptions(randomFromArray(shorts), null, 80),
    race: randomFromOptions(
      randomFromArray(Object.values(Race)),
      null,
      80
    ) as Race,
    class: randomFromOptions(
      randomFromArray(Object.values(Class)),
      null,
      80
    ) as Class,
    guild: randomFromOptions(
      randomFromArray(Object.values(Guild)),
      null,
      80
    ) as Guild,
    level: randomFromOptions(
      randomFromArray(Object.values(Level)),
      null,
      80
    ) as Level,
    weapon: randomFromOptions(
      randomFromArray(Object.values(Weapon)),
      null,
      80
    ) as Weapon,
    comment: randomFromOptions(generateText(0, 8), null, 40),
    addDates: [createRandomDate(24)],
    isActiveEnemy: true,
  };
});
