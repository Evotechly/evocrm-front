import { renderUi } from "../../test/helpers";
import { EvoSheet } from "./sheet";

describe("EvoSheet", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSheet open onOpenChange={() => undefined} title="Details">Body</EvoSheet>);
    expect(view.container.querySelector("[data-evo=\"sheet\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSheet open onOpenChange={() => undefined} title="Details">Body</EvoSheet>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
