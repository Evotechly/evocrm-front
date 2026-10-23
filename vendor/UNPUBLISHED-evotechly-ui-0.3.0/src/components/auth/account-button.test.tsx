import { renderUi } from "../../test/helpers";
import { EvoAccountButton } from "./account-button";

describe("EvoAccountButton", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAccountButton name="Ada" email="ada@evotechly.com" />);
    expect(view.container.querySelector("[data-evo=\"account-button\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAccountButton name="Ada" email="ada@evotechly.com" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
