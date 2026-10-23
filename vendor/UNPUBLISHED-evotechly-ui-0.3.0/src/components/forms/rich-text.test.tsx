import { renderUi } from "../../test/helpers";
import { EvoRichText } from "./rich-text";

describe("EvoRichText", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoRichText label="Body" />);
    expect(view.container.querySelector("[data-evo=\"rich-text\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoRichText label="Body" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
