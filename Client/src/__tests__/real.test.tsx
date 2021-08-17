import "@testing-library/jest-dom";
import { NavBar } from "../app/NavBar";
import { render, screen } from "../__utils__";

test("home page button has fake link", () => {
  render(<NavBar />);
  const logoutButton = screen.getByText("logout");
  console.log(logoutButton);
});
