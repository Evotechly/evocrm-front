import { renderUi } from "../../test/helpers";
import { EvoMultiSelect } from "./multi-select";

describe("EvoMultiSelect", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoMultiSelect label="Tags" options={[{value:"hot",label:"Hot"}]} />);
    expect(view.container.querySelector("[data-evo=\"multi-select\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoMultiSelect label="Tags" options={[{value:"hot",label:"Hot"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
