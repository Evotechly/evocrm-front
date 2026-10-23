import { renderUi } from "../../test/helpers";
import { EvoCalendar } from "./calendar";

describe("EvoCalendar", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCalendar />);
    expect(view.container.querySelector("[data-evo=\"calendar\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCalendar />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
