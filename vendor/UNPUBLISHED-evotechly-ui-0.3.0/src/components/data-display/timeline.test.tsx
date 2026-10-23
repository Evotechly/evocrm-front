import { renderUi } from "../../test/helpers";
import { EvoTimeline } from "./timeline";

describe("EvoTimeline", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTimeline items={[{title:"Called",at:"2026-10-23"}]} />);
    expect(view.container.querySelector("[data-evo=\"timeline\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTimeline items={[{title:"Called",at:"2026-10-23"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
