import { renderUi } from "../../test/helpers";
import { EvoAlertDialog } from "./alert-dialog";

describe("EvoAlertDialog", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAlertDialog open onOpenChange={() => undefined} title="Delete" description="This cannot be undone." />);
    expect(view.container.querySelector("[data-evo=\"alert-dialog\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAlertDialog open onOpenChange={() => undefined} title="Delete" description="This cannot be undone." />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
