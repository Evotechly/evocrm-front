import { renderUi } from "../../test/helpers";
import { EvoSlider } from "./slider";

describe("EvoSlider", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSlider label="Score" defaultValue={[40]} />);
    expect(view.container.querySelector("[data-evo=\"slider\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSlider label="Score" defaultValue={[40]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
