import { NewAppointment, Procedure, User } from "../../../../types";
import { FormValues } from "../types";

export const concatUser = (
  data: FormValues,
  procedures: Procedure[] | undefined,
  user: User | "loading" | null
): NewAppointment | undefined => {
  const end = new Date(data.timestamp);
  end.setMinutes(
    end.getMinutes() +
      procedures!.find(p => p.name === data.procedureId)!.duration
  );

  if (user === "loading") {
    return;
  }
  return { ...data, end: end.toJSON(), customerId: user!.email };
};
