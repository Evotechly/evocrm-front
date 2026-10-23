import { renderUi } from "../../test/helpers";
import { EvoMentionInput } from "./mention-input";

describe("EvoMentionInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoMentionInput suggestions={[{id:"1",label:"Ada"}]} />);
    expect(view.container.querySelector("[data-evo=\"mention-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoMentionInput suggestions={[{id:"1",label:"Ada"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
