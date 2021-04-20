import { Procedure, Provider } from "../../../types";

export const getProcedureListFromProviders = (
  providers: Provider[],
  selectedProvider?: string
) => {
  // if (selectedProvider) {
  //   return providers.find(provider => selectedProvider === provider.email)!
  //     .procedures;
  // }
  const procedureMem: any = {};
  let procedures: Procedure[] = [];
  providers.forEach(provider => {
    provider.procedures.forEach(procedure => {
      if (!procedureMem[procedure.name]) {
        procedureMem[procedure.name] = procedure.name;
        procedures.push(procedure);
      }
    });
  });
  return procedures;
};
