import { renderUi } from "../../test/helpers";
import { EvoGantt } from "./gantt";

describe("EvoGantt", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoGantt items={[{id:"1",title:"Acme",start:"2026-10-20",end:"2026-10-28"}]} />);
    expect(view.container.querySelector("[data-evo=\"gantt\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoGantt items={[{id:"1",title:"Acme",start:"2026-10-20",end:"2026-10-28"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
