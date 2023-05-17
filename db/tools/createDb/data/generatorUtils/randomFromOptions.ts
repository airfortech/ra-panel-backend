export const randomFromOptions = (
  option1: any,
  option2: any,
  option1ChancePercentage: number
): string => {
  const percentage = Math.floor(Math.random() * 101);
  return percentage <= option1ChancePercentage ? option1 : option2;
};
