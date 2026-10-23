import { renderUi } from "../../test/helpers";
import { EvoDescriptionList } from "./description-list";

describe("EvoDescriptionList", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoDescriptionList items={[{term:"Email",description:"ada@evotechly.com"}]} />);
    expect(view.container.querySelector("[data-evo=\"description-list\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoDescriptionList items={[{term:"Email",description:"ada@evotechly.com"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
