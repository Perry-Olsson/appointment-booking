import { useGetSelectedDay } from ".";

export const useDayState = () => {
  const { day } = useGetSelectedDay();

  return {
    day,
  };
};
