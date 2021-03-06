import { atom } from "jotai";
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

export const dayPageAtom = atom<Date>(today);
