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
    const organizedAppointments: any = {};
    rawAppointments.forEach(a => {
      a.timestamp = new Date(a.timestamp);
      const month = a.timestamp.getMonth();
      if (organizedAppointments[month] === undefined) {
        organizedAppointments[month] = {};
      }
      organizedAppointments[month][a.timestamp.getDate()] = a;
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
