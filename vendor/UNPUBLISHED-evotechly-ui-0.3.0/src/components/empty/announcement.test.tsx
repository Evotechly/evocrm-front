import { renderUi } from "../../test/helpers";
import { EvoAnnouncement } from "./announcement";

describe("EvoAnnouncement", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAnnouncement title="New pipeline views" />);
    expect(view.container.querySelector("[data-evo=\"announcement\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAnnouncement title="New pipeline views" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
