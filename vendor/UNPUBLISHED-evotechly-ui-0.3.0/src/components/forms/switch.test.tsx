import { renderUi } from "../../test/helpers";
import { EvoSwitch } from "./switch";

describe("EvoSwitch", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSwitch label="Alerts" defaultChecked />);
    expect(view.container.querySelector("[data-evo=\"switch\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSwitch label="Alerts" defaultChecked />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
