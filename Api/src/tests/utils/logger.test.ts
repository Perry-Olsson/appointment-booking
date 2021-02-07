import logger from "../../utils/logger";

describe("Logger", () => {
  test("Does not log during testing", () => {
    const logged = logger.info("does not log");
    expect(logged).toBeUndefined();
  });

  test("Logs in non-testing env", () => {
    process.env.NODE_ENV = "development";
    const logged = logger.info("hello world");
    process.env.NODE_ENV = "test";
    expect(logged[0]).toBe("hello world");
  });
});
