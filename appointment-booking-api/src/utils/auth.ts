import jwt from "jsonwebtoken";
import { AccessRevokedError, TokenNotFoundError } from ".";
import config from "../config";
import { refreshTokens } from "./refreshTokens";

class Auth {
  public createAccessToken(email: string) {
    return jwt.sign({ email }, config.accessTokenSecret, { expiresIn: "15m" });
  }

  public decodeAccessToken(token: string) {
    const decodedToken = jwt.verify(token, config.accessTokenSecret);

    return decodedToken as DecodedToken;
  }

  public createRefreshToken(email: string) {
    return jwt.sign({ email }, config.refreshTokenSecret);
  }

  public decodeRefreshToken(token: string) {
    const decodedToken = jwt.verify(
      token,
      config.refreshTokenSecret
    ) as DecodedToken;

    return decodedToken;
  }

  public checkRefreshToken(token: string): void {
    if (!refreshTokens[token]) throw new TokenNotFoundError(403);

    if (refreshTokens[token] === "banned") throw new AccessRevokedError(403);
  }
}

export interface DecodedToken {
  email: string;
  iat: number;
}

export const auth = new Auth();
