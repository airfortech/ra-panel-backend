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
import { names } from "./generatorData/names";

export const enemies: Enemy[] = randomNames(config.tests.enemies, names).map(
  name => {
    return {
      name: name,
      short: randomFromOptions(
        "",
        randomFromArray(shorts),
        config.tests.enemiesDefaultPercentage
      ),
      race: randomFromOptions(
        Race.unknown,
        randomFromArray(Object.values(Race)) as Race,
        config.tests.enemiesDefaultPercentage
      ),
      profession: randomFromOptions(
        Profession.unknown,
        randomFromArray(Object.values(Profession)) as Profession,
        config.tests.enemiesDefaultPercentage
      ),
      guild: randomFromOptions(
        Guild.gp,
        randomFromArray(Object.values(Guild)) as Guild,
        config.tests.enemiesDefaultPercentage
      ),
      level: randomFromOptions(
        Level.unknown,
        randomFromArray(Object.values(Level)) as Level,
        config.tests.enemiesDefaultPercentage
      ),
      weapon: randomFromOptions(
        Weapon.unknown,
        randomFromArray(Object.values(Weapon)) as Weapon,
        config.tests.enemiesDefaultPercentage
      ),
      comment: randomFromOptions(
        "",
        generateText(0, 8),
        config.tests.enemiesDefaultPercentage
      ),
      addDates: [createRandomDate(24)],
      removeDates: [],
      isActiveEnemy: true,
    };
  }
);
