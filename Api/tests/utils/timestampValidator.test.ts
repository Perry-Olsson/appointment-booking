import { TimestampValidator } from "../../src/utils";

const timestampValidator = new TimestampValidator();

test("Validates that a date string is in JSON format", () => {
  const validTimestamp = new Date().toJSON();
  const invalidTimestamp1 = "hello";
  const invalidTimestamp2 = "Tue, 23 Feb 2021 01:53:24 GMT";
  const invalidTimestamp3 = validTimestamp.slice(0, -1);

  expect(() =>
    timestampValidator.validateJSONTimestamp(validTimestamp)
  ).not.toThrow();
  expect(() =>
    timestampValidator.validateJSONTimestamp(invalidTimestamp1)
  ).toThrow();
  expect(() =>
    timestampValidator.validateJSONTimestamp(invalidTimestamp2)
  ).toThrow();
  expect(() =>
    timestampValidator.validateJSONTimestamp(invalidTimestamp3)
  ).toThrow();
});
