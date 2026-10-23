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

  it("lets the browser autofill name, email and phone, with a phone keypad on mobile", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nombre")).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText("Email")).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText(/teléfono/i)).toHaveAttribute("autocomplete", "tel");
    expect(screen.getByLabelText(/teléfono/i)).toHaveAttribute("type", "tel");
  });

  it("marks invalid fields and links each one to its error message", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    const name = screen.getByLabelText("Nombre");
    await screen.findByText(/introduce tu nombre/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/introduce tu nombre/i);
    expect(screen.getByLabelText(/teléfono/i)).not.toHaveAttribute("aria-invalid");
  });
});
