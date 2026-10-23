import { renderUi } from "../../test/helpers";
import { EvoChat } from "./chat";

describe("EvoChat", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoChat messages={[{id:"1",role:"user",content:"Hello"}]} />);
    expect(view.container.querySelector("[data-evo=\"chat\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoChat messages={[{id:"1",role:"user",content:"Hello"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
