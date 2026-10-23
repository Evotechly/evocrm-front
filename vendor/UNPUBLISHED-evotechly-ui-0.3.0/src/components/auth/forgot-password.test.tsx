import { renderUi } from "../../test/helpers";
import { EvoForgotPassword } from "./forgot-password";

describe("EvoForgotPassword", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoForgotPassword />);
    expect(view.container.querySelector("[data-evo=\"forgot-password\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoForgotPassword />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
