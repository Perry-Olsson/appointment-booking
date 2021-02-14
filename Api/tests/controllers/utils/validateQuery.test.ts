import { validateQuery } from "../../../src/controllers/appointments/utils/validateQuery";

describe("Query string is validated correctly", () => {
  test("validate field returns correct fields", () => {
    const validQuery = validateQuery(query);
    expect(validQuery).toEqual({
      month: now.getMonth(),
      year: now.getFullYear(),
    });
  });
});

const now = new Date();

const query = {
  month: now.getMonth().toString(),
  year: now.getFullYear().toString(),
  fake: "doesn't return obj with invalid field",
  hour: "doesn't return valid field with invalid value",
};
