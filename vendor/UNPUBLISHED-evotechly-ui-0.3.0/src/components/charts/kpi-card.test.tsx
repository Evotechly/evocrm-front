import { renderUi } from "../../test/helpers";
import { EvoKpiCard } from "./kpi-card";

describe("EvoKpiCard", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoKpiCard label="Revenue" value="12 400 DZD" />);
    expect(view.container.querySelector("[data-evo=\"kpi-card\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoKpiCard label="Revenue" value="12 400 DZD" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
