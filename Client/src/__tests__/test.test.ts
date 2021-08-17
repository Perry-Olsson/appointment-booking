import { add } from "../utils/testFunction";

describe("testing", () => {
  test("this adds", () => {
    const sum = add(2, 2);
    expect(sum).toBe(4);
  });
});
