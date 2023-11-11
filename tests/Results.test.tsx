import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Results from "../src/Results";
import { AppProvider } from "../src/AppProvider";
import { render } from "@testing-library/react";

jest.mock("../src/AppContext", () => ({
  useAppContext: jest.fn(() => ({
    results: [],
  })),
}));

test("Results component displays message when no cards are present", () => {
  const { getByText } = render(
    <AppProvider>
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    </AppProvider>,
  );

  const noCardsMessage = getByText("No results");
  expect(noCardsMessage).toBeInTheDocument();
});
