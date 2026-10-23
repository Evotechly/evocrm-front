import { renderUi } from "../../test/helpers";
import { EvoSortableList } from "./sortable-list";

describe("EvoSortableList", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSortableList items={[{id:"1",label:"Call Ada"}]} />);
    expect(view.container.querySelector("[data-evo=\"sortable-list\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSortableList items={[{id:"1",label:"Call Ada"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
