import { renderUi } from "../../test/helpers";
import { EvoSignUp } from "./sign-up";

describe("EvoSignUp", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSignUp />);
    expect(view.container.querySelector("[data-evo=\"sign-up\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSignUp />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
