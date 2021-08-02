import { useFormApi } from "../context";

export const useDeselectTime = () => {
  const { setValue } = useFormApi();

  return () => {
    setValue("timestamp", "");
  };
};
