import { useEffect } from "react";
import { useStaticState } from "../../context";
import { useFormApi } from "../../context";

export const useDeselectFieldsOnChange = () => {
  const { setValue, watch } = useFormApi();
  const { providers } = useStaticState();
  const provider = watch("providerId");
  const procedure = watch("procedureId");

  useEffect(() => {
    setValue("timestamp", "");
  }, [provider, procedure]);

  useEffect(() => {
    if (
      procedure &&
      !providers
        .find(p => p.email === provider)
        ?.procedures.find(p => p.name === procedure)
    )
      setValue("providerId", "");
  }, [procedure]);
};
