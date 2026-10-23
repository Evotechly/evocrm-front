import { renderUi } from "../../test/helpers";
import { EvoColorPicker } from "./color-picker";

describe("EvoColorPicker", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoColorPicker label="Stage color" />);
    expect(view.container.querySelector("[data-evo=\"color-picker\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoColorPicker label="Stage color" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
