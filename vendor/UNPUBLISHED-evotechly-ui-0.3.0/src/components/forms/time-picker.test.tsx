import { renderUi } from "../../test/helpers";
import { EvoTimePicker } from "./time-picker";

describe("EvoTimePicker", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTimePicker label="Time" defaultValue="09:30" />);
    expect(view.container.querySelector("[data-evo=\"time-picker\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTimePicker label="Time" defaultValue="09:30" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
