import { Enemy as IEnemy } from "../../types/Enemy";
import { Schema, model, Document } from "mongoose";

export interface IEnemySchema extends Document, IEnemy {}

const enemySchema = new Schema<IEnemy>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

enemySchema.pre("save", function (this: IEnemySchema, next) {
  const name = this.name.trim();
  if (name.split(" ").length > 1) this.name = name;
  else this.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
  next();
});

export const User = model<IEnemySchema>("Enemy", enemySchema);
