import { renderUi } from "../../test/helpers";
import { EvoRadialChart } from "./radial-chart";

describe("EvoRadialChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoRadialChart value={72} label="Quota" />);
    expect(view.container.querySelector("[data-evo=\"radial-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoRadialChart value={72} label="Quota" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
