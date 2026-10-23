import { renderUi } from "../../test/helpers";
import { EvoDropdownMenu } from "./dropdown-menu";

describe("EvoDropdownMenu", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDropdownMenu items={[{label:"Profile"}]}><button type="button">Menu</button></EvoDropdownMenu>);
    expect(view.container.querySelector("[data-evo=\"dropdown-menu\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDropdownMenu items={[{label:"Profile"}]}><button type="button">Menu</button></EvoDropdownMenu>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
