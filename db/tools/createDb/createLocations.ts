import { Location } from "../../models/Location";
import { keyGivers } from "./data/keyGivers";
import { locations } from "./data/locations";

export const createLocations = async () => {
  try {
    console.log("Creating locations...");
    await Location.deleteMany({});
    await Location.insertMany(locations);
    console.log("Locations created. ✔");
  } catch (e) {
    throw e;
  }
};
