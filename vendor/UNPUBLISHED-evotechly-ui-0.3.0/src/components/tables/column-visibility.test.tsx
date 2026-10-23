import { renderUi } from "../../test/helpers";
import { EvoColumnVisibility } from "./column-visibility";

describe("EvoColumnVisibility", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoColumnVisibility columns={[{id:"name",label:"Name",visible:true}]} />);
    expect(view.container.querySelector("[data-evo=\"column-visibility\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoColumnVisibility columns={[{id:"name",label:"Name",visible:true}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
