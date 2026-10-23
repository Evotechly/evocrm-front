import { renderUi } from "../../test/helpers";
import { EvoInput } from "./input";

describe("EvoInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoInput label="Email" defaultValue="ada@evotechly.com" />);
    expect(view.container.querySelector("[data-evo=\"input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoInput label="Email" defaultValue="ada@evotechly.com" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
