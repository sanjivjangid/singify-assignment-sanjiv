import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StreetMap from "./StreetMap";

describe("Street Map view component", () => {
  it("renders map view component", () => {
    render(<StreetMap />);

    const label = screen.getByText("Street Lights");
    expect(label).toBeInTheDocument();
  });
});
