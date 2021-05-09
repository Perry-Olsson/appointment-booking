class ReqParser {
  public format(reqBody: ReqBody) {
    if (typeof reqBody !== "object") return reqBody;

    for (let key in reqBody) {
      if (typeof reqBody[key] === "string") {
        switch (key) {
          case "email":
            reqBody["email"] = reqBody["email"].toLowerCase();
        }
        reqBody[key] = reqBody[key].trim();
      }
    }
    return reqBody;
  }
}

export const reqParser = new ReqParser();

interface ReqBody {
  [key: string]: any;
}
