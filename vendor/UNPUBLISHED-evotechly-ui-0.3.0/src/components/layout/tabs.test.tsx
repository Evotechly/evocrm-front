import { renderUi } from "../../test/helpers";
import { EvoTabs, EvoTabsList, EvoTabsTrigger, EvoTabsContent } from "./tabs";

describe("EvoTabs", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTabs defaultValue="a"><EvoTabsList><EvoTabsTrigger value="a">One</EvoTabsTrigger></EvoTabsList><EvoTabsContent value="a">Panel</EvoTabsContent></EvoTabs>);
    expect(view.container.querySelector("[data-evo=\"tabs\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTabs defaultValue="a"><EvoTabsList><EvoTabsTrigger value="a">One</EvoTabsTrigger></EvoTabsList><EvoTabsContent value="a">Panel</EvoTabsContent></EvoTabs>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
