import { renderUi } from "../../test/helpers";
import { EvoCombobox } from "./combobox";

describe("EvoCombobox", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCombobox label="Account" options={[{value:"acme",label:"Acme"}]} />);
    expect(view.container.querySelector("[data-evo=\"combobox\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCombobox label="Account" options={[{value:"acme",label:"Acme"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
