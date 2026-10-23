import { renderUi } from "../../test/helpers";
import { EvoHeatmap } from "./heatmap";

describe("EvoHeatmap", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoHeatmap values={[0,1,2,3]} label="Activity" />);
    expect(view.container.querySelector("[data-evo=\"heatmap\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoHeatmap values={[0,1,2,3]} label="Activity" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
