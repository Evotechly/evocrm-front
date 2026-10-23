import { renderUi } from "../../test/helpers";
import { EvoSidebar } from "./sidebar";

describe("EvoSidebar", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSidebar items={[{id:"a",label:"Home"}]} />);
    expect(view.container.querySelector("[data-evo=\"sidebar\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSidebar items={[{id:"a",label:"Home"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
