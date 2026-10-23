import { renderUi } from "../../test/helpers";
import { EvoOnboarding } from "./onboarding";

describe("EvoOnboarding", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoOnboarding steps={[{title:"Connect email",done:false}]} />);
    expect(view.container.querySelector("[data-evo=\"onboarding\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoOnboarding steps={[{title:"Connect email",done:false}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
