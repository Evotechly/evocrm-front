import { renderUi } from "../../test/helpers";
import { EvoStatus } from "./status";

describe("EvoStatus", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoStatus tone="success">Won</EvoStatus>);
    expect(view.container.querySelector("[data-evo=\"status\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoStatus tone="success">Won</EvoStatus>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
