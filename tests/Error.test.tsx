import { render, screen, fireEvent } from "@testing-library/react";
import ErrorComponent from "./../src/ErrorComponent";

describe("ErrorComponent", () => {
  it("renders error button and triggers error on click", () => {
    render(<ErrorComponent />);

    const errorButton = screen.getByText("Error");

    try {
      fireEvent.click(errorButton);
    } catch (e) {
      expect(e.message).toBe("Example error");
    }
  });
});
