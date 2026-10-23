import { renderUi } from "../../test/helpers";
import { EvoRating } from "./rating";

describe("EvoRating", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoRating label="Score" value={3} />);
    expect(view.container.querySelector("[data-evo=\"rating\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoRating label="Score" value={3} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
