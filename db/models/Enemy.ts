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

export const Enemy = model<IEnemySchema>("Enemy", enemySchema);
