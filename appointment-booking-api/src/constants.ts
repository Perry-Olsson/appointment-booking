export const QUARTER_HOUR = 1000 * 60 * 15;
export const HALF_HOUR = QUARTER_HOUR * 2;
export const HOUR = HALF_HOUR * 2;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_MONTH = 30 * ONE_DAY;

export const exposedFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
  end: true,
};

export const timeStringRegExp = /^\d{2}:\d{2}$/;
