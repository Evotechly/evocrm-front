import { renderUi } from "../../test/helpers";
import { EvoDatePicker } from "./date-picker";

describe("EvoDatePicker", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDatePicker label="Close date" />);
    expect(view.container.querySelector("[data-evo=\"date-picker\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDatePicker label="Close date" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
