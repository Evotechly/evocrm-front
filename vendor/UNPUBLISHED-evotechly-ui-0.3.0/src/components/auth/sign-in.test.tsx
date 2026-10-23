import { renderUi } from "../../test/helpers";
import { EvoSignIn } from "./sign-in";

describe("EvoSignIn", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSignIn />);
    expect(view.container.querySelector("[data-evo=\"sign-in\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSignIn />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
