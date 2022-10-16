import { KeyGiver as IKeyGiver } from "../../../types/KeyGiver";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { KeyGiver } from "../../models/KeyGiver";
import { keygivers } from "./data/keygivers";
import { keys } from "./data/keys";

dayjs.extend(utc);

export const createKeyGivers = async () => {
  try {
    console.log("Creating keygivers...");
    await KeyGiver.deleteMany({});
    const newKeyGivers = keygivers.map(name => {
      const lorem =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac fringilla orci. Morbi varius lobortis neque, et efficitur turpis bibendum vel. Proin quis dictum erat. Donec placerat dapibus eleifend. Ut.".split(
          " "
        );
      const description = lorem
        .slice(0, Math.floor(Math.random() * lorem.length))
        .join(" ");
      const respawnTime = Math.floor(Math.random() * 70);
      const respawnsCount = Math.floor(Math.random() * 20);
      const respawns = [];
      let timeOffset = Math.floor(Math.random() * 400);
      for (let i = 0; i < respawnsCount; i++) {
        const keyName =
          Math.random() < 0.4
            ? keys[Math.floor(Math.random() * keys.length)].name
            : null;
        timeOffset += respawnTime + Math.floor(Math.random() * 90);
        const date = dayjs
          .utc()
          .subtract(1000, "h")
          .add(timeOffset, "h")
          .format();
        respawns.push({ keyName, date });
      }
      return { name, respawnTime, description, respawns } as IKeyGiver;
    });
    await KeyGiver.insertMany(newKeyGivers);
    console.log("Keygivers created. ✔");
  } catch (e) {
    throw e;
  }
};
