import logger from "../../src/utils/logger";

describe("Logger", () => {
  test("Does not log during testing", () => {
    const logged = logger.info("does not log");
    expect(logged).toBeUndefined();
  });
});
