import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contact, navLinks } from "@/content/site";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the contact details", () => {
    render(<Footer />);
    expect(screen.getByText(contact.email)).toBeInTheDocument();
    expect(screen.getByText(contact.phone)).toBeInTheDocument();
    expect(screen.getByText(contact.zone)).toBeInTheDocument();
  });

  it("renders every navigation link", () => {
    render(<Footer />);
    for (const link of navLinks) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });
});
