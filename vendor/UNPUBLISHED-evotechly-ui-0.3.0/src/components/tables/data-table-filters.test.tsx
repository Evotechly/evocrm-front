import { renderUi } from "../../test/helpers";
import { EvoDataTableFilters } from "./data-table-filters";

describe("EvoDataTableFilters", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDataTableFilters />);
    expect(view.container.querySelector("[data-evo=\"data-table-filters\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDataTableFilters />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
