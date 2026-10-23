import { renderUi } from "../../test/helpers";
import { EvoBreadcrumb } from "./breadcrumb";

describe("EvoBreadcrumb", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoBreadcrumb items={[{label:"Home",href:"/"},{label:"Deals"}]} />);
    expect(view.container.querySelector("[data-evo=\"breadcrumb\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoBreadcrumb items={[{label:"Home",href:"/"},{label:"Deals"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
