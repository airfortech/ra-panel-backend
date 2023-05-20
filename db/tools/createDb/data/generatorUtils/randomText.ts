import { loremIpsum } from "lorem-ipsum";

export const generateText = (min: number, max: number) => {
  const count =
    max !== undefined && max >= min
      ? Math.floor(Math.random() * (max - min + 1) + min)
      : min;
  return count > 0 ? loremIpsum({ count }) : "";
};
