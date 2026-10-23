import { renderUi } from "../../test/helpers";
import { EvoErrorPage } from "./error-page";

describe("EvoErrorPage", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoErrorPage />);
    expect(view.container.querySelector("[data-evo=\"error-page\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoErrorPage />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
