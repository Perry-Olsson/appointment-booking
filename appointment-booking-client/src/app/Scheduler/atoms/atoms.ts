import { atom } from "jotai";
import { OrganizedAppointments } from "../../../types";
import { Months, Today } from "../types";
import { computeDates } from "../utils";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const monthListCursor = new Date(now.getFullYear(), now.getMonth());

export const nowAtom = atom<Today>({
  now,
  today,
  monthListCursor,
});

const dates = computeDates(monthListCursor);

export const monthsAtom = atom<Months>(dates);

export const allAppointmentsAtom = atom<OrganizedAppointments>({});

export const dimensionsAtom = atom<WindowDimensions>({
  width: 0,
  height: 0,
});

interface WindowDimensions {
  width: number;
  height: number;
}

export const showAppointmentsFormAtom = atom<boolean>(false);
