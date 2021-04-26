import { useStaticState } from "../context";
import { useFormApi } from "../context";

export const useWatchProvider = () => {
  const { providers } = useStaticState();
  const { watch } = useFormApi();
  const provider = watch("provider");

  return providers.find(p => p.email === provider);
};

export const useWatchProcedure = () => {
  const { procedures } = useStaticState();
  const { watch } = useFormApi();
  const procedure = watch("procedure");

  return procedures.find(p => p.name === procedure);
};

export const useWatchTime = () => {
  const { watch } = useFormApi();
  const time = watch("time");

  return time !== "" ? new Date(time) : undefined;
};
