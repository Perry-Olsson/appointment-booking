import { validateQuery } from "../../../src/repositories/Appointments/utils";

describe("Query string is validated correctly", () => {
  test("validate field returns correct fields", () => {
    const validQuery = validateQuery(query);
    expect(validQuery).toEqual({
      year: now.getFullYear(),
      month: now.getMonth(),
    });
  });
});

const now = new Date();

const query = {
  where: {
    year: now.getFullYear(),
    month: now.getMonth().toString(),
    fake: "doesn't return obj with invalid field",
    hour: "doesn't return valid field with invalid value",
  },
};
