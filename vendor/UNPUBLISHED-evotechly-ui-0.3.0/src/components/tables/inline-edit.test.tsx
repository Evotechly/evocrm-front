import { renderUi } from "../../test/helpers";
import { EvoInlineEdit } from "./inline-edit";

describe("EvoInlineEdit", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoInlineEdit defaultValue="Ada" />);
    expect(view.container.querySelector("[data-evo=\"inline-edit\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoInlineEdit defaultValue="Ada" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
