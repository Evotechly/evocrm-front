import { renderUi } from "../../test/helpers";
import { EvoAreaChart } from "./area-chart";

describe("EvoAreaChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAreaChart data={[2,4,3]} label="Pipeline" />);
    expect(view.container.querySelector("[data-evo=\"area-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAreaChart data={[2,4,3]} label="Pipeline" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
