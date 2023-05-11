import { Enemy as IEnemy } from "../../types/Enemy";
import { Schema, model, Document } from "mongoose";
import { messages } from "../../types/responseMessages";
import { config } from "../../config/config";
import { Race } from "../../types/Race";
import { Class } from "../../types/Class";
import { Guild } from "../../types/Guild";
import { Level } from "../../types/Level";
import { Weapon } from "../../types/Weapon";

export interface IEnemySchema extends Document, IEnemy {}

const enemySchema = new Schema<IEnemy>({
  name: {
    type: String,
    required: [true, messages[config.lang].enemies.nameIsRequired],
    maxLength: [30, messages[config.lang].enemies.nameTooLong],
    unique: true,
  },
  short: {
    type: String,
    maxLength: [50, messages[config.lang].enemies.shortTooLong],
    default: null,
  },
  race: {
    type: String,
    enum: {
      values: [...Object.values(Race), null],
      message: messages[config.lang].enemies.wrongRace,
    },
    default: null,
  },
  class: {
    type: String,
    enum: {
      values: [...Object.values(Class), null],
      message: messages[config.lang].enemies.wrongClass,
    },
    default: null,
  },
  guild: {
    type: String,
    enum: {
      values: [...Object.values(Guild), null],
      message: messages[config.lang].enemies.wrongGuild,
    },
    default: null,
  },
  level: {
    type: String,
    enum: {
      values: [...Object.values(Level), null],
      message: messages[config.lang].enemies.wrongLevel,
    },
    default: null,
  },
  weapon: {
    type: String,
    enum: {
      values: [...Object.values(Weapon), null],
      message: messages[config.lang].enemies.wrongWeapon,
    },
    default: null,
  },
  comment: {
    type: String,
    maxLength: [4000, messages[config.lang].enemies.commentTooLong],
    default: null,
  },
  addDates: {
    type: [Number],
    default: [],
  },
  removeDates: {
    type: [Number],
    default: [],
  },
  isActiveEnemy: {
    type: Boolean,
    default: true,
  },
});

export const Enemy = model<IEnemySchema>("Enemy", enemySchema);
