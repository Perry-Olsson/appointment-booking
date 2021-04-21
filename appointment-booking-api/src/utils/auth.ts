import jwt from "jsonwebtoken";
import config from "../config";

class Auth {
  public createToken(email: string) {
    return jwt.sign({ email }, config.accessTokenSecret);
  }

  public decodeToken(token: string) {
    const decodedToken = jwt.verify(
      token,
      config.accessTokenSecret
    ) as DecodedToken;

    return decodedToken;
  }
}

export interface DecodedToken {
  email: string;
  iat: number;
}

export const auth = new Auth();
