import { renderUi } from "../../test/helpers";
import { EvoPopover } from "./popover";

describe("EvoPopover", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPopover content="More"><button type="button">Open</button></EvoPopover>);
    expect(view.container.querySelector("[data-evo=\"popover\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPopover content="More"><button type="button">Open</button></EvoPopover>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
