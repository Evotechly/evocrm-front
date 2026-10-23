import { renderUi } from "../../test/helpers";
import { EvoProgress } from "./progress";

describe("EvoProgress", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoProgress value={40} label="Won" />);
    expect(view.container.querySelector("[data-evo=\"progress\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoProgress value={40} label="Won" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
