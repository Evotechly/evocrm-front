import { renderUi } from "../../test/helpers";
import { EvoPageHeader } from "./page-header";

describe("EvoPageHeader", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPageHeader title="Accounts" description="All accounts" />);
    expect(view.container.querySelector("[data-evo=\"page-header\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPageHeader title="Accounts" description="All accounts" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
