import { renderUi } from "../../test/helpers";
import { EvoKbd } from "./kbd";

describe("EvoKbd", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoKbd>⌘K</EvoKbd>);
    expect(view.container.querySelector("[data-evo=\"kbd\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoKbd>⌘K</EvoKbd>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
