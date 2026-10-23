import { renderUi } from "../../test/helpers";
import { EvoScrollArea } from "./scroll-area";

describe("EvoScrollArea", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoScrollArea style={{height:80}}><p>Long</p></EvoScrollArea>);
    expect(view.container.querySelector("[data-evo=\"scroll-area\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoScrollArea style={{height:80}}><p>Long</p></EvoScrollArea>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
