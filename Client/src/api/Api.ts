import { Appointment } from "../types";
import { AxiosClient } from "./AxiosClient";

export class Api extends AxiosClient {
  public constructor() {
    super("http://localhost:3001/api");
  }

  public getAppointments = async (query = "") => {
    const rawAppointments = await this.instance.get<Appointment[]>(
      `/appointments/${query}`
    );
    const organizedAppointments = new Map<string, Appointment>();
    rawAppointments.forEach(a => {
      organizedAppointments.set(a.timestamp, a);
    });
    return organizedAppointments;
  };
}

// interface OrganizedAppointments {
//   0: Appointment[];
//   1: Appointment[];
//   2: Appointment[];
//   3: Appointment[];
//   4: Appointment[];
//   5: Appointment[];
//   6: Appointment[];
//   7: Appointment[];
//   8: Appointment[];
//   9: Appointment[];
//   10: Appointment[];
//   11: Appointment[];
// }
