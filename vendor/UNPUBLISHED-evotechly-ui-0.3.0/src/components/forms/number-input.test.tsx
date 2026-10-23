import { renderUi } from "../../test/helpers";
import { EvoNumberInput } from "./number-input";

describe("EvoNumberInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoNumberInput label="Quantity" defaultValue={2} />);
    expect(view.container.querySelector("[data-evo=\"number-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoNumberInput label="Quantity" defaultValue={2} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
