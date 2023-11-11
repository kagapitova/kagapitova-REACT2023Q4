import { render } from "@testing-library/react";
import Search from "../src/Search";
import "@testing-library/jest-dom";
import { AppProvider } from "../src/AppProvider";

test("Search component renders correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <AppProvider>
      <Search onSearch={() => {}} />
    </AppProvider>,
  );
  const inputElement = getByPlaceholderText("Search...");
  const buttonElement = getByText("Search");
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
