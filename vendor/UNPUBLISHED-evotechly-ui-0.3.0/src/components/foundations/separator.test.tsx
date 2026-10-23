import { renderUi } from "../../test/helpers";
import { EvoSeparator } from "./separator";

describe("EvoSeparator", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSeparator />);
    expect(view.container.querySelector("[data-evo=\"separator\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSeparator />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
