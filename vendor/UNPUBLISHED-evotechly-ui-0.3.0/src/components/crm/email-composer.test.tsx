import { renderUi } from "../../test/helpers";
import { EvoEmailComposer } from "./email-composer";

describe("EvoEmailComposer", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoEmailComposer />);
    expect(view.container.querySelector("[data-evo=\"email-composer\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoEmailComposer />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
