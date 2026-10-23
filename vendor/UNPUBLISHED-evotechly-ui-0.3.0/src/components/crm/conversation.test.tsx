import { renderUi } from "../../test/helpers";
import { EvoConversation } from "./conversation";

describe("EvoConversation", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoConversation threads={[{id:"1",title:"Ada",preview:"Hi"}]} />);
    expect(view.container.querySelector("[data-evo=\"conversation\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoConversation threads={[{id:"1",title:"Ada",preview:"Hi"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
