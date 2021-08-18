import "@testing-library/jest-dom";
import { NavBar } from "../app/NavBar";
import { fireEvent, render, screen } from "../__utils__";

// jest.mock(
//   "",
//   () =>
//     ({ children }: any) =>
//       children
// );

test("Book Online tab re-routes to login page", () => {
  render(<NavBar />);
  const menuButton = screen.getByText("Open Menu");
  expect(menuButton).toBeInTheDocument();
  fireEvent.click(menuButton);
  fireEvent.click(screen.getByText("Login"));
});
