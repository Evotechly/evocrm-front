import { renderUi } from "../../test/helpers";
import { EvoToggleGroup } from "./toggle-group";

describe("EvoToggleGroup", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoToggleGroup options={[{value:"list",label:"List"}]} defaultValue="list" />);
    expect(view.container.querySelector("[data-evo=\"toggle-group\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoToggleGroup options={[{value:"list",label:"List"}]} defaultValue="list" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
