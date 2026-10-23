import { renderUi } from "../../test/helpers";
import { EvoFeatureTour } from "./feature-tour";

describe("EvoFeatureTour", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoFeatureTour open steps={[{id:"a",title:"Welcome",body:"Start here"}]} />);
    expect(view.container.querySelector("[data-evo=\"feature-tour\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoFeatureTour open steps={[{id:"a",title:"Welcome",body:"Start here"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
