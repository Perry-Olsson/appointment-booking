export const randomizeAppointmentType = (skipRandomization?: boolean) => {
  let procedureId: string = "Botox";
  let providerId: string = "john@provider.com";

  if (!skipRandomization)
    if (Math.random() > 0.5) {
      procedureId = "Facial";
      providerId = "jane@provider.com";
    }

  return { procedureId, providerId };
};
