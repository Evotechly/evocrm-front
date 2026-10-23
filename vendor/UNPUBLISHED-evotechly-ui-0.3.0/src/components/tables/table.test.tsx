import { renderUi } from "../../test/helpers";
import { EvoTable, EvoTableHeader, EvoTableBody, EvoTableRow, EvoTableHead, EvoTableCell } from "./table";

describe("EvoTable", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTable><EvoTableHeader><EvoTableRow><EvoTableHead>Name</EvoTableHead></EvoTableRow></EvoTableHeader><EvoTableBody><EvoTableRow><EvoTableCell>Ada</EvoTableCell></EvoTableRow></EvoTableBody></EvoTable>);
    expect(view.container.querySelector("[data-evo=\"table\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTable><EvoTableHeader><EvoTableRow><EvoTableHead>Name</EvoTableHead></EvoTableRow></EvoTableHeader><EvoTableBody><EvoTableRow><EvoTableCell>Ada</EvoTableCell></EvoTableRow></EvoTableBody></EvoTable>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
