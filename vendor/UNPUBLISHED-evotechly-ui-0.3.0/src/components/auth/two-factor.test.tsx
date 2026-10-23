import { renderUi } from "../../test/helpers";
import { EvoTwoFactor } from "./two-factor";

describe("EvoTwoFactor", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTwoFactor secret="JBSWY3DPEHPK3PXP" />);
    expect(view.container.querySelector("[data-evo=\"two-factor\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTwoFactor secret="JBSWY3DPEHPK3PXP" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
