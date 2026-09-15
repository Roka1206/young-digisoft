import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the Young Digisoft logo", () => {
    render(<Home />);
    expect(screen.getByAltText("Young Digisoft")).toBeInTheDocument();
  });
});
