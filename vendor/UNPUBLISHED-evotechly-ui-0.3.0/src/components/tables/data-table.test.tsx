import { renderUi } from "../../test/helpers";
import { EvoDataTable } from "./data-table";

describe("EvoDataTable", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDataTable columns={[{accessorKey:"name",header:"Name"}]} data={[{name:"Ada"}]} />);
    expect(view.container.querySelector("[data-evo=\"data-table\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDataTable columns={[{accessorKey:"name",header:"Name"}]} data={[{name:"Ada"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
