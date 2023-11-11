import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Details from "../src/Details";

const mockSelectedItem = {
  name: "Luke Skywalker",
  birth_year: "19 BBY",
  skin_color: "Fair",
  mass: "77 kg",
  eye_color: "Blue",
  gender: "Male",
  index: 1,
};

describe("Details Component", () => {
  it("hides the component when clicking the close button", () => {
    const detailsSetIsOpenMock = jest.fn();
    render(
      <MemoryRouter initialEntries={["/?details=true"]}>
        <Details
          selectedItem={mockSelectedItem}
          detailsSetIsOpen={detailsSetIsOpenMock}
          detailsIsOpen={true}
        />
      </MemoryRouter>,
    );

    const closeButton = screen.getByText("Close Details");
    fireEvent.click(closeButton);

    expect(detailsSetIsOpenMock).toHaveBeenCalledWith(false);
  });
});
