export interface Today {
  now: Date;
  today: Date;
  monthListCursor: Date;
}

export interface Months {
  edges: MonthArray;
  cursor: Date;
}

export type MonthArray = Array<Date[]>;
