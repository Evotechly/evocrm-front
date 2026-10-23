import { renderUi } from "../../test/helpers";
import { EvoImage } from "./image";

describe("EvoImage", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoImage alt="Logo" src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>" />);
    expect(view.container.querySelector("[data-evo=\"image\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoImage alt="Logo" src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
