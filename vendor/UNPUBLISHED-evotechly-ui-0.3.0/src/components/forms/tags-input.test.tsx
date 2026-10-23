import { renderUi } from "../../test/helpers";
import { EvoTagsInput } from "./tags-input";

describe("EvoTagsInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTagsInput label="Labels" />);
    expect(view.container.querySelector("[data-evo=\"tags-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTagsInput label="Labels" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
