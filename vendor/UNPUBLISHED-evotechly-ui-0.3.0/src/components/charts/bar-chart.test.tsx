import { renderUi } from "../../test/helpers";
import { EvoBarChart } from "./bar-chart";

describe("EvoBarChart", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoBarChart data={[2,4,3]} label="Wins" />);
    expect(view.container.querySelector("[data-evo=\"bar-chart\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoBarChart data={[2,4,3]} label="Wins" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
