import { atom } from "jotai";
import { OrganizedAppointments } from "../../../types";

export const currentTime = atom<Today>(() => {
  const now = new Date();
  return {
    now,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  };
});

export const appointmentsAtom = atom<OrganizedAppointments>({});

interface Today {
  now: Date;
  today: Date;
}
