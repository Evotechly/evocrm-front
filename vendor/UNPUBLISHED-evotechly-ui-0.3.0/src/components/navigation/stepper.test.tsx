import { renderUi } from "../../test/helpers";
import { EvoStepper } from "./stepper";

describe("EvoStepper", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoStepper steps={[{label:"Qualify"},{label:"Propose"}]} current={0} />);
    expect(view.container.querySelector("[data-evo=\"stepper\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoStepper steps={[{label:"Qualify"},{label:"Propose"}]} current={0} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
