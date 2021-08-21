import { TabList } from "../app/NavBar/TabList";
import { render } from "../__utils__";

describe("Large devices", () => {
  it("renders navbar", () => {
    render(<TabList />);
  });
});
