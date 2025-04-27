import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    const element = screen.getByText("Sanjiv J");
    expect(element).toBeInTheDocument();
  });
});
