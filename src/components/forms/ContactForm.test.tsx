import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/introduce tu nombre/i)).toBeInTheDocument();
    expect(await screen.findByText(/email válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/cuéntanos un poco más/i)).toBeInTheDocument();
  });

  it("does not show a phone error when the field is left empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await screen.findByText(/introduce tu nombre/i);
    expect(screen.queryByText(/teléfono válido/i)).not.toBeInTheDocument();
  });
});
