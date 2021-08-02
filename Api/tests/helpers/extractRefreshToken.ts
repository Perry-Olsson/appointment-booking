export const extractRefreshToken = (cookie: string[]) => {
  const token = cookie[0].match(/=([^;]+); /);
  if (!token) throw new Error("bad regex");
  return token[1];
};
