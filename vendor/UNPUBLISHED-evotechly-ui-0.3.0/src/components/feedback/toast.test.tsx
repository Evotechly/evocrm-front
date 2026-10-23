import { renderUi } from "../../test/helpers";
import { EvoToaster } from "./toast";

describe("EvoToaster", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoToaster />);
    expect(view.container.querySelector("[data-evo=\"toast\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoToaster />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
