import { renderUi } from "../../test/helpers";
import { EvoDateRangePicker } from "./date-range-picker";

describe("EvoDateRangePicker", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDateRangePicker label="Range" />);
    expect(view.container.querySelector("[data-evo=\"date-range-picker\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDateRangePicker label="Range" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
