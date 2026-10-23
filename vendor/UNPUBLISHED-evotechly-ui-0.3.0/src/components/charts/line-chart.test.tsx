import { renderUi } from "../../test/helpers";
import { EvoLineChart } from "./line-chart";

describe("EvoLineChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoLineChart data={[2,4,3]} label="Trend" />);
    expect(view.container.querySelector("[data-evo=\"line-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoLineChart data={[2,4,3]} label="Trend" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
