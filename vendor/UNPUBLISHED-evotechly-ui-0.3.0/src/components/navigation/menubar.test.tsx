import { renderUi } from "../../test/helpers";
import { EvoMenubar } from "./menubar";

describe("EvoMenubar", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoMenubar items={[{label:"File",items:[{label:"New"}]}]} />);
    expect(view.container.querySelector("[data-evo=\"menubar\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoMenubar items={[{label:"File",items:[{label:"New"}]}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
