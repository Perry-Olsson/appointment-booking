const info = (...params: any): any => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
    return params;
  }
};

const error = (...params: any): any => {
  console.error(...params);
  return params;
};

export default {
  info,
  error,
};
