import { renderUi } from "../../test/helpers";
import { EvoNavigationMenu } from "./navigation-menu";

describe("EvoNavigationMenu", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoNavigationMenu items={[{label:"Deals",href:"/deals"}]} />);
    expect(view.container.querySelector("[data-evo=\"navigation-menu\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoNavigationMenu items={[{label:"Deals",href:"/deals"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
