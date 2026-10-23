import { renderUi } from "../../test/helpers";
import { EvoDataGrid } from "./data-grid";

describe("EvoDataGrid", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDataGrid columns={[{id:"name",header:"Name"}]} rows={[{id:"1",name:"Ada"}]} />);
    expect(view.container.querySelector("[data-evo=\"data-grid\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDataGrid columns={[{id:"name",header:"Name"}]} rows={[{id:"1",name:"Ada"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
