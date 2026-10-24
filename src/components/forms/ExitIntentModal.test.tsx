import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ExitIntentModal } from "./ExitIntentModal";

const leaveThroughTop = () => act(() => void document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));

function openModal() {
  const trigger = document.createElement("button");
  document.body.append(trigger);
  trigger.focus();
  render(<ExitIntentModal />);
  leaveThroughTop();
  return trigger;
}

describe("ExitIntentModal", () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = "";
  });

  it("opens when the pointer leaves through the top and moves focus inside the dialog", () => {
    openModal();

    expect(screen.getByRole("dialog", { name: "¿Ya te vas?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cerrar" })).toHaveFocus();
  });

  it("closes with Escape and returns focus to where it was", async () => {
    const trigger = openModal();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps Tab and Shift+Tab inside the dialog", async () => {
    openModal();
    const close = screen.getByRole("button", { name: "Cerrar" });
    const cta = screen.getByRole("link", { name: "Hablar por WhatsApp" });

    await userEvent.tab();
    expect(cta).toHaveFocus();
    await userEvent.tab();
    expect(close).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(cta).toHaveFocus();
  });

  it("shows only once per session", () => {
    openModal();
    act(() => screen.getByRole("button", { name: "Cerrar" }).click());

    leaveThroughTop();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
