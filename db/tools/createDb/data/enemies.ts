import { Profession } from "../../../../types/Profession";
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
import { config } from "../../../../config/config";

export const enemies: Enemy[] = randomNames(config.tests.enemies).map(name => {
  return {
    name: name,
    short: randomFromOptions(
      "",
      randomFromArray(shorts),
      config.tests.enemiesDefaultPercentage
    ),
    race: randomFromOptions(
      Race.unknown,
      randomFromArray(Object.values(Race)),
      config.tests.enemiesDefaultPercentage
    ) as Race,
    profession: randomFromOptions(
      Profession.unknown,
      randomFromArray(Object.values(Profession)),
      config.tests.enemiesDefaultPercentage
    ) as Profession,
    guild: randomFromOptions(
      Guild.gp,
      randomFromArray(Object.values(Guild)),
      config.tests.enemiesDefaultPercentage
    ) as Guild,
    level: randomFromOptions(
      Level.unknown,
      randomFromArray(Object.values(Level)),
      config.tests.enemiesDefaultPercentage
    ) as Level,
    weapon: randomFromOptions(
      Weapon.unknown,
      randomFromArray(Object.values(Weapon)),
      config.tests.enemiesDefaultPercentage
    ) as Weapon,
    comment: randomFromOptions(
      "",
      generateText(0, 8),
      config.tests.enemiesDefaultPercentage
    ),
    addDates: [createRandomDate(24)],
    removeDates: [],
    isActiveEnemy: true,
  };
});
