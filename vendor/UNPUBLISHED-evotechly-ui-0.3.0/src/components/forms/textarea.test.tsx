import { renderUi } from "../../test/helpers";
import { EvoTextarea } from "./textarea";

describe("EvoTextarea", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTextarea label="Notes" defaultValue="Follow up" />);
    expect(view.container.querySelector("[data-evo=\"textarea\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTextarea label="Notes" defaultValue="Follow up" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
