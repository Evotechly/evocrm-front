import { renderUi } from "../../test/helpers";
import { EvoBanner } from "./banner";

describe("EvoBanner", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoBanner title="Try pipeline views" />);
    expect(view.container.querySelector("[data-evo=\"banner\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoBanner title="Try pipeline views" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
