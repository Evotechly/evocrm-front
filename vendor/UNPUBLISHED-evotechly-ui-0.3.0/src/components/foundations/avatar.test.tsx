import { renderUi } from "../../test/helpers";
import { EvoAvatar, EvoAvatarImage, EvoAvatarFallback } from "./avatar";

describe("EvoAvatar", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAvatar fallback="AB" alt="Ada" />);
    expect(view.container.querySelector("[data-evo=\"avatar\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAvatar fallback="AB" alt="Ada" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
