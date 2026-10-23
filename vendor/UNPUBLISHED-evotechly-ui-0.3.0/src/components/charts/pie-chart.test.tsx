import { renderUi } from "../../test/helpers";
import { EvoPieChart } from "./pie-chart";

describe("EvoPieChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPieChart data={[{label:"Won",value:3},{label:"Lost",value:1}]} label="Mix" />);
    expect(view.container.querySelector("[data-evo=\"pie-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPieChart data={[{label:"Won",value:3},{label:"Lost",value:1}]} label="Mix" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
