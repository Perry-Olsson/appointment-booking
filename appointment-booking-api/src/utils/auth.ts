import jwt from "jsonwebtoken";
import config from "../config";

class Auth {
  public createAccessToken(email: string) {
    return jwt.sign({ email }, config.accessTokenSecret, { expiresIn: "10s" });
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
}

export interface DecodedToken {
  email: string;
  iat: number;
}

export const auth = new Auth();
