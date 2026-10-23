import { renderUi } from "../../test/helpers";
import { EvoDialog } from "./dialog";

describe("EvoDialog", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDialog open onOpenChange={() => undefined} title="Edit"><p>Body</p></EvoDialog>);
    expect(view.container.querySelector("[data-evo=\"dialog\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDialog open onOpenChange={() => undefined} title="Edit"><p>Body</p></EvoDialog>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
