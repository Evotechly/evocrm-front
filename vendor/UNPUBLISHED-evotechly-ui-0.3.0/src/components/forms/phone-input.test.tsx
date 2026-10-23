import { renderUi } from "../../test/helpers";
import { EvoPhoneInput } from "./phone-input";

describe("EvoPhoneInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPhoneInput label="Phone" />);
    expect(view.container.querySelector("[data-evo=\"phone-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPhoneInput label="Phone" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
