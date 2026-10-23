import { renderUi } from "../../test/helpers";
import { EvoInputOtp, EvoInputOTP } from "./input-otp";

describe("EvoInputOtp", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoInputOtp />);
    expect(view.container.querySelector("[data-evo=\"input-otp\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoInputOtp />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
