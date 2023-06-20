export const daysOfWeekValidator = (days: number[]): number[] => {
  const finalDays = [
    ...new Set(days.filter(day => day >= 0 && day <= 6).sort()),
  ];
  return finalDays.length > 0 ? finalDays : [0];
};
