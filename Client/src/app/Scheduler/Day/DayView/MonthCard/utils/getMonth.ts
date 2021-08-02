import { Months } from "../../../../types";

export const getMonth = ({ edges }: Months, day: Date): Date[] => {
  const year = day.getFullYear();
  const month = day.getMonth();
  for (let i = 0; i < edges.length; i++) {
    if (year === edges[i][0].getFullYear() && month === edges[i][0].getMonth())
      return edges[i];
  }
  return edges[0];
};
