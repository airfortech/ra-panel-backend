export const randomFromArray = <T extends string | boolean>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
