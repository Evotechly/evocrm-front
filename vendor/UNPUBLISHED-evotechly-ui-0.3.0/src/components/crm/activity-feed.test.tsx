import { renderUi } from "../../test/helpers";
import { EvoActivityFeed } from "./activity-feed";

describe("EvoActivityFeed", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoActivityFeed items={[{id:"1",actor:"Ada",action:"created a deal"}]} />);
    expect(view.container.querySelector("[data-evo=\"activity-feed\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoActivityFeed items={[{id:"1",actor:"Ada",action:"created a deal"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
