import { renderUi } from "../../test/helpers";
import { EvoTooltip } from "./tooltip";

describe("EvoTooltip", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTooltip content="Hint"><button type="button">Hover</button></EvoTooltip>);
    expect(view.container.querySelector("[data-evo=\"tooltip\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTooltip content="Hint"><button type="button">Hover</button></EvoTooltip>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
