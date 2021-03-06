import { atom } from "jotai";

export const currentTime = atom(() => {
  const now = new Date();
  return {
    now,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  };
});
