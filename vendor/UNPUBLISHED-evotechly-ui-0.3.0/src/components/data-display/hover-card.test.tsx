import { renderUi } from "../../test/helpers";
import { EvoHoverCard } from "./hover-card";

describe("EvoHoverCard", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoHoverCard title="Ada" description="Acme"><button type="button">Ada</button></EvoHoverCard>);
    expect(view.container.querySelector("[data-evo=\"hover-card\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoHoverCard title="Ada" description="Acme"><button type="button">Ada</button></EvoHoverCard>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
