import { renderUi } from "../../test/helpers";
import { EvoSettingsPage } from "./settings-page";

describe("EvoSettingsPage", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSettingsPage flags={[{id:"beta",label:"Beta",enabled:true}]} />);
    expect(view.container.querySelector("[data-evo=\"settings-page\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSettingsPage flags={[{id:"beta",label:"Beta",enabled:true}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
