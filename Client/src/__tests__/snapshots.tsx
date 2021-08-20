import { Home } from "../app/Home";
import { customSnapRenderer } from "../__utils__";

describe("App", () => {
  it("Home Page", () => {
    const tree = customSnapRenderer(<Home />);
    expect(tree).toMatchSnapshot();
  });
});
