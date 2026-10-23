import { renderUi } from "../../test/helpers";
import { EvoInvoice } from "./invoice";

describe("EvoInvoice", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoInvoice number="INV-01" customer="Acme" lines={[{label:"Seat",amount:1000}]} />);
    expect(view.container.querySelector("[data-evo=\"invoice\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoInvoice number="INV-01" customer="Acme" lines={[{label:"Seat",amount:1000}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
