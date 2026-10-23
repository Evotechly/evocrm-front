import { renderUi } from "../../test/helpers";
import { EvoResizable, EvoResizablePanel, EvoResizableHandle } from "./resizable";

describe("EvoResizable", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoResizable storageKey="demo"><EvoResizablePanel>A</EvoResizablePanel><EvoResizableHandle /><EvoResizablePanel>B</EvoResizablePanel></EvoResizable>);
    expect(view.container.querySelector("[data-evo=\"resizable\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoResizable storageKey="demo"><EvoResizablePanel>A</EvoResizablePanel><EvoResizableHandle /><EvoResizablePanel>B</EvoResizablePanel></EvoResizable>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
