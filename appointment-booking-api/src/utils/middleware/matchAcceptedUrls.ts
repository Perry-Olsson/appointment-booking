import express, { NextFunction } from "express";

export const matchAcceptedUrls = (
  req: express.Request,
  _res: express.Response,
  next: NextFunction
) => {
  const {
    headers: { origin },
  } = req;

  const match = origin?.match(
    /https:\/\/renewal-center-\S+-perry-olsson\.vercel\.app/gm
  );

  if (match)
    req.headers.origin =
      "https://renewal-center-git-main-perry-olsson.vercel.app";

  next();
};
