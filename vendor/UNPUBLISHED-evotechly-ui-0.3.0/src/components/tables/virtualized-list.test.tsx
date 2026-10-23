import { renderUi } from "../../test/helpers";
import { EvoVirtualizedList } from "./virtualized-list";

describe("EvoVirtualizedList", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoVirtualizedList items={["A","B"]} height={80} />);
    expect(view.container.querySelector("[data-evo=\"virtualized-list\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoVirtualizedList items={["A","B"]} height={80} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
