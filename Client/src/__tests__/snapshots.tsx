import { Home } from "../app/Home";
import { TabList } from "../app/NavBar/TabList";
import { customSnapRenderer } from "../__utils__";

describe("App", () => {
  it("Home Page", () => {
    const tree = customSnapRenderer(<Home />);
    expect(tree).toMatchSnapshot();
  });

  it("Large Device nav bar", () => {
    const tree = customSnapRenderer(<TabList />);
    expect(tree).toMatchSnapshot();
  });
});
