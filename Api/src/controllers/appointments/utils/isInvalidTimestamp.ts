export const isInvalidTimestamp = (timestamp: string): boolean => {
  if (timestamp.length !== 24 || isNaN(Date.parse(timestamp))) return true;
  return false;
};
