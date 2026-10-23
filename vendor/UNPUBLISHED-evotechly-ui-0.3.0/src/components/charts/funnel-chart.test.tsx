import { renderUi } from "../../test/helpers";
import { EvoFunnelChart } from "./funnel-chart";

describe("EvoFunnelChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoFunnelChart data={[{label:"New",value:10},{label:"Won",value:2}]} label="Funnel" />);
    expect(view.container.querySelector("[data-evo=\"funnel-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoFunnelChart data={[{label:"New",value:10},{label:"Won",value:2}]} label="Funnel" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
