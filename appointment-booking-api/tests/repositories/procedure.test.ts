import { prisma } from "../../src/prisma";
import { initializeTestData } from "../helpers";
import { procedure } from "../../src/repositories";

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("Procedure read ops", () => {
  test("getProcedures returns all procedures stored in db", async () => {
    const proceduresFromDb = await prisma.procedure.findMany();
    const procedures = await procedure.getProcedures();
    const match = proceduresFromDb.find(a => a.name === procedures[0].name);

    expect(procedures).toBeDefined();
    expect(Array.isArray(procedures)).toBe(true);
    expect(procedures).toHaveLength(proceduresFromDb.length);
    expect(match).toEqual(procedures[0]);
  });
});
