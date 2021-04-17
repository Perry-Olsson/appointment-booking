import { useAtom } from "jotai";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { providerAtom, procedureAtom } from "../../atoms";
import { useStaticState } from "../../context";
import { FormValues } from "../types";

export const useWatchFormValues = (watch: UseFormWatch<FormValues>) => {
  const { providers, procedures } = useStaticState();
  const [, setSelectedProvider] = useAtom(providerAtom);
  const [, setSelectedProcedure] = useAtom(procedureAtom);
  const provider = watch("provider");
  const procedure = watch("procedure");

  useEffect(() => {
    setSelectedProvider(providers.find(p => p.email === provider));
  }, [provider]);

  useEffect(() => {
    setSelectedProcedure(procedures.find(p => p.name === procedure));
  }, [procedure]);
};
