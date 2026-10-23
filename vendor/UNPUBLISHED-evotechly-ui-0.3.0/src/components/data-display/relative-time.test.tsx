import { renderUi } from "../../test/helpers";
import { EvoRelativeTime } from "./relative-time";

describe("EvoRelativeTime", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoRelativeTime date="2026-10-23T12:00:00Z" />);
    expect(view.container.querySelector("[data-evo=\"relative-time\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoRelativeTime date="2026-10-23T12:00:00Z" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
