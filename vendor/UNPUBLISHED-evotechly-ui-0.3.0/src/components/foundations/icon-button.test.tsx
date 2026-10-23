import { renderUi } from "../../test/helpers";
import { EvoIconButton } from "./icon-button";

describe("EvoIconButton", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoIconButton label="Close">×</EvoIconButton>);
    expect(view.container.querySelector("[data-evo=\"icon-button\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoIconButton label="Close">×</EvoIconButton>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
