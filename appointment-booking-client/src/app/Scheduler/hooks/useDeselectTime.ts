import { useFormApi } from "../Day/context";

export const useDeselectTime = () => {
  const { setValue } = useFormApi();

  return () => {
    setValue("time", "");
  };
};
