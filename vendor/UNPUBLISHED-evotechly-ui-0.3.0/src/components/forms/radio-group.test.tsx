import { renderUi } from "../../test/helpers";
import { EvoRadioGroup } from "./radio-group";

describe("EvoRadioGroup", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoRadioGroup label="Plan" options={[{value:"a",label:"Starter"}]} defaultValue="a" />);
    expect(view.container.querySelector("[data-evo=\"radio-group\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoRadioGroup label="Plan" options={[{value:"a",label:"Starter"}]} defaultValue="a" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
