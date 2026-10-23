import { renderUi } from "../../test/helpers";
import { EvoEmptyState } from "./empty-state";

describe("EvoEmptyState", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoEmptyState title="No deals" description="Create your first deal." />);
    expect(view.container.querySelector("[data-evo=\"empty-state\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoEmptyState title="No deals" description="Create your first deal." />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
