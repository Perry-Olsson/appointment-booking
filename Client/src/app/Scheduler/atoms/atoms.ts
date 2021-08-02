import { atom } from "jotai";
import { ErrorObject } from "../../../components";
import { OrganizedAppointments, ServiceDay } from "../../../types";

export const allAppointmentsAtom = atom<OrganizedAppointments>({});
export const showAppointmentsFormAtom = atom<boolean>(false);

export const dimensionsAtom = atom<WindowDimensions>({
  width: 0,
  height: 0,
});

export const serviceHoursAtom = atom<ServiceDay[]>([]);

export const errorAtom = atom<ErrorObject | null>(null);
export const showErrorAtom = atom<boolean>(true);

interface WindowDimensions {
  width: number;
  height: number;
}
