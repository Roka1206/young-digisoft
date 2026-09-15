import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("toggles the mobile navigation when the menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // El link "Contacto" del nav de escritorio siempre está en el DOM
    // (se oculta con CSS en mobile), así que el menú móvil añade una segunda instancia.
    expect(screen.getAllByRole("link", { name: "Contacto" })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    await screen.findByRole("button", { name: /cerrar menú/i });
    expect(screen.getAllByRole("link", { name: "Contacto" })).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /cerrar menú/i }));
    await screen.findByRole("button", { name: /abrir menú/i });
    // El panel móvil se anima al cerrarse (AnimatePresence), así que tarda un momento en desmontar.
    await waitFor(() => {
      expect(screen.getAllByRole("link", { name: "Contacto" })).toHaveLength(1);
    });
  });
});
