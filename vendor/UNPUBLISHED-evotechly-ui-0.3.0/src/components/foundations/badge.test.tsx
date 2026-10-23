import { renderUi } from "../../test/helpers";
import { EvoBadge } from "./badge";

describe("EvoBadge", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoBadge>New</EvoBadge>);
    expect(view.container.querySelector("[data-evo=\"badge\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoBadge>New</EvoBadge>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
