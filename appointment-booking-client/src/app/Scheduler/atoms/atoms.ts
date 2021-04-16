import { atom } from "jotai";
import { OrganizedAppointments, Provider, ServiceDay } from "../../../types";

export const allAppointmentsAtom = atom<OrganizedAppointments>({});
export const showAppointmentsFormAtom = atom<boolean>(false);

export const dimensionsAtom = atom<WindowDimensions>({
  width: 0,
  height: 0,
});
interface WindowDimensions {
  width: number;
  height: number;
}

export const serviceHoursAtom = atom<ServiceDay[]>([]);

export const providerAtom = atom<Provider | undefined>(undefined);
