import { User as IUser } from "../../types/User";
import { compare, genSalt, hash } from "bcrypt";
import { Schema, model, Document } from "mongoose";

export interface IUserSchema extends Document, IUser {
  comparePassword: (password: string) => Promise<boolean>;
  changePassword: (password: string) => Promise<void>;
}

const userSchema = new Schema<IUser>({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (this: IUserSchema, next) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(this.password, salt);
  this.password = hashedPassword;
  return next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUserSchema;
  return await compare(password, user.password);
};

userSchema.methods.changePassword = async function (password: string) {
  const user = this as IUserSchema;
  user.password = password;
  await user.save();
};

export const User = model<IUserSchema>("User", userSchema);
