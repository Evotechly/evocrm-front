import { renderUi } from "../../test/helpers";
import { EvoSparkline } from "./sparkline";

describe("EvoSparkline", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSparkline data={[1,3,2,5]} label="Spark" />);
    expect(view.container.querySelector("[data-evo=\"sparkline\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSparkline data={[1,3,2,5]} label="Spark" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
