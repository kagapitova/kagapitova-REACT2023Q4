import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { AppProvider } from "../src/AppProvider";

test("App component renders correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <AppProvider>
      <App />
    </AppProvider>,
  );
  const headingElement = getByText("Star Wars Search");
  const inputElement = getByPlaceholderText("Search...");
  expect(headingElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test("App component handles search", () => {
  const { getByPlaceholderText, getByText } = render(
    <AppProvider>
      <App />
    </AppProvider>,
  );
  const inputElement = getByPlaceholderText("Search...");
  const buttonElement = getByText("Search");

  fireEvent.change(inputElement, { target: { value: "Luke" } });
  fireEvent.click(buttonElement);
});
