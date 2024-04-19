import { Domain } from "../../../../types/Domain";
import { Location } from "../../../../types/Location";
import { randomUUID } from "crypto";
import { locationNames } from "./generatorData/locationNames";
import { randomFromArray } from "./generatorUtils/randomFromArray";
import { randomFromOptions } from "./generatorUtils/randomFromOptions";
import { generateText } from "./generatorUtils/randomText";
import { randomNames } from "./generatorUtils/randomNames";
import { config } from "../../../../config/config";

export const locations: Location[] = randomNames(
  config.tests.locations,
  locationNames
).map(name => {
  return {
    locationId: Math.floor(Math.random() * 100000),
    internalId: randomUUID().slice(-10),
    name: name,
    domain: randomFromOptions(
      Domain.unknown,
      randomFromArray([Domain.Imperium, Domain.Ishtar]) as Domain,
      config.tests.locationsDefaultPercentage
    ),
    description: randomFromOptions(
      "",
      generateText(0, 8),
      config.tests.locationsDefaultPercentage
    ),
    comment: randomFromOptions(
      "",
      generateText(0, 8),
      config.tests.locationsDefaultPercentage
    ),
    binds: [],
    isActive: true,
  };
});
