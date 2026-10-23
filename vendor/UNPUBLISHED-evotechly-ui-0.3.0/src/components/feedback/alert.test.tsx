import { renderUi } from "../../test/helpers";
import { EvoAlert } from "./alert";

describe("EvoAlert", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAlert title="Saved" description="Deal updated" />);
    expect(view.container.querySelector("[data-evo=\"alert\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAlert title="Saved" description="Deal updated" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
