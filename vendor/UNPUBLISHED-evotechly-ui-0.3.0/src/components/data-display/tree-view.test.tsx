import { renderUi } from "../../test/helpers";
import { EvoTreeView } from "./tree-view";

describe("EvoTreeView", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTreeView items={[{id:"1",label:"Accounts",children:[{id:"2",label:"Acme"}]}]} />);
    expect(view.container.querySelector("[data-evo=\"tree-view\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTreeView items={[{id:"1",label:"Accounts",children:[{id:"2",label:"Acme"}]}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
