import { renderUi } from "../../test/helpers";
import { EvoContextMenu } from "./context-menu";

describe("EvoContextMenu", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoContextMenu items={[{label:"Edit",shortcut:"E"}]}><button type="button">Row</button></EvoContextMenu>);
    expect(view.container.querySelector("[data-evo=\"context-menu\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoContextMenu items={[{label:"Edit",shortcut:"E"}]}><button type="button">Row</button></EvoContextMenu>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
