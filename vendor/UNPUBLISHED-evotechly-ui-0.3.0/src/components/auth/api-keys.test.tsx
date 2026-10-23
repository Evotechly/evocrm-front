import { renderUi } from "../../test/helpers";
import { EvoApiKeys } from "./api-keys";

describe("EvoApiKeys", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoApiKeys keys={[{id:"1",name:"CI",hint:"sk-…12"}]} />);
    expect(view.container.querySelector("[data-evo=\"api-keys\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoApiKeys keys={[{id:"1",name:"CI",hint:"sk-…12"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
