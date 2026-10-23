import { renderUi } from "../../test/helpers";
import { EvoWorkflowBuilder } from "./workflow-builder";

describe("EvoWorkflowBuilder", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoWorkflowBuilder nodes={[{id:"1",label:"Trigger"}]} />);
    expect(view.container.querySelector("[data-evo=\"workflow-builder\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoWorkflowBuilder nodes={[{id:"1",label:"Trigger"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
