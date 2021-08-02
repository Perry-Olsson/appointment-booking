import React, { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormValues } from "../AppointmentForm/types";

const FormApi = createContext<UseFormReturn<FormValues> | undefined>(undefined);

export const FormProvider: React.FC = ({ children }) => {
  const formApi = useForm<FormValues>();
  return <FormApi.Provider value={formApi}>{children}</FormApi.Provider>;
};

export const useFormApi = () => {
  const context = useContext(FormApi);
  if (context === undefined) {
    throw Error("useStaticState must be called within StaticStateProvider");
  }
  return context;
};
