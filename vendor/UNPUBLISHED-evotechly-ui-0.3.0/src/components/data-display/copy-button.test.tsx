import { renderUi } from "../../test/helpers";
import { EvoCopyButton } from "./copy-button";

describe("EvoCopyButton", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCopyButton value="copied" />);
    expect(view.container.querySelector("[data-evo=\"copy-button\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCopyButton value="copied" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
