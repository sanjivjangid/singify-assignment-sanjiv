import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StreetView from ".";
import StreetGroups from "./StreetGroups";

describe("Street view landing page", () => {
  it("renders landing page", () => {
    render(<StreetView />);
  });
  it("renders landing Groups and Street Lights", () => {
    render(<StreetView />);
    const groups = screen.getByText("Groups");
    expect(groups).toBeInTheDocument();

    const stlights = screen.getByText("Street Lights");
    expect(stlights).toBeInTheDocument();
  });
});

describe("renders Street Group component", () => {
  it("renders Street Group component with search input", () => {
    const props = {
      streetGroups: [],
      selected: "",
      search: "",
      // setSearch: () => {},
      // toggleGroupSelection: () => {}
    };
    render(<StreetGroups {...props} />);
    const el = screen.getByPlaceholderText("Search");
    expect(el).toBeInTheDocument();
  });

  it("renders Street Group component with search input having value Street1", () => {
    const props = {
      streetGroups: [],
      selected: "",
      search: "Street1",
    };
    render(<StreetGroups {...props} />);
    const el = screen.getByRole("textbox");
    expect(el).toHaveValue("Street1");
  });

  it("shuold update serch field value", () => {
    render(<StreetView />);
    const el = screen.getByRole("textbox");
    act(() => {
      fireEvent.change(el, { target: { value: "Street2"}});
    });
    expect(el).toHaveValue("Street2");
  });

  it("should render empty groups list", () => {
    const props = {
      streetGroups: [],
    };
    render(<StreetGroups {...props} />);

    const liItems = screen.queryAllByTestId("groups-list-item");
    expect(liItems.length).toBe(0);
  });

  it("should render 2 items in groups list", () => {
    const props = {
      streetGroups: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        }
      ],
    };
    render(<StreetGroups {...props} />);

    const liItems = screen.queryAllByTestId("groups-list-item");
    expect(liItems.length).toBe(2);
  });

  it("should render 2 items in groups list and 1 item to be selected", () => {
    const props = {
      streetGroups: [
        {
          label: "st1",
          value: "1"
        },
        {
          label: "st2",
          value: "2"
        }
      ],
      selected: "1"
    };
    render(<StreetGroups {...props} />);

    const liItems = screen.queryAllByTestId("groups-list-item");
    expect(liItems.filter((i) => i.className.includes("bg-list-selected")).length).toBe(1);
  });
});
