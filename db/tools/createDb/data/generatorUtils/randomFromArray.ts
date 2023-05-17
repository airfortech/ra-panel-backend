export const randomFromArray = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];
