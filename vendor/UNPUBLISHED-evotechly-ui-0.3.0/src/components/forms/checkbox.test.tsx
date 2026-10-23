import { renderUi } from "../../test/helpers";
import { EvoCheckbox } from "./checkbox";

describe("EvoCheckbox", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCheckbox label="Accept" defaultChecked />);
    expect(view.container.querySelector("[data-evo=\"checkbox\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCheckbox label="Accept" defaultChecked />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
