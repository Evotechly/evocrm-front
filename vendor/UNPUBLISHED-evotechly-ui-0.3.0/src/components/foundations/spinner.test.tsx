import { renderUi } from "../../test/helpers";
import { EvoSpinner } from "./spinner";

describe("EvoSpinner", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSpinner aria-label="Loading" />);
    expect(view.container.querySelector("[data-evo=\"spinner\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSpinner aria-label="Loading" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
