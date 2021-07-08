import { NewAppointment, User } from "../../../../types";
import { ConvertedFormValues } from "../hooks";

export const concatUser = (
  data: ConvertedFormValues,
  user: User | "loading" | null
): NewAppointment | undefined => {
  // const end = new Date(data.timestamp);
  // end.setMinutes(
  //   end.getMinutes() +
  //     procedures!.find(p => p.name === data.procedureId)!.duration
  // );

  if (user === "loading") {
    return;
  }
  return { ...data, customerId: user!.email };
};
