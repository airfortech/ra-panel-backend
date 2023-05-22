export const randomFromOptions = <T, K>(
  option1: T,
  option2: K,
  option1ChancePercentage: number
) => {
  const percentage = Math.floor(Math.random() * 101);
  const value: T | K =
    percentage <= option1ChancePercentage ? option1 : option2;
  return value;
};
