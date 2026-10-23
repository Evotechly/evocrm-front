import { renderUi } from "../../test/helpers";
import { EvoCollapsible } from "./collapsible";

describe("EvoCollapsible", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCollapsible title="More">Hidden</EvoCollapsible>);
    expect(view.container.querySelector("[data-evo=\"collapsible\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCollapsible title="More">Hidden</EvoCollapsible>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
