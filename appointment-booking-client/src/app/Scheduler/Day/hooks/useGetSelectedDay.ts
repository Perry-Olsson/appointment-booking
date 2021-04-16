import { useHandleUrlParam } from "./useHandleUrlParam";

export const useGetSelectedDay = () => {
  const day = useHandleUrlParam();

  return day;
};
