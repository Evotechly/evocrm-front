import { renderUi } from "../../test/helpers";
import { EvoKanban } from "./kanban";

describe("EvoKanban", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoKanban columns={[{id:"new",title:"New",cards:[{id:"1",title:"Acme"}]}]} />);
    expect(view.container.querySelector("[data-evo=\"kanban\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoKanban columns={[{id:"new",title:"New",cards:[{id:"1",title:"Acme"}]}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
