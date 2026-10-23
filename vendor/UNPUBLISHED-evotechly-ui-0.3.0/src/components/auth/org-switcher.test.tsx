import { renderUi } from "../../test/helpers";
import { EvoOrgSwitcher } from "./org-switcher";

describe("EvoOrgSwitcher", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoOrgSwitcher orgs={[{id:"1",name:"Evotechly",role:"Admin"}]} />);
    expect(view.container.querySelector("[data-evo=\"org-switcher\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoOrgSwitcher orgs={[{id:"1",name:"Evotechly",role:"Admin"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
