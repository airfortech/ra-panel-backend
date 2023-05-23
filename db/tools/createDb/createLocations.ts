import { Location } from "../../models/Location";
import { locations } from "./data/locations";

export const createLocations = async () => {
  try {
    console.log("Creating locations...");
    await Location.deleteMany({});
    const newLocations = await Location.insertMany(locations);
    console.log("Locations created. ✔");
    return newLocations.map(({ id }) => id as string);
  } catch (e) {
    throw e;
  }
};
