export const isInvalidDate = (date: Date) => {
  return isNaN(date.valueOf());
};
