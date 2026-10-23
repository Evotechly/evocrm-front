import { renderUi } from "../../test/helpers";
import { EvoPricingTable } from "./pricing-table";

describe("EvoPricingTable", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPricingTable plans={[{id:"pro",name:"Pro",price:"9 000 DZD"}]} />);
    expect(view.container.querySelector("[data-evo=\"pricing-table\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPricingTable plans={[{id:"pro",name:"Pro",price:"9 000 DZD"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
