import { API_URI } from "../constants";
import { Appointment, OrganizedAppointments } from "../types";
import { AxiosClient } from "./AxiosClient";

export class Api extends AxiosClient {
  public constructor() {
    super(API_URI);
  }

  public getAppointments = async (query = "") => {
    const rawAppointments = await this.instance.get<Appointment[]>(
      `/appointments/${query}`
    );
    return this._indexAppointments(rawAppointments);
  };

  private _indexAppointments(rawAppointments: Appointment[]) {
    const organizedAppointments: OrganizedAppointments = {};
    rawAppointments.forEach(a => {
      a.timestamp = new Date(a.timestamp);
      const month = a.timestamp.getMonth();
      const date = a.timestamp.getDate();

      if (!organizedAppointments[month]) organizedAppointments[month] = {};
      if (!organizedAppointments[month][date])
        organizedAppointments[month][date] = [];

      organizedAppointments[month][date].push(a);
    });
    return organizedAppointments;
  }
}
