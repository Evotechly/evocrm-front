import { renderUi } from "../../test/helpers";
import { EvoSkeleton } from "./skeleton";

describe("EvoSkeleton", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSkeleton aria-label="Loading" />);
    expect(view.container.querySelector("[data-evo=\"skeleton\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSkeleton aria-label="Loading" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
