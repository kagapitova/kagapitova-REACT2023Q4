import React, { useState, useEffect } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "../src/Search";
import "@testing-library/jest-dom";
import { AppProvider } from "../src/AppProvider";
import { act } from "react-dom/test-utils";

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

const mockOnSearch = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("saves the entered value to local storage when clicking the Search button", async () => {
    render(
      <AppProvider>
        <Search onSearch={mockOnSearch} />
      </AppProvider>,
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "test" } });

    fireEvent.click(searchButton);

    expect(localStorage.getItem("searchTerm")).toBe("test");
  });

  it("retrieves the value from local storage upon mounting", async () => {
    localStorage.setItem("searchTerm", "storedValue");

    jest.spyOn(React, "useState").mockReturnValue(["initialValue", jest.fn()]);

    jest.spyOn(React, "useEffect").mockImplementation((callback) => {
      act(() => {
        callback();
      });
    });

    render(
      <AppProvider>
        <Search onSearch={mockOnSearch} />
      </AppProvider>,
    );

    expect(mockOnSearch).toHaveBeenCalledWith("storedValue");
  });
});
