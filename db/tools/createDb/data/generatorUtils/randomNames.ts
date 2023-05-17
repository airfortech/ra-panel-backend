import { names } from "../generatorData/names";

export const randomNames = (count: number): string[] => {
  const namesCount = count > names.length ? names.length : count;
  const newNames: string[] = [];
  for (let i = 0; newNames.length < namesCount; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    if (!newNames.includes(name)) newNames.push(name);
  }
  return newNames;
};
