import jwt from "jsonwebtoken";
import config from "../config";
import { accessTokenExp } from "../constants";

class Auth {
  public createAccessToken(email: string) {
    return jwt.sign({ email }, config.accessTokenSecret, {
      expiresIn: accessTokenExp,
    });
  }

  public decodeAccessToken(token: string) {
    const decodedToken = jwt.verify(token, config.accessTokenSecret);

    return decodedToken as DecodedAccessToken;
  }

  public createRefreshToken(email: string, tokenVersion: number) {
    return jwt.sign({ email, tokenVersion }, config.refreshTokenSecret);
  }

  public decodeRefreshToken(token: string) {
    const decodedToken = jwt.verify(
      token,
      config.refreshTokenSecret
    ) as DecodedToken;

    return decodedToken;
  }
}

export interface DecodedToken {
  email: string;
  iat: number;
}

export interface DecodedAccessToken extends DecodedToken {
  exp: number;
}

export interface DecodedRefreshToken extends DecodedToken {
  tokenVersion: number;
}

export const auth = new Auth();
