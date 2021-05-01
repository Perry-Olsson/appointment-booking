import jwtDecode from "jwt-decode";

export class Auth {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isValidAccessToken() {
    try {
      const token = jwtDecode<{ email: string; iat: number; exp: number }>(
        this.accessToken
      );

      if (Date.now() >= token.exp * 1000) return false;

      return true;
    } catch (e) {
      return false;
    }
  }
}
