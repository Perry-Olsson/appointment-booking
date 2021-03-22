export const getRandomNumber = (upperBound = 10) => {
  return Math.ceil(Math.random() * upperBound);
};

export const getRandomNumberV2 = (lowerBound: number, upperBound: number) => {
  const additive = Math.ceil(Math.random() * (upperBound + 1 - lowerBound));
  return lowerBound - 1 + additive;
};
